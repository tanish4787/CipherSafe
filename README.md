# 🔐 CipherSafe – Your Personal Privacy Command Center

**CipherSafe** is a secure, modular, and full-featured **MERN stack application** designed to help users proactively manage their digital privacy. From tracking app access to breach monitoring and vault encryption, CipherSafe serves as your one-stop dashboard for digital safety.

---

## 🚀 Features

### 🔍 1. App Tracker System

* Tracks applications users have granted access to.
* Stores app name and shared data securely.
* Auth protected using Clerk.
* Full CRUD functionality with validation.
* Modular design using Express (controllers, routes, middleware).

### ⚠️ 2. Breach Monitoring (API-based)

* Checks if user emails have been exposed in data breaches.
* Pluggable breach-checking service layer.
* Can integrate with HIBP (or mocked for dev use).

### 🔐 3. Vault Encryption *(Upcoming)*

* AES/RSA-based encryption for storing passwords and tokens.
* Vault system to manage sensitive data.

### 🧠 4. Risk Scoring *(Upcoming)*

* Assigns a privacy risk score to each app.
* Factors include shared permissions, breach history, etc.

### 👥 5. Secure Auth via Clerk

* Clerk-powered authentication with JWT extraction.
* Custom `authenticate` middleware injects session details.

---

## ⚙️ Tech Stack

| Layer    | Technology         |
| -------- | ------------------ |
| Frontend | React *(WIP)*      |
| Backend  | Node.js + Express  |
| Database | MongoDB + Mongoose |
| Auth     | Clerk.dev          |
| Utility  | dotenv, Helmet     |
| Testing  | Postman            |

---

## 🧩 Folder Structure

```
CipherSafe/
├── controllers/
│   └── appController.js
├── middlewares/
│   ├── auth.js
│   └── validation.js
├── models/
│   └── AppModel.js
├── routes/
│   └── appRoutes.js
├── services/
│   └── breachMonitor.service.js
├── utils/
│   ├── sendResponse.js
│   └── errorHandler.js
├── db/
│   └── db.js
├── index.js
├── .env
└── package.json
```

---

## 🧪 Local Development & Testing

### 1. Clone and Install

```bash
git clone https://github.com/yourusername/ciphersafe.git
cd ciphersafe
npm install
```

### 2. Create `.env` File

```
PORT=8000
MONGO_URI=your_mongo_uri
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

### 3. Run Server

```bash
npm start
```

### 4. Test with Postman

* Base URL: `http://localhost:8000/`
* Auth Header via Clerk JWT

---

## ✅ Completed Modules

* [x] MongoDB + Express Setup
* [x] Clerk Auth Integration
* [x] App Tracker CRUD
* [x] Secure Routes & Middleware
* [x] Centralized Error/Response Handler
* [x] Breach Monitoring API (Mocked)

---

## 🔧 Upcoming Modules

* [ ] Encrypted Vault System
* [ ] Risk Scoring Engine
* [ ] Frontend React Dashboard
* [ ] Real-time Breach Alerts
* [ ] Admin & Analytics Panel

---

## 💡 Learnings

* Real-world secure Auth using Clerk
* Clean RESTful API design and validation
* Modular architecture with service layers
* MongoDB data modeling with Mongoose

---

> **"Your digital safety starts with awareness — CipherSafe gives you the tools to stay ahead."**
