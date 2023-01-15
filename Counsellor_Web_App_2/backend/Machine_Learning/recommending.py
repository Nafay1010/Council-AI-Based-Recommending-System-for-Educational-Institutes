import pandas as pd
import pymongo
import pickle
import certifi
from sklearn.model_selection import train_test_split

data = pd.read_csv('./CleanData_Numeric.csv')

X = data.iloc[:, 0:13]
y = data.iloc[:, 13]

X_train, X_test, Y_train, Y_test = train_test_split(X, y, random_state=99)


def load_saved_model_from_db(model_name, client, db, dbconnection):
    json_data = {}

    myclient = pymongo.MongoClient(client, tlsCAFile=certifi.where())

    mydb = myclient[db]
    mycon = mydb[dbconnection]
    data = mycon.find({"name": model_name})

    for i in data:
        json_data = i

    pickled_model = json_data[model_name]

    return pickle.loads(pickled_model)


rfc = {'inserted_id': '63c1abc8c1c5e72235813373',
       'model_name': 'Random_Forest_Classification', 'created_time': 1673636808.1978333}
svm = {'inserted_id': '63c1abcac1c5e72235813375',
       'model_name': 'Support Vector Machine', 'created_time': 1673636810.4560819}
dtc = {'inserted_id': '63c1abcbc1c5e72235813377',
       'model_name': 'Decision Tree Classification', 'created_time': 1673636811.499123}

# Loading RFC Model from DB
rfc = load_saved_model_from_db(
    model_name=rfc['model_name'], client='mongodb+srv://nafay:password1234@mernapp.fnkr4nr.mongodb.net/', db='FYP', dbconnection='ML_models')

# Loading SVM Model from DB
svm = load_saved_model_from_db(
    model_name=svm['model_name'], client='mongodb+srv://nafay:password1234@mernapp.fnkr4nr.mongodb.net/', db='FYP', dbconnection='ML_models')

# Loading DTC Model from DB
dtc = load_saved_model_from_db(
    model_name=dtc['model_name'], client='mongodb+srv://nafay:password1234@mernapp.fnkr4nr.mongodb.net/', db='FYP', dbconnection='ML_models')
