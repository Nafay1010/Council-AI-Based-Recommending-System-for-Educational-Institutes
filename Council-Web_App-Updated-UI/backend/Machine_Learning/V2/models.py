import pandas as pd
import pymongo
import pickle
import time
import certifi
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import SVC
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score

# Storing model in MongoDB


def save_model_to_db(model, client, db, dbconnection, model_name, Accuracy):
    pickle_model = pickle.dumps(model)
    myclient = pymongo.MongoClient(client, tlsCAFile=certifi.where())
    mydb = myclient[db]

    mycon = mydb[dbconnection]
    info = mycon.insert_one(
        {model_name: pickle_model, 'name': model_name, 'created_time': time.time(), 'accuracy': Accuracy})
    print(info.inserted_id, 'saved with this id successfully!')

    details = {
        'inserted_id': info.inserted_id,
        'model_name': model_name,
        'created_time': time.time(),
        'accuracy': Accuracy,
    }

    return details


data = pd.read_csv('./CleanData_Numeric.csv')

X = data.iloc[:, 0:13]
y = data.iloc[:, 13]

X_train, X_test, Y_train, Y_test = train_test_split(X, y, random_state=99)

# Insert Models here

# RFC Model Training
rfc = RandomForestClassifier(
    n_estimators=100, criterion='gini', random_state=99)
rfc.fit(X_train, Y_train)

# SVC Model Training
svc = SVC(kernel='linear', C=1.0, random_state=5)
svc.fit(X_train, Y_train)

# Decision Tree Classification (DTC) Model Training
dtc = DecisionTreeClassifier(criterion='gini', random_state=10)
dtc.fit(X_train, Y_train)


# Storing Models into MongoDB
RFC_Model = save_model_to_db(model=rfc, client='mongodb+srv://nafay:password1234@mernapp.fnkr4nr.mongodb.net/',
                             db='FYP', dbconnection='ML_models', model_name='Random_Forest_Classification', Accuracy=accuracy_score(Y_test, rfc.predict(X_test)))
SVC_Model = save_model_to_db(model=svc, client='mongodb+srv://nafay:password1234@mernapp.fnkr4nr.mongodb.net/',
                             db='FYP', dbconnection='ML_models', model_name='Support Vector Machine', Accuracy=accuracy_score(Y_test, svc.predict(X_test)))
DTC_Model = save_model_to_db(model=dtc, client='mongodb+srv://nafay:password1234@mernapp.fnkr4nr.mongodb.net/',
                             db='FYP', dbconnection='ML_models', model_name='Decision Tree Classification', Accuracy=accuracy_score(Y_test, dtc.predict(X_test)))
