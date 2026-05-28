<div align="center">

# 🎓 Council

### **An AI-Based Recommending System for Educational Institutes**

_Helping students choose the right university with the power of Machine Learning._

<p>
  <img src="https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-6.7-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Python-3.10-3776AB?style=for-the-badge&logo=python&logoColor=white" />
  <img src="https://img.shields.io/badge/scikit--learn-ML-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white" />
  <img src="https://img.shields.io/badge/PyTorch-NLP-EE4C2C?style=for-the-badge&logo=pytorch&logoColor=white" />
</p>

<p>
  <img src="https://img.shields.io/badge/status-active-success.svg" />
  <img src="https://img.shields.io/badge/license-ISC-blue.svg" />
  <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" />
</p>

</div>

---

## 📖 Overview

Choosing the right university is one of the most consequential decisions a student makes — and the options can be overwhelming. **Council** is a full-stack web platform that takes the guesswork out of that decision.

By combining a **Random Forest classifier**, **cosine similarity**, and a **PyTorch-powered NLP chatbot**, Council analyzes a student's academic record, budget, interests, and personal preferences to recommend the universities that best match their profile.

> _Make your life easier with counseling — get a personalized list of universities tailored to **you**._

---

## ✨ Features

- 🧠 **AI-Powered Recommendations** — A Random Forest classifier trained on real student-enrollment data predicts the best-fit university, then ranks similar institutions by cosine similarity.
- 💬 **Conversational Chatbot** — A PyTorch feed-forward neural network with NLTK tokenization handles user queries about programs, admissions, and the platform itself.
- 📄 **OCR Document Capture** — Auto-extract academic info (CNIC, marks, etc.) from uploaded documents using OpenCV + Tesseract.
- 🔐 **Secure Authentication** — JWT-based login/signup flow with bcrypt-hashed credentials.
- 📊 **Personal Dashboard** — Logged-in users can manage their profile, view recommendations history, and submit feedback that retrains the model.
- 🔁 **Continuous Learning** — User feedback is appended to the training set, so the model gets better the more it's used.
- 🎨 **Modern UI** — Built with React 18, Material UI, Bootstrap, and AOS scroll animations.

---

## 🏗️ Architecture

```
                       ┌────────────────────────────┐
                       │      React Frontend         │
                       │ (UI · Forms · Dashboard)    │
                       └─────────────┬──────────────┘
                                     │  REST / JSON
                                     ▼
                       ┌────────────────────────────┐
                       │   Express.js Backend (API)  │
                       │  Auth · Routes · Middleware │
                       └──────┬──────────────┬──────┘
                              │              │
                ┌─────────────▼─────┐   ┌────▼──────────────┐
                │   MongoDB Atlas    │   │  Python ML Layer  │
                │  Users · Profiles  │   │  • RFC Recommender│
                │  Universities      │   │  • NLP Chatbot    │
                └────────────────────┘   │  • OCR Pipeline   │
                                         └───────────────────┘
```

The Node server **spawns Python child processes** on demand for ML inference, keeping the web layer language-agnostic and the ML layer easy to retrain.

📌 More diagrams in [`/Diagrams`](./Diagrams):
- `Use-Case.jpg` — System use-case diagram
- `Activity-Diagram.jpg` — End-to-end user flow
- `Component Diagram.png` — Component-level architecture
- `Stacking-Ensemble-Model.png` — ML model design

---

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 18, React Router, Material UI, React-Bootstrap, FontAwesome, AOS, Axios |
| **Backend** | Node.js, Express, Mongoose, JWT, Bcrypt, Multer, CORS |
| **Database** | MongoDB |
| **Machine Learning** | Python, scikit-learn (Random Forest, GridSearchCV), pandas, NumPy |
| **NLP / Chatbot** | PyTorch, NLTK, Bag-of-Words model |
| **OCR** | OpenCV, pytesseract |

---

## 📂 Project Structure

```
Council-AI-Based-Recommending-System-for-Educational-Institutes/
├── Council/
│   ├── backend/                 # Express API + Python ML scripts
│   │   ├── controllers/         # Auth + dashboard controllers
│   │   ├── routes/              # API route definitions
│   │   ├── models/              # Mongoose schemas
│   │   ├── middeware/           # Auth middleware (JWT)
│   │   ├── recommendation_V5*.py# Random Forest recommender
│   │   ├── chat.py / train.py   # NLP chatbot training + inference
│   │   ├── appendTraining.py    # Feedback → retraining pipeline
│   │   └── server.js            # Express entry point
│   └── frontend/                # React SPA
│       └── src/
│           ├── LandingPage.js
│           ├── Dashboard/
│           ├── Login&Register/
│           ├── Templates/
│           └── context/         # React context (auth)
├── chatbots.council/            # Standalone chatbot prototype
├── OCR/                         # OCR utilities (CNIC / marksheet)
├── Diagrams/                    # System & ML diagrams
└── Literature Reviews/          # Academic references for the project
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 16+ and **npm**
- **Python** 3.10+
- **MongoDB** instance (local or Atlas)

### 1 · Clone the repository
```bash
git clone https://github.com/Nafay1010/Council-AI-Based-Recommending-System-for-Educational-Institutes.git
cd Council-AI-Based-Recommending-System-for-Educational-Institutes
```

### 2 · Install Python dependencies
```bash
pip install scikit-learn pandas numpy torch nltk opencv-python pytesseract
```

### 3 · Configure backend
```bash
cd Council/backend
npm install
```

Create a `.env` file in `Council/backend/`:
```env
PORT=4000
MONGO_URI=<your-mongodb-connection-string>
SECRET=<your-jwt-secret>
```

### 4 · Install & run the frontend
```bash
cd ../frontend
npm install
npm start
```

### 5 · Launch the backend
```bash
cd ../backend
npm start
```

🎉 Visit **http://localhost:3000** and start recommending!

---

## 🧪 How It Works

1. **Student fills the form** — degree program, budget, marks, location, interests, etc.
2. **Filtering** — universities are pre-filtered by location, budget, and offered programs.
3. **Prediction** — a Random Forest classifier (trained on past enrollment data) predicts the best-fit university.
4. **Similarity ranking** — cosine similarity over university attributes (type, size, acceptance rate, expense, hostel availability, scholarships) ranks the next-most-similar institutions.
5. **Feedback loop** — when a user submits feedback, the data is appended to the training set and the model is retrained on the next server boot.

---

## 📊 Datasets

- `university_data.csv` — institutional metadata (program, location, expense, acceptance rate, etc.)
- `CleanData_V2 (shuffled).csv` — anonymized student-enrollment training data
- `Council Data Collection Survey (Responses).csv` — raw survey data behind the cleaned set

---

## 🤝 Contributing

Contributions, ideas, and bug reports are welcome! Please open an issue or submit a pull request.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📜 License

Released under the **ISC License**.

---

<div align="center">

**Built with ❤️ to help students find their perfect academic fit.**

</div>
