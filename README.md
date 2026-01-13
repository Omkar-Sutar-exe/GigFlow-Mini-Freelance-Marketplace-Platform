# GigPlatform - MERN Stack Gig Marketplace

A full-stack gig marketplace application built with the MERN stack (MongoDB, Express, React, Node.js). It allows users to post gigs, submit bids, and manage freelance hire flows.

## 🚀 Features

- **Authentication**: Secure JWT-based auth with HTTP-only cookies.
- **Gig Management**: Create, search, and view detailed gig listings.
- **Bidding System**: Freelancers can submit proposals; owners can hire.
- **User Dashboards**: Separate views for "My Gigs" (Owner) and "My Bids" (Freelancer).
- **Responsive UI**: Built with React and Tailwind CSS.

## 🛠️ Tech Stack

- **Frontend**: React, Tailwind CSS, Axios, React Router.
- **Backend**: Node.js, Express, Mongoose.
- **Database**: MongoDB.
- **Security**: JWT, BcryptJS, Cookie-parser, CORS.

## 📁 Project Structure

```text
gig-task/
├── backend/             # Node.js Express API
│   ├── config/          # Database configuration
│   ├── controllers/     # Request handlers
│   ├── middleware/      # Auth & error middlewares
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API endpoints
│   └── server.js        # Entry point
└── frontend/            # React Client
    ├── src/
    │   ├── api/         # Axios configuration
    │   ├── components/  # Shared UI components
    │   ├── context/     # Auth state management
    │   ├── pages/       # Page views
    │   └── App.jsx      # Main routing
```

## ⚙️ Getting Started

### 1. Prerequisites
- Node.js installed
- MongoDB URI (Local or Atlas)

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` folder:
```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
```
Start the backend:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
The app will be available at `http://localhost:5173`.

## 📡 API Endpoints

### Auth
- `POST /api/auth/register` - New user registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - Clear session
- `GET /api/auth/me` - Get current user profile

### Gigs
- `GET /api/gigs` - Fetch all open gigs (supports `?search=`)
- `POST /api/gigs` - Create a new gig (Protected)
- `GET /api/gigs/:id` - Get gig details
- `GET /api/gigs/user` - Get gigs posted by current user

### Bids
- `POST /api/bids` - Submit a bid (Protected)
- `GET /api/bids/:gigId` - Get bids for a specific gig (Owner only)
- `GET /api/bids/user` - Get bids submitted by current user
- `PATCH /api/bids/:bidId/hire` - Hire a freelancer (Owner only)