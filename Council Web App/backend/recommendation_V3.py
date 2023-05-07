from sklearn.svm import SVC
from sklearn.ensemble import RandomForestClassifier
from sklearn.ensemble import AdaBoostClassifier
from sklearn.ensemble import BaggingClassifier
from sklearn.tree import DecisionTreeClassifier
import pandas as pd
from sklearn import preprocessing
import numpy as np
import pymongo
import pickle
import certifi
from sklearn.model_selection import cross_val_score
from sklearn.model_selection import train_test_split
from statistics import mode
import sys

# CNIC = sys.argv[1]
# budget_temp = sys.argv[2]
# budget = int(budget_temp)
# interest = sys.argv[3]
# degree_program = sys.argv[4]
# preferred_location = sys.argv[5]

CNIC = '13302-0464670-3'
budget_temp = 10
budget = int(budget_temp)
interest = 'Reading'
degree_program = 'BSEE'
preferred_location = 'Islamabad'
# input

# Assuming text extracted from image got the following information
study_group = 'Pre-Engrr'
matric_marks = 900  # Out of 1100
inter_marks = 950  # Out of 1100

models = np.array(['Random_Forest_Classification',
                   'Support Vector Machine',
                   'Decision Tree Classification',
                   'Bagging Classifier (Base_Estimator: DTC))',
                   'ADA Boost Classifier (Base_Estimator: DTC))'])


def load_saved_model_from_db(model_name, client, db, dbconnection):
    json_data = {}

    myclient = pymongo.MongoClient(client, tlsCAFile=certifi.where())

    mydb = myclient[db]
    mycon = mydb[dbconnection]
    data = mycon.find({"name": model_name})

    for i in data:
        json_data = i
        CV_accuracy = i['CV_accuracy']

    pickled_model = json_data[model_name]

    return (pickle.loads(pickled_model), CV_accuracy)


data = pd.read_csv('./CleanData_V2.csv', encoding='unicode_escape')

data.drop(columns=['Hobby_Interest',
          'Fathers_Occupation', 'Mothers_Occupation', 'Year_of_Admission'],  inplace=True)

data.rename(columns={'Budget (in millions)': 'Budget'}, inplace=True)

X = data.iloc[:, 0:10]
y = data.iloc[:, 10]

client = pymongo.MongoClient(
    'mongodb+srv://nafay:password1234@mernapp.fnkr4nr.mongodb.net/', tlsCAFile=certifi.where())

db = client['FYP']
col = db['datas']
cursor = col.find({"CNIC": CNIC})
for doc in cursor:
    budget = int(doc['budget']/1000000)
    degree_program = doc['degree_program']
    preferred_location = doc['preferred_location']
    # Getting information from transcript later

col = db['users']
cursor = col.find({"CNIC": CNIC})
for doc in cursor:
    gender = doc['gender']
    race = doc['Race_ethnicity']
    preferred_language = doc['Preferred_language']
    homecity = doc['HomeCity']

user_data = {
    'Gender': gender,
    'Race/Ethnicity': race,  # categorized
    'Home_City': homecity,
    'Preferred_Langauge': preferred_language,
    'Budget': budget,  # categorized
    'Study_Group':  study_group,
    'Degree_Program':  degree_program,
    'Matric_Marks':  matric_marks,  # categorized
    'Inter_Marks':  inter_marks,  # categorized
    'Campus':  preferred_location,
}

user_data = pd.DataFrame([user_data])

X = pd.concat([X, user_data])
min_budget = X['Budget'].min()
max_budget = X['Budget'].max()

X['bins_budget'] = pd.cut(x=X['Budget'], bins=[min_budget, 5, 9, max_budget],
                          labels=['Low', 'Medium', 'High', ])
min_matric = X['Matric_Marks'].min()
max_matric = X['Matric_Marks'].max()

X['Percentage_Matric'] = (X['Matric_Marks']/1100)*100
X['Percentage_Inter'] = (X['Inter_Marks']/1100)*100


X['Matric_Grade'] = pd.cut(x=X['Percentage_Matric'], bins=[
    0, 49, 59, 69, 79, 89, 94, 100], labels=['F', 'E', 'D', 'C', 'B', 'A', 'A+'])
X['Inter_Grade'] = pd.cut(x=X['Percentage_Inter'], bins=[
    0, 49, 59, 69, 79, 89, 94, 100], labels=['F', 'E', 'D', 'C', 'B', 'A', 'A+'])

X.drop(columns=['Budget', 'Matric_Marks', 'Inter_Marks',
                'Percentage_Matric', 'Percentage_Inter'], inplace=True)

X.rename(columns={'bins_budget': "Budget"}, inplace=True)

X = X[['Gender', 'Race/Ethnicity', 'Home_City', 'Preferred_Langauge', 'Budget',
       'Study_Group', 'Degree_Program', 'Matric_Grade', 'Inter_Grade', 'Campus']]

# Encoding
le = preprocessing.LabelEncoder()

gender = le.fit_transform(list(X['Gender']))
race = le.fit_transform(list(X['Race/Ethnicity']))
home_city = le.fit_transform(list(X['Home_City']))
preferred_language = le.fit_transform(list(X['Preferred_Langauge']))
budget = le.fit_transform(list(X['Budget']))
study_group = le.fit_transform(list(X['Study_Group']))
degree_program = le.fit_transform(list(X['Degree_Program']))
matric_grade = le.fit_transform(list(X['Matric_Grade']))
inter_grade = le.fit_transform(list(X['Inter_Grade']))
campus = le.fit_transform(list(X['Campus']))

class_attribute = le.fit_transform(list(y))

X_prep = pd.DataFrame(list(zip(gender, race, home_city, preferred_language, budget, study_group,
                               degree_program, matric_grade, inter_grade, campus)), columns=['Gender', 'Race/Ethnicity', 'Home_City', 'Preferred_Langauge', 'Budget', 'Study_Group', 'Degree_Program', 'Matric Grade', 'Inter Grade', 'Campus'])

y_prep = pd.DataFrame(list(class_attribute), columns=['University'])
user_data_prep = pd.DataFrame(X_prep.iloc[200])
user_data_prep = user_data_prep.transpose()
X_prep.drop([200], inplace=True)


# Splitting the data
X_train, X_test, Y_train, Y_test = train_test_split(
    X_prep, y_prep, random_state=99)
Y_train = np.ravel(Y_train)


# import xgboost as xgb

# ----------Insert Model Here----------

# RFC Model Training
rfc = RandomForestClassifier(
    n_estimators=80, criterion='gini', random_state=99).fit(X_train, Y_train)
# Cross-Validation
result = cross_val_score(rfc, X_train, Y_train, cv=12)
rfc_accuracy = result.mean()*100

# SVC Model Training
svc = SVC(kernel='linear', C=1.0, random_state=5).fit(X_train, Y_train)
# Cross-Validation
result = cross_val_score(svc, X_train, Y_train, cv=10)
svc_accuracy = result.mean()*100

# Decision Tree Classification (DTC) Model Training
dtc = DecisionTreeClassifier(
    criterion='gini', random_state=10).fit(X_train, Y_train)
# Cross-Validation
result = cross_val_score(dtc, X_train, Y_train, cv=10)
dtc_accuracy = result.mean()*100

# XGBoost Classification
# dtrain = xgb.DMatrix(X_train, label=Y_train)
# dtest = xgb.DMatrix(X_test, label=Y_test)
# param = {
#     'max_depth': 10,  # the maximum depth of each tree
#     'eta': 0.30,  # the training step for each iteration
#     'objective': 'multi:softprob',  # error evaluation for multiclass training
#     'num_class': len(data['University'].unique())}  # the number of classes that exist in this datset
# num_round = 550  # the number of training iterations
# bst = xgb.train(param, dtrain, num_round)

# Bagging Ensemble Model with DecisionTreeClassifier acting as a base Estimator
bclf = BaggingClassifier(base_estimator=DecisionTreeClassifier(), n_estimators=80, max_samples=0.8,
                         random_state=0,).fit(X_train, Y_train)
# Cross-Validation
result = cross_val_score(bclf, X_train, Y_train, cv=12)
bclf_accuracy = result.mean()*100

# ADA Boost Ensemble Model with DecisionTreeClassifier acting as a base Estimator
adab = AdaBoostClassifier(base_estimator=DecisionTreeClassifier(
), n_estimators=80, random_state=0).fit(X_train, Y_train)
# Cross-Validation
result = cross_val_score(adab, X_train, Y_train, cv=12)
adab_accuracy = result.mean()*100


recommendation = []
recommendation.append((rfc.predict(user_data_prep)[0], rfc_accuracy))
recommendation.append([svc.predict(user_data_prep)[0], svc_accuracy])
recommendation.append([dtc.predict(user_data_prep)[0], dtc_accuracy])
# recommendation.append(xgb.predict(user_data_prep))
recommendation.append((bclf.predict(user_data_prep)[0], bclf_accuracy))
recommendation.append((adab.predict(user_data_prep)[0], adab_accuracy))


R = []
for i in recommendation:
    R.append(i[0])

print(R)
mode = mode(R)
mode
university = le.inverse_transform([mode])
# print(university[0])
