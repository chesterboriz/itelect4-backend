# ITELECT4 Backend

Express + TypeScript + MongoDB REST API for the Campus Lost & Found system.

## 🔗 Live Links

| | URL |
|---|---|
| **Live Backend** | https://itelect4-backend-chi.vercel.app |
| **Live Frontend** | https://itelect4-project-nu.vercel.app |

## 🛠 Tech Stack

- **Runtime**: Node.js + TypeScript
- **Framework**: Express.js
- **Database**: MongoDB Atlas (Mongoose)
- **Auth**: JWT (jsonwebtoken) + bcryptjs
- **Deployment**: Vercel (Serverless)

## 📡 API Endpoints

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| GET | `/api/health` | No | Health check |
| POST | `/api/auth/register` | No | Register user |
| POST | `/api/auth/login` | No | Login user |
| GET | `/api/courses` | No | List courses |
| GET | `/api/courses/:code` | No | Get course |
| GET | `/api/items` | No | List lost items |
| POST | `/api/items` | Yes | Report lost item |
| GET | `/api/items/:id` | No | Get item detail |
| GET | `/api/submissions` | Yes | List submissions |
| POST | `/api/submissions` | Yes | Create submission |

## 🚀 Run Locally

```bash
# Install dependencies
npm install

# Copy env file and fill in values
cp .env.example .env

# Start dev server
npm run dev
```

## ⚙️ Environment Variables

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=4000
CORS_ORIGIN=http://localhost:5173
```
