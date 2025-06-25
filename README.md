
<h1 align="center">🚖 Caby – Your Personal Cab Booking Platform</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Made%20With-Node.js-green?style=flat-square" />
  <img src="https://img.shields.io/badge/Backend-Express.js-blue?style=flat-square" />
  <img src="https://img.shields.io/badge/Database-PostgreSQL-orange?style=flat-square" />
  <img src="https://img.shields.io/badge/Frontend-React.js-yellow?style=flat-square" />
</p>

<p align="center">
  <em>Book. Ride. Go.</em><br>
  A modern, full-stack cab booking application designed for seamless ride experiences, real-time captain matching, and smart AI agent integration.
</p>

---

## 🧠 Overview

**Caby** is a full-featured cab booking platform built with a microservices-ready backend, real-time captain tracking, and intelligent ride allocation. Designed for scalability and user-first experience, Caby empowers riders and captains to connect faster and safer.

---

## 🚀 Features

- 🧭 Real-time nearest captain detection
- 👥 Captain & Rider Authentication
- 📍 Live location tracking (Socket.io/WebSocket)
- 🚘 Ride creation, start, and end logic
- 🔔 Notifications for ride status updates
- 🤖 AI Assistant for smart booking help (MCP/A2A compatible)
- 📊 Admin dashboard for trip and user analytics
- 🗺️ Integrated Map view for location selection

---

## 🛠️ Tech Stack

| Layer      | Tech                                   |
|------------|----------------------------------------|
| Frontend   | React.js, Tailwind CSS, Context API    |
| Backend    | Node.js, Express.js                    |
| Database   | PostgreSQL (Sequelize ORM)             |
| Realtime   | Socket.io / WebSocket                  |
| Auth       | JWT, bcrypt.js                         |
| AI Agents  | MCP Server, Gemini API, Agent Protocol |
| DevOps     | Docker, Nginx (optional for prod)      |

---

## 📂 Project Structure

```

caby/
├── client/                  # Frontend (React)
├── server/                  # Backend (Express.js)
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── models/
│   └── utils/
├── ai-agent/                # MCP agent service
└── README.md

````

---

## 🔧 Setup Instructions

```bash
# Clone the repository
git clone https://github.com/your-username/caby.git
cd caby

# Install backend dependencies
cd server
npm install

# Setup environment variables
cp .env.example .env
# Add DB credentials, JWT secret, etc.

# Run the backend server
npm start

# In a new terminal, install frontend dependencies
cd ../client
npm install

# Run the frontend
npm start
````

---

## 🧪 Test Credentials

* **Rider Account:**
  📧 `rider@example.com` | 🔐 `password123`

* **Captain Account:**
  📧 `captain@example.com` | 🔐 `password123`

* **Admin Dashboard:**
  📧 `admin@example.com` | 🔐 `admin1234`

---

## 📽️ Demo

> 👉 [Watch Caby in Action](https://your-demo-link.com)
> *(Add Loom or YouTube link here)*

---

## 🛡️ Security

* JWT-based auth for both captains and users
* Input validation & rate limiting
* Role-based route protection

---

## 🧠 AI & Agents Integration

Caby integrates with intelligent AI agents via the [MCP protocol](https://github.com/openai/mcp) and Gemini API to:

* Auto-assign captains
* Handle common ride queries
* Assist admins with data insights

---

## 🤝 Contributing

We welcome contributions to make **Caby** better!

```bash
# Fork the repo
# Create a new branch
git checkout -b feature/your-feature-name

# Make changes and push
git commit -m "Add your message"
git push origin feature/your-feature-name
```

---

## ⭐ Support

If you find this project helpful, please ⭐ the repo and share with others!

---

## 📜 License

MIT License © 2025 [Shreesh Sanyal](https://github.com/ShreeshSanyal)

```

---

### ✅ Tips to Enhance Further:
- Add **screenshots or gifs** of the UI in action under a `📸 Screenshots` section.
- Embed a **demo video** (via Loom or YouTube) using a Markdown image with a play button.
- Connect a **live deployment link** (Vercel/Render/Heroku).
- Use **badges** for test coverage, CI/CD status, and GitHub insights.

Would you like me to help generate the screenshots section or add a live demo setup guide too?
```
