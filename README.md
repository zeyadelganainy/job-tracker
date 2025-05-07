
# 🎯 Internship / Job Application Tracker

A full-stack web app to help users track job and internship applications across stages — from application to offer. Built with React, Node.js, and MongoDB.

---

## 🛠️ Tech Stack

| Layer     | Tech                         |
|-----------|------------------------------|
| Frontend  | React (Hooks), Tailwind CSS  |
| Backend   | Node.js, Express             |
| Database  | MongoDB Atlas                |
| Auth      | JWT-based Authentication     |
| Hosting   | Vercel (Frontend), Render (Backend) |

---

## ✨ Features

- ✅ User Registration & Login (JWT Auth)
- 🗃️ Add, edit, and delete job applications
- 🧠 Filter by status (e.g., Interview, Rejected, Offer)
- 🔍 Sort and search by company or date
- 📝 Save notes per application
- 📊 Dashboard overview of current status

---

## 🚀 Live Demo

👉 [https://job-tracker.vercel.app](https://job-tracker.vercel.app) *(placeholder)*

---

## 📂 Project Structure

```
/client            # React frontend
  └── components
  └── pages
  └── services
/server            # Node.js backend
  └── models
  └── routes
  └── controllers
```

---

## 🧪 Setup Instructions

### 1. Clone this repo

```bash
git clone https://github.com/yourusername/job-tracker.git
cd job-tracker
```

### 2. Backend Setup

```bash
cd server
npm install
touch .env
```

Add your MongoDB URI and JWT secret to `.env`:

```
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

```bash
npm run dev
```

### 3. Frontend Setup

```bash
cd ../client
npm install
npm run dev
```

---

## 🧠 Future Improvements

- 📤 Resume file uploads
- 📅 Interview reminders via email
- 📱 Mobile responsive design
- 🧑‍🤝‍🧑 Team collaboration support

---

## 📝 License

This project is licensed under the [MIT License](LICENSE).

---

## 🧑‍💻 Author

Made with ❤️ by [Zee](https://github.com/zeyadelganainy)
