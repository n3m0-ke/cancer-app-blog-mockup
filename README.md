# Cancer App Blog Mockup

A full-stack blog application built as a prototype for a larger cancer support app. This mockup includes user authentication, role-based access control (admin, author, registered user, and anonymous visitor), commenting features, SEO metadata, and basic analytics (views, likes). Designed to support both a web and mobile frontend in the future.

## 📦 Stack

- **Backend:** Express.js, Node.js, Supabase PostgreSQL
- **Frontend:** React.js with Tailwind CSS v3
- **Authentication:** JWT-based auth with role-based access
- **Database Hosting:** Supabase
- **Version Control:** Git & GitHub

---

## 🔐 Features

- 🧑‍⚕️ Admin panel with post creation/editing and content statistics
- 📝 Authors can publish and manage blog posts
- 💬 Registered users can comment
- 👀 Anonymous visitors can browse content
- 📊 Post metadata: likes, views, categories, tags
- 🔎 SEO metadata support
- 🎯 Clean and modular code structure (controllers, routes, models)

---

## 📁 Folder Structure

```bash
cancer-app-blog-mockup/
├── backend/ # Express backend
│ ├── controllers/
│ ├── routes/
│ ├── middleware/
│ ├── db/
├── frontend/ # React + Tailwind frontend
│ ├── src/
│ ├── public/
├── .env
├── .gitignore
└── README.md
```
---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/cancer-app-blog-mockup.git
cd cancer-app-blog-mockup
```

### 2. Set up the backend

```bash
cd backend
npm install
# create a .env file and add your Supabase Postgres URI
npm run dev
```

### 3. Set up the frontend

```bash
cd ../frontend
npm install
npm start
```
### 4. Environment Variables

In your backend/.env file:

```bash
DATABASE_URL=your_supabase_connection_url
JWT_SECRET=your_super_secret_key
```

📌 To-Do
 Set up PostgreSQL schema and seed mock data

 Basic CRUD routes for posts, comments, users

 Tailwind v3 frontend with post list and detail pages

 JWT authentication & role-based access

 Commenting system (registered only)

 Admin dashboard

 Add media (images, YouTube links)

 Convert to mobile app using React Native or Expo


🤝 Contribution
This is a solo personal project. Contributions welcome later once the core prototype stabilizes.



🧠 Future Vision
This project is part of a larger app ecosystem aimed at improving cancer care in Kenya. The blog serves as an educational, inspirational, and engagement channel for patients, doctors, and caregivers.


📄 License
MIT License
