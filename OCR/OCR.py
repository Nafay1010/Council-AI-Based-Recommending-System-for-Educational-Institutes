import pytesseract
from PIL import Image
import re
from skimage import filters, io, util
from skimage.io import imread, imsave
import numpy as np

# Load image as greyscale

image = imread('image_filecopy.jpg')


## Preprocessing
# Crop
rows, cols, _ = image.shape
v_start = int(0.65 * rows)
v_end = v_start + int(0.2 * rows) 

h_start = int(0.1 * cols)
h_end = h_start + int(0.4 * cols)

# print("before", image.shape)
image = image[v_start:v_end, h_start:h_end]
# print("after", image.shape)
Image.fromarray(image).convert("L").save('cropped.png')

# Convert to binary black and white
threshold = filters.threshold_otsu(image)
image = (image>threshold).astype(np.uint8) * 255
image = Image.fromarray(image)
image = image.convert("L")

image.save('cropped_and_filtered.png')

# Extract the text using Pytesseract
text = pytesseract.image_to_string(image)
text = text.lower()

# Find the word "Marks" in the text
if 'science' in text:
    subject = "Science"
elif 'arts' in text:
    subject = "Arts"
elif 'engineering':
    subject = "Engineering"
else:
    print("Subject not found")

x = re.search("marks obtained: (\d{3})", text)

if x is None:
    print("Marks not found")
else:
    marks = x.group(1)
    total = 850


print(f"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nStudent studied {subject} and obtained marks {marks} / {total}\n\n")
