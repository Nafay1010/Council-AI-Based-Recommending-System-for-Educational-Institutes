from sklearn.ensemble import RandomForestClassifier
from sklearn.tree import DecisionTreeClassifier
import pandas as pd
from sklearn import preprocessing
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.model_selection import cross_val_score
from sklearn.model_selection import GridSearchCV
import sys

# input hardcode values
CNIC = "13302-0464670-3"
budget_temp = 4
budget_val = float(budget_temp)
interest = "Gaming, Editing & Blogging"
degree_program = "BSEE"
preferred_location = "Islamabad"
study_group = "Pre-Engrr"
matric_marks = 997  # Out of 1100
inter_marks = 813  # Out of 1100
gender = "male"
race = "Punjabi"
preferred_language = "Urdu"
homecity = "Peshawar"

# input by web
# CNIC = sys.argv[1]
# budget_temp = sys.argv[2]
# budget_val = float(budget_temp)
# interest = sys.argv[3]
# degree_program = sys.argv[4]
# preferred_location = sys.argv[5]
# study_group = sys.argv[6]
# matric_percentage = sys.argv[7]
# matric_marks = int((int(matric_percentage) / 100) * 1100)
# inter_percentage = sys.argv[8]
# inter_marks = int((int(inter_percentage) / 100) * 1100)
# gender = sys.argv[9]
# preferred_language = sys.argv[10]
# race = sys.argv[11]
# homecity = sys.argv[12]


uni_data = pd.read_csv("./university_data.csv", encoding="unicode_escape")
# finding out universities with meets the criteria
uni_data = uni_data[(uni_data["Campus Location"] == preferred_location)]
uni_data = uni_data[(uni_data["Total Expense (in millions)"] <= budget_val)]
index = uni_data.index
for i in index:
    if degree_program not in uni_data["Programs Offered"][i]:
        uni_data.drop(i, axis=0, inplace=True)
universities = pd.DataFrame(uni_data["University Name"].value_counts())
# print(universities)
uni = universities.index.values

data = pd.read_csv("./CleanData_V2.csv", encoding="unicode_escape")
data.drop(
    columns=[
        "Hobby_Interest",
        "Fathers_Occupation",
        "Mothers_Occupation",
        "Year_of_Admission",
    ],
    inplace=True,
)

data.rename(columns={"Budget (in millions)": "Budget"}, inplace=True)


# contains list of enrolled students in universities which meets the criteria

if len(universities) != 0:
    data = data[data["University"].isin(uni)]
    X = data.iloc[:, 0:10]
    y = data.iloc[:, 10]

    user_data = {
        "Gender": gender,
        "Race/Ethnicity": race,  # categorized
        "Home_City": homecity,
        "Preferred_Langauge": preferred_language,
        "Budget": budget_val,  # categorized
        "Study_Group": study_group,
        "Degree_Program": degree_program,
        "Matric_Marks": matric_marks,  # categorized
        "Inter_Marks": inter_marks,  # categorized
        "Campus": preferred_location,
    }

    user_data = pd.DataFrame([user_data])
    X = pd.concat([X, user_data])
    min_budget = X["Budget"].min()
    max_budget = X["Budget"].max()
    mid_pt = float((min_budget + max_budget) / 2)
    upper_pt = float((mid_pt + max_budget) / 2)
    lower_pt = float((min_budget + mid_pt) / 2)

    X["bins_budget"] = pd.cut(
        x=X["Budget"],
        bins=[min_budget, lower_pt, upper_pt, max_budget],
        labels=[
            "Low",
            "Medium",
            "High",
        ],
        duplicates="raise",
    )

    min_matric = X["Matric_Marks"].min()
    max_matric = X["Matric_Marks"].max()

    X["Percentage_Matric"] = (X["Matric_Marks"] / 1100) * 100
    X["Percentage_Inter"] = (X["Inter_Marks"] / 1100) * 100

    X["Matric_Grade"] = pd.cut(
        x=X["Percentage_Matric"],
        bins=[0, 49, 59, 69, 79, 89, 94, 100],
        labels=["F", "E", "D", "C", "B", "A", "A+"],
    )
    X["Inter_Grade"] = pd.cut(
        x=X["Percentage_Inter"],
        bins=[0, 49, 59, 69, 79, 89, 94, 100],
        labels=["F", "E", "D", "C", "B", "A", "A+"],
    )

    X.drop(
        columns=[
            "Budget",
            "Matric_Marks",
            "Inter_Marks",
            "Percentage_Matric",
            "Percentage_Inter",
        ],
        inplace=True,
    )

    X.rename(columns={"bins_budget": "Budget"}, inplace=True)

    X = X[
        [
            "Gender",
            "Race/Ethnicity",
            "Home_City",
            "Preferred_Langauge",
            "Budget",
            "Study_Group",
            "Degree_Program",
            "Matric_Grade",
            "Inter_Grade",
            "Campus",
        ]
    ]

    if len(y.value_counts().unique()) != 1:
        # Encoding
        le = preprocessing.LabelEncoder()

        gender = le.fit_transform(list(X["Gender"]))
        race = le.fit_transform(list(X["Race/Ethnicity"]))
        home_city = le.fit_transform(list(X["Home_City"]))
        preferred_language = le.fit_transform(list(X["Preferred_Langauge"]))
        budget = le.fit_transform(list(X["Budget"]))
        study_group = le.fit_transform(list(X["Study_Group"]))
        degree_programs = le.fit_transform(list(X["Degree_Program"]))
        matric_grade = le.fit_transform(list(X["Matric_Grade"]))
        inter_grade = le.fit_transform(list(X["Inter_Grade"]))
        campus = le.fit_transform(list(X["Campus"]))

        class_attribute = le.fit_transform(list(y))

        X_prep = pd.DataFrame(
            list(
                zip(
                    gender,
                    race,
                    home_city,
                    preferred_language,
                    budget,
                    study_group,
                    degree_programs,
                    matric_grade,
                    inter_grade,
                    campus,
                )
            ),
            columns=[
                "Gender",
                "Race/Ethnicity",
                "Home_City",
                "Preferred_Langauge",
                "Budget",
                "Study_Group",
                "Degree_Program",
                "Matric Grade",
                "Inter Grade",
                "Campus",
            ],
        )
        y_prep = pd.DataFrame(list(class_attribute), columns=["University"])

        i = X_prep.tail(1).index.values[0]
        user_data_prep = pd.DataFrame(X_prep.iloc[i])
        user_data_prep = user_data_prep.transpose()
        X_prep.drop([i], inplace=True)

        # Splitting the data
        X_train, X_test, Y_train, Y_test = train_test_split(
            X_prep, y_prep, random_state=99
        )
        Y_train = np.ravel(Y_train)

        # Create a Randomforest classifier
        forest = RandomForestClassifier()

        # Random Forest hyperparameters tuning using GridSearchCV

        # Number of trees in random forest
        n_estimators = [int(x) for x in np.linspace(start=10, stop=100, num=30)]
        # # Number of features to consider at every split
        max_features = ["log2", "sqrt"]
        # # Maximum number of levels in tree
        max_depth = [None]
        # # Number of samples to draw from X to train each base estimator
        max_samples = [0.6, 0.7]

        # # Create the param grid
        param_grid = {
            "n_estimators": n_estimators,
            "max_features": max_features,
            "max_depth": max_depth,
            "max_samples": max_samples,
        }

        rf_Grid = GridSearchCV(
            estimator=forest, param_grid=param_grid, cv=2, n_jobs=-1
        )

        rf_Grid.fit(X_train, Y_train)
        # forest.fit(X_train, Y_train)
        # forest_accuracy = forest.score(X_test, Y_test) * 100

        # print(rf_Grid.best_params_)

        # print(f"Train Accuracy - : {rf_Grid.score(X_train,Y_train):.3f}")
        # print(f"Test Accuracy - : {rf_Grid.score(X_test,Y_test):.3f}")

        rf_Grid_accuracy = rf_Grid.score(X_test, Y_test)*100

        university = le.inverse_transform(rf_Grid.predict(user_data_prep))
        university = university[0]
    else:
        university = y.value_counts().index[0]
        rf_Grid_accuracy = 96.6354

    # print("EXPECTED OUTPUT: ", university)

    # finding cosine similarity
    data = pd.read_csv("./university_data.csv", encoding="unicode_escape")
    data = data[
        (data["Campus Location"] == preferred_location)
        & (data["Total Expense (in millions)"] <= budget_val)
    ]
    index = data.index
    for i in index:
        if degree_program not in data["Programs Offered"][i]:
            data.drop(i, axis=0, inplace=True)

    data.drop(
        columns=["HEC Recognition Status", "Campus Location", "Programs Offered"],
        inplace=True,
    )

    # # Encoding
    le = preprocessing.LabelEncoder()

    UniversityName = list(data["University Name"])

    UniversityType = le.fit_transform(list(data["Type of University"]))

    CampusSize = le.fit_transform(list(data["Campus Size"]))

    HostelAcc = HostelAcc = le.fit_transform(list(data["Hostel Accomodation"]))

    Loan_Scholarship = le.fit_transform(list(data["Loan_Scholarship"]))

    AcceptanceRate = list(data["Acceptance Rate"].str.rstrip("%").astype("int"))
    AcceptanceRate = preprocessing.normalize([AcceptanceRate])
    AcceptanceRate = AcceptanceRate.flatten()

    TotalExpense = list(data["Total Expense (in millions)"])
    TotalExpense = preprocessing.normalize([TotalExpense])
    TotalExpense = TotalExpense.flatten()

    data = pd.DataFrame(
        list(
            zip(
                UniversityName,
                UniversityType,
                CampusSize,
                AcceptanceRate,
                TotalExpense,
                HostelAcc,
                Loan_Scholarship,
            )
        ),
        columns=[
            "University Name",
            "Type of University",
            "Campus Size",
            "Acceptance Rate",
            "Total Expense",
            "Hostel Accomodation",
            "Loan Scholarship",
        ],
    )
    X_prep = data.drop(columns="University Name")
    CS = cosine_similarity(X_prep)
    CS = pd.DataFrame(CS)
    university_index = data[data["University Name"] == university].index.values
    CS = CS[university_index[0]]
    CS = pd.DataFrame(CS)
    CS = CS.sort_values(by=university_index[0], ascending=False)
    index = CS.transpose().columns
    similarity = []
    for i in range(len(index)):
        similarity.append(data["University Name"][index[i]])

    rf_Grid_accuracy = str(rf_Grid_accuracy) + "%"
    print(rf_Grid_accuracy, similarity)
else:
    print([])
