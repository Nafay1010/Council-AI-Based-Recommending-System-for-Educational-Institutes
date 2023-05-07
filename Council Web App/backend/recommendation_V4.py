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
import sys
from sklearn.metrics.pairwise import cosine_similarity


CNIC = sys.argv[1]
budget_temp = sys.argv[2]
budget = int(budget_temp)
interest = sys.argv[3]
degree_program = sys.argv[4]
preferred_location = sys.argv[5]
study_group = sys.argv[6]
matric_marks = sys.argv[7]
matric_marks = int(matric_marks)
inter_marks = sys.argv[8]
inter_marks = int(inter_marks)

# CNIC = '13302-0464670-3'
# budget_temp = 7
# budget = int(budget_temp)
# interest = 'Gaming'
# degree_program = 'BSCS'
# preferred_location = 'Peshawar'


# input

# Assuming text extracted from image got the following information
# study_group = 'CS'
# matric_marks = 900  # Out of 1100
# inter_marks = 950  # Out of 1100

data = pd.read_csv('./CleanData_V2.csv', encoding='unicode_escape')

data.drop(columns=['Hobby_Interest',
          'Fathers_Occupation', 'Mothers_Occupation', 'Year_of_Admission'],  inplace=True)

data.rename(columns={'Budget (in millions)': 'Budget'}, inplace=True)

X = data.iloc[:, 0:10]
y = data.iloc[:, 10]

client = pymongo.MongoClient(
    'mongodb+srv://nafay:password1234@mernapp.fnkr4nr.mongodb.net/', tlsCAFile=certifi.where())

db = client['FYP']
# col = db['datas']
# cursor = col.find({"CNIC": CNIC})
# for doc in cursor:
#     budget = int(doc['budget']/1000000)
#     degree_program = doc['degree_program']
#     preferred_location = doc['preferred_location']
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


# Create a Randomforest classifier
forest = RandomForestClassifier(n_estimators=100, random_state=123)

# Create a XGBoost classifier
boost = XGBClassifier(random_state=123, verbosity=0)


svr = make_pipeline(StandardScaler(), LinearSVC(random_state=42))

# SVC Model Training
svc = SVC(kernel='linear', C=1.0, random_state=5)

# Decision Tree Classification (DTC) Model Training
dtc = DecisionTreeClassifier(criterion='gini', random_state=10)

# Training bagging ensemble model
bclf = BaggingClassifier(base_estimator=DecisionTreeClassifier(), n_estimators=100, max_samples=0.8, oob_score=True,
                         random_state=0,)

# ADAboost Model
adab = AdaBoostClassifier(
    base_estimator=DecisionTreeClassifier(), n_estimators=100, random_state=0)

estimators = [
    ('rf', forest),
    ('xgb', boost),
    ('dtc', dtc),
    ('bclf', bclf),
    ('adab', adab),
    ('svr', svr),
    ('svc', svc),
]


sclf = StackingClassifier(estimators=estimators, final_estimator=bclf, cv=10)

sclf.fit(X_train, Y_train)


# print(f"\nTraining Accuracy: {sclf.score(X_train, Y_train):0.2f}")
# print(f"Testing Accuracy: {sclf.score(X_test, Y_test):0.2f}")


university = le.inverse_transform(sclf.predict(user_data_prep))

# finding cosine similarity
university = university[0]
preferred_location = sys.argv[5]
degree_program = sys.argv[4]


data = pd.read_csv('./university_data.csv')
data = data[(data['Campus Location'] == preferred_location)]
index = data.index
for i in index:
    if(degree_program not in data['Programs Offered'][i]):
        data.drop(i, axis=0, inplace=True)

data.drop(columns=['HEC Recognition Status',
          'Campus Location', 'Programs Offered'], inplace=True)
# # Encoding
le = preprocessing.LabelEncoder()

UniversityName = list(data['University Name'])

UniversityType = le.fit_transform(list(data['Type of University']))

CampusSize = le.fit_transform(list(data['Campus Size']))

HostelAcc = HostelAcc = le.fit_transform(list(data['Hostel Accomodation']))

Loan_Scholarship = le.fit_transform(list(data['Loan_Scholarship']))

AcceptanceRate = list(data['Acceptance Rate'].str.rstrip('%').astype('int'))
AcceptanceRate = preprocessing.normalize([AcceptanceRate])
AcceptanceRate = AcceptanceRate.flatten()


TotalExpense = list(data['Total Expense (in millions)'])
TotalExpense = preprocessing.normalize([TotalExpense])
TotalExpense = TotalExpense.flatten()

data = pd.DataFrame(
    list(zip(UniversityName, UniversityType, CampusSize, AcceptanceRate, TotalExpense, HostelAcc, Loan_Scholarship)), columns=['University Name', 'Type of University', 'Campus Size', 'Acceptance Rate', 'Total Expense', 'Hostel Accomodation', 'Loan Scholarship'])
X_prep = data.drop(columns='University Name')
CS = cosine_similarity(X_prep)
CS = pd.DataFrame(CS)
university_index = data[data['University Name'] == university].index.values
CS = CS[university_index[0]]
CS = pd.DataFrame(CS)
CS = CS.sort_values(by=university_index[0], ascending=False)
index = CS.transpose().columns
similarity = []
for i in range(len(index)):
    similarity.append(data['University Name'][index[i]])
print(similarity)
