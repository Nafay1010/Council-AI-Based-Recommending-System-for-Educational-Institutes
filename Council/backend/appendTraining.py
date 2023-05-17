import sys
import csv

# input hardcode values
# gender = "male"
# race = "Punjabi"
# homecity = "Kohat"
# preferred_language = "Urdu"
# interest = "Gaming"
# budget_temp = "4"
# budget = int(budget_temp)
# fatherOcc = "Engrr"
# motherOcc = "House Wife"
# study_group = "CS"
# degree_program = "BSCS"
# matric_marks = "980"
# matric_marks = int(matric_marks)
# inter_marks = "900"
# inter_marks = int(inter_marks)
# yearofadmission = "2023"
# campus = "Peshawar"
# university = "FAST NUCES"


# input by web
gender = sys.argv[1]
race = sys.argv[2]
homecity = sys.argv[3]
preferred_language = sys.argv[4]
interest = sys.argv[5]
budget_temp = sys.argv[6]
budget = int(budget_temp)
fatherOcc = sys.argv[7]
motherOcc = sys.argv[8]
study_group = sys.argv[9]
degree_program = sys.argv[10]
matric_marks = sys.argv[11]
matric_marks = int(matric_marks)
inter_marks = sys.argv[12]
inter_marks = int(inter_marks)
yearofadmission = sys.argv[13]
campus = sys.argv[14]
university = sys.argv[15]

List = [gender, race, homecity, preferred_language, interest, budget, fatherOcc, motherOcc,
        study_group, degree_program, matric_marks, inter_marks, yearofadmission, campus, university]

csv_file = 'CleanData_V2 (shuffled).csv'


with open(csv_file, 'r', newline='') as file:
    reader = csv.reader(file)
    rows = list(reader)

with open(csv_file, 'w', newline='') as file:
    writer = csv.writer(file)
    # Write the existing rows
    writer.writerows(rows)

    # Write the new record
    writer.writerow(List)
