import pymongo
import certifi
import time
import pickle
import pandas as pd
import numpy as np
from sklearn import preprocessing
from sklearn.model_selection import train_test_split
from sklearn.svm import SVC
from sklearn.ensemble import RandomForestClassifier
from sklearn.ensemble import AdaBoostClassifier
from sklearn.ensemble import BaggingClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import make_pipeline
from sklearn.ensemble import StackingClassifier
from sklearn.svm import LinearSVC
from xgboost import XGBClassifier
import pandas as pd
from sklearn import preprocessing
import numpy as np
import pymongo
import certifi
from sklearn.model_selection import train_test_split


client = 'mongodb+srv://nafay:password1234@mernapp.fnkr4nr.mongodb.net/'
db = 'FYP'
collection = 'ML_models'


def save_model_to_db(model, client, db, dbconnection, model_name, accuracy, update_insert):
    pickle_model = pickle.dumps(model)
    myclient = pymongo.MongoClient(client, tlsCAFile=certifi.where())
    mydb = myclient[db]

    mycon = mydb[dbconnection]
    if(update_insert == 'I'):
        info = mycon.insert_one(
            {model_name: pickle_model, 'name': model_name, 'created_time': time.time(), 'accuracy': accuracy})
        print(info.inserted_id, 'added to DB successfully!')

        details = {
            'inserted_id': info.inserted_id,
            'model_name': model_name,
            'created_time': time.time(),
            'accuracy': accuracy
        }

        return details
    elif(update_insert == 'U'):
        info = mycon.update_one({'name': model_name}, {"$set": {
                                model_name: pickle_model, 'name': model_name, 'created_time': time.time(), 'accuracy': accuracy}})
        print(info.upserted_id, 'updated successfully!')

        details = {
            'upserted_id': info.upserted_id,
            'model_name': model_name,
            'created_time': time.time(),
        }

        return details


# reading of data
data = pd.read_csv('./CleanData_V2.csv', encoding='unicode_escape')
# Data Preprocessing
data.drop(columns=['Hobby_Interest',
          'Fathers_Occupation', 'Mothers_Occupation', 'Year_of_Admission'],  inplace=True)

data.rename(columns={'Budget (in millions)': 'Budget'}, inplace=True)

data['Budget'].value_counts()
min_budget = data['Budget'].min()
max_budget = data['Budget'].max()
mid_pt = int((min_budget+max_budget)/2)
upper_pt = int((mid_pt+max_budget)/2)
lower_pt = int((min_budget+mid_pt)/2)

data['bins_budget'] = pd.cut(x=data['Budget'], bins=[min_budget, lower_pt, upper_pt, max_budget],
                             labels=['Low', 'Medium', 'High', ])


min_matric = data['Matric_Marks'].min()
max_matric = data['Matric_Marks'].max()

data['Percentage_Matric'] = (data['Matric_Marks']/1100)*100
data['Percentage_Inter'] = (data['Inter_Marks']/1100)*100


data['Matric_Grade'] = pd.cut(x=data['Percentage_Matric'], bins=[
                              0, 49, 59, 69, 79, 89, 94, 100], labels=['F', 'E', 'D', 'C', 'B', 'A', 'A+'])
data['Inter_Grade'] = pd.cut(x=data['Percentage_Inter'], bins=[
                             0, 49, 59, 69, 79, 89, 94, 100], labels=['F', 'E', 'D', 'C', 'B', 'A', 'A+'])


data.drop(columns=['Budget', 'Matric_Marks', 'Inter_Marks',
          'Percentage_Matric', 'Percentage_Inter'], inplace=True)

data.rename(columns={'bins_budget': "Budget"}, inplace=True)

data = data[['Gender', 'Race/Ethnicity', 'Home_City', 'Preferred_Langauge', 'Budget',
             'Study_Group', 'Degree_Program', 'Matric_Grade', 'Inter_Grade',  'Campus', 'University']]

X = data.iloc[:, 0:10]
y = data.iloc[:, 10]

# Encoding Data for ML
le = preprocessing.LabelEncoder()

gender = le.fit_transform(list(X['Gender']))
race = le.fit_transform(list(X['Race/Ethnicity']))
home_city = le.fit_transform(list(X['Home_City']))
preferred_lang = le.fit_transform(list(X['Preferred_Langauge']))
budget = le.fit_transform(list(X['Budget']))
study_group = le.fit_transform(list(X['Study_Group']))
degree_program = le.fit_transform(list(X['Degree_Program']))
matric_grade = le.fit_transform(list(X['Matric_Grade']))
inter_grade = le.fit_transform(list(X['Inter_Grade']))
campus = le.fit_transform(list(X['Campus']))

class_attribute = le.fit_transform(list(y))

X_prep = pd.DataFrame(list(zip(gender, race, home_city, preferred_lang, budget, study_group,
                               degree_program, matric_grade, inter_grade, campus)), columns=['Gender', 'Race/Ethnicity', 'Home_City', 'Preferred_Langauge', 'Budget', 'Study_Group', 'Degree_Program', 'Matric_Grade', 'Inter_Grade', 'Campus'])

y_prep = pd.DataFrame(list(class_attribute), columns=['University'])

# Splitting the data
X_train, X_test, Y_train, Y_test = train_test_split(
    X_prep, y_prep, random_state=99)
Y_train = np.ravel(Y_train)

# Create a Randomforest classifier
forest = RandomForestClassifier(n_estimators=30, random_state=123)

# Create a XGBoost classifier
boost = XGBClassifier(random_state=123, verbosity=0)


# Decision Tree Classification (DTC) Model Training
dtc = DecisionTreeClassifier(criterion='gini', random_state=10)

# Training bagging ensemble model
bclf = BaggingClassifier(base_estimator=DecisionTreeClassifier(), n_estimators=30, max_samples=0.8, oob_score=True,
                         random_state=0)

# ADAboost Model
adab = AdaBoostClassifier(
    base_estimator=DecisionTreeClassifier(), n_estimators=30, random_state=0)

estimators = [
    ('rf', forest),
    ('xgb', boost),
    ('dtc', dtc),
    ('bclf', bclf),
    ('adab', adab),
]

sclf = StackingClassifier(estimators=estimators, final_estimator=forest, cv=10)
sclf = sclf.fit(X_train, Y_train)
sclf_accuracy = sclf.score(X_test, Y_test)*100
print('CV_Accuracy: ', sclf_accuracy)

# Establishing connection to db
# myclient = pymongo.MongoClient(client, tlsCAFile=certifi.where())
# mydb = myclient[db]

# if collection in mydb.list_collection_names():
#     mycol = mydb[collection]
#     print('Collection already exist!')
#     Stacking_Model = save_model_to_db(model=sclf, client=client, db=db, dbconnection=collection,
#                                       model_name='Stacking_Model', accuracy=sclf_accuracy, update_insert='U')
# else:
#     # models not present
#     print('Collection doesnt exist!')
#     Stacking_Model = save_model_to_db(model=sclf, client=client, db=db, dbconnection=collection,
#                                       model_name='Stacking_Model', accuracy=sclf_accuracy, update_insert='I')
