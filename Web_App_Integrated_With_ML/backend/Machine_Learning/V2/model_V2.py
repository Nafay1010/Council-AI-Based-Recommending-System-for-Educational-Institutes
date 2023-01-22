import pymongo
import certifi
import time
import pickle
import pandas as pd
import numpy as np
from sklearn.model_selection import cross_val_score
from sklearn import preprocessing
from sklearn.model_selection import train_test_split

client = 'mongodb+srv://nafay:password1234@mernapp.fnkr4nr.mongodb.net/'
db = 'FYP'
collection = 'ML_models'

# ----------Insert Model Here----------
models = np.array(['Random_Forest_Classification',
                   'Support Vector Machine',
                   'Decision Tree Classification',
                   'Bagging Classifier (Base_Estimator: DTC))',
                   'ADA Boost Classifier (Base_Estimator: DTC))'])

# ----------------------------------------


def save_model_to_db(model, client, db, dbconnection, model_name, Accuracy):
    pickle_model = pickle.dumps(model)
    myclient = pymongo.MongoClient(client, tlsCAFile=certifi.where())
    mydb = myclient[db]

    mycon = mydb[dbconnection]
    info = mycon.insert_one(
        {model_name: pickle_model, 'name': model_name, 'created_time': time.time(), 'CV_accuracy': Accuracy})
    print(info.inserted_id, 'added to DB successfully!')

    details = {
        'inserted_id': info.inserted_id,
        'model_name': model_name,
        'created_time': time.time(),
        'CV_accuracy': Accuracy,
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

data['bins_budget'] = pd.cut(x=data['Budget'], bins=[min_budget, 5, 9, max_budget],
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

# Establishing connection to db
myclient = pymongo.MongoClient(client, tlsCAFile=certifi.where())
mydb = myclient[db]

if collection in mydb.list_collection_names():
    print('Collection already exist!')
    mycol = mydb[collection]
    # Checking documents in db
    if(mycol.count_documents({}) < len(models)):
        models_db = []  # Fetching names of models stored in DB
        mycon = mydb[collection]
        data = mycon.find({}, {"_id": 0, "name": 1})
        for i in data:
            models_db.append(i['name'])
        # comparing models with models_db
        models_db = np.array(models_db)
        diff = np.setdiff1d(models, models_db)
        print(diff, 'is missing!')
        print('Adding ', diff, 'Models to the database')
        # -------------Insert Model Here------------------
        if('Random_Forest_Classification' in diff):
            # Insert RFC here
            from sklearn.ensemble import RandomForestClassifier
            # RFC Model Training
            rfc = RandomForestClassifier(
                n_estimators=100, criterion='gini', random_state=99).fit(X_train, Y_train)
            # Cross-Validation
            result = cross_val_score(
                rfc, X_train, Y_train, cv=12)
            rfc_CV_accuracy = result.mean()*100
            # ----------------Storing Models into MongoDB------------------
            RFC_Model = save_model_to_db(model=rfc, client=client, db=db, dbconnection=collection,
                                         model_name='Random_Forest_Classification', Accuracy=rfc_CV_accuracy)

        if('Support Vector Machine' in diff):
            # Insert SVC here
            from sklearn.svm import SVC
            # SVC Model Training
            svc = SVC(kernel='linear', C=1.0, random_state=5).fit(
                X_train, Y_train)
            # Cross-Validation
            result = cross_val_score(svc, X_train, Y_train, cv=10)
            svc_CV_accuracy = result.mean()*100
            # ----------------Storing Models into MongoDB------------------
            SVC_Model = save_model_to_db(model=svc, client=client, db=db, dbconnection=collection,
                                         model_name='Support Vector Machine', Accuracy=svc_CV_accuracy)

        if('Decision Tree Classification' in diff):
            # Insert DTC here
            from sklearn.tree import DecisionTreeClassifier
            # Decision Tree Classification (DTC) Model Training
            dtc = DecisionTreeClassifier(
                criterion='gini', random_state=10).fit(X_train, Y_train)
            # Cross-Validation
            result = cross_val_score(dtc, X_train, Y_train, cv=10)
            dtc_CV_accuracy = result.mean()*100
            # ----------------Storing Models into MongoDB------------------
            DTC_Model = save_model_to_db(model=dtc, client=client, db=db, dbconnection=collection,
                                         model_name='Decision Tree Classification', Accuracy=dtc_CV_accuracy)

        # if('XGBoost' in diff):
        #     # Insert XGB here
        #     import xgboost as xgb
        #     data = pd.read_csv('./CleanData_V2_Preprocessed.csv')
        #     # XGBoost Classification
        #     dtrain = xgb.DMatrix(X_train, label=Y_train)
        #     dtest = xgb.DMatrix(X_test, label=Y_test)
        #     param = {
        #         'max_depth': 10,  # the maximum depth of each tree
        #         'eta': 0.30,  # the training step for each iteration
        #         'objective': 'multi:softprob',  # error evaluation for multiclass training
        #         'num_class': len(data['University'].unique())}  # the number of classes that exist in this datset
        #     num_round = 550  # the number of training iterations
        #     bst = xgb.train(param, dtrain, num_round)
            # ----------------Storing Models into MongoDB------------------
            # XGB_Model = save_model_to_db(model=bst, client=client, db=db, dbconnection=collection,
            #  model_name='XGBoost', Accuracy=accuracy_score(Y_test, np.asarray([np.argmax(line) for line in bst.predict(dtest)])))

        if('Bagging Classifier (Base_Estimator: DTC))' in diff):
            # Insert BCLF here
            from sklearn.ensemble import BaggingClassifier
            from sklearn.tree import DecisionTreeClassifier
            # Bagging Ensemble Model with DecisionTreeClassifier acting as a base Estimator
            bclf = BaggingClassifier(base_estimator=DecisionTreeClassifier(), n_estimators=100, max_samples=0.8,
                                     random_state=0,).fit(X_train, Y_train)
            # Cross-Validation
            result = cross_val_score(bclf, X_train, Y_train, cv=12)
            bclf_CV_accuracy = result.mean()*100
            # ----------------Storing Models into MongoDB------------------
            BCLF_Model = save_model_to_db(model=bclf, client=client, db=db, dbconnection=collection,
                                          model_name='Bagging Classifier (Base_Estimator: DTC))', Accuracy=bclf_CV_accuracy)

        if('ADA Boost Classifier (Base_Estimator: DTC))' in diff):
            # Insert ADAB here
            from sklearn.ensemble import AdaBoostClassifier
            from sklearn.tree import DecisionTreeClassifier
            # ADA Boost Ensemble Model with DecisionTreeClassifier acting as a base Estimator
            adab = AdaBoostClassifier(base_estimator=DecisionTreeClassifier(
            ), n_estimators=100, random_state=0).fit(X_train, Y_train)
            # Cross-Validation
            result = cross_val_score(adab, X_train, Y_train, cv=12)
            adab_CV_accuracy = result.mean()*100
            # ----------------Storing Models into MongoDB------------------
            ADAB_Model = save_model_to_db(model=adab, client=client, db=db, dbconnection=collection,
                                          model_name='ADA Boost Classifier (Base_Estimator: DTC))', Accuracy=adab_CV_accuracy)

    else:
        print('Models Present!')
else:
    # Models Not Present
    # ------------Importing Packages Here--------------
    import pandas as pd
    import numpy as np

    from sklearn.svm import SVC
    from sklearn.tree import DecisionTreeClassifier
    # import xgboost as xgb

    from sklearn.ensemble import BaggingClassifier
    from sklearn.ensemble import AdaBoostClassifier
    from sklearn.ensemble import RandomForestClassifier
    # ----------Insert Model Here----------

    # RFC Model Training
    rfc = RandomForestClassifier(
        n_estimators=100, criterion='gini', random_state=99).fit(X_train, Y_train)
    # Cross-Validation
    result = cross_val_score(rfc, X_train, Y_train, cv=12)
    rfc_CV_accuracy = result.mean()*100

    # SVC Model Training
    svc = SVC(kernel='linear', C=1.0, random_state=5).fit(X_train, Y_train)
    # Cross-Validation
    result = cross_val_score(svc, X_train, Y_train, cv=10)
    svc_CV_accuracy = result.mean()*100

    # Decision Tree Classification (DTC) Model Training
    dtc = DecisionTreeClassifier(
        criterion='gini', random_state=10).fit(X_train, Y_train)
    # Cross-Validation
    result = cross_val_score(dtc, X_train, Y_train, cv=10)
    dtc_CV_accuracy = result.mean()*100

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
    bclf = BaggingClassifier(base_estimator=DecisionTreeClassifier(), n_estimators=100, max_samples=0.8,
                             random_state=0,).fit(X_train, Y_train)
    # Cross-Validation
    result = cross_val_score(bclf, X_train, Y_train, cv=12)
    bclf_CV_accuracy = result.mean()*100

    # ADA Boost Ensemble Model with DecisionTreeClassifier acting as a base Estimator
    adab = AdaBoostClassifier(base_estimator=DecisionTreeClassifier(
    ), n_estimators=100, random_state=0).fit(X_train, Y_train)
    # Cross-Validation
    result = cross_val_score(adab, X_train, Y_train, cv=12)
    adab_CV_accuracy = result.mean()*100

    # -----------------Storing Models into MongoDB--------------------
    RFC_Model = save_model_to_db(model=rfc, client=client, db=db, dbconnection=collection,
                                 model_name='Random_Forest_Classification', Accuracy=rfc_CV_accuracy)

    SVC_Model = save_model_to_db(model=svc, client=client, db=db, dbconnection=collection,
                                 model_name='Support Vector Machine', Accuracy=svc_CV_accuracy)

    DTC_Model = save_model_to_db(model=dtc, client=client, db=db, dbconnection=collection,
                                 model_name='Decision Tree Classification', Accuracy=dtc_CV_accuracy)
    # XGB_Model = save_model_to_db(model=bst, client=client, db=db, dbconnection=collection,
    #  model_name='XGBoost', Accuracy=accuracy_score(Y_test, np.asarray([np.argmax(line) for line in bst.predict(dtest)])))
    BCLF_Model = save_model_to_db(model=bclf, client=client, db=db, dbconnection=collection,
                                  model_name='Bagging Classifier (Base_Estimator: DTC))', Accuracy=bclf_CV_accuracy)
    ADAB_Model = save_model_to_db(model=adab, client=client, db=db, dbconnection=collection,
                                  model_name='ADA Boost Classifier (Base_Estimator: DTC))', Accuracy=adab_CV_accuracy)
