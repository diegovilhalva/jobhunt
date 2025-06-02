# Job Hunt 🧑‍💼💼

**Job Hunt** is a full-stack job portal web application where users can explore job opportunities, apply for them, and recruiters can post and manage job listings. Built using the **MERN Stack** and deployed on **Vercel**.

## 🌐 Live Demo

🔗 [https://jobhunt-jh38.vercel.app/](https://jobhunt-jh38.vercel.app/)

## 📂 Repository

📁 Source code: [https://github.com/diegovilhalva/jobhunt](https://github.com/diegovilhalva/jobhunt)

---

## ✨ Features

### 👤 Job Seekers

* Browse and search jobs by keyword, category, or location
* View detailed job info
* Apply for jobs
* Track application status (Applied, Under Review, Rejected, etc.)

### 🧑‍💼 Recruiters

* Role-based protected dashboard
* Post, edit, and delete jobs
* View applicants per job
* Update application statuses

### 🔐 Authentication

* JWT-based signup/login
* Role-based route protection

---

## 🛠️ Tech Stack

### Frontend

* React + Redux Toolkit
* Vite
* Tailwind CSS + [shadcn/ui](https://ui.shadcn.com)
* Lucide-react icons
* Axios
* React Router DOM

### Backend

* Node.js + Express.js
* MongoDB + Mongoose
* JWT authentication
* RESTful API
* Cloudinary integration
* CORS, dotenv

---

## 🚀 Getting Started (Development)

### Prerequisites

* Node.js
* MongoDB (Atlas or local)

### Clone the Repository

```bash
git clone https://github.com/diegovilhalva/jobhunt
cd jobhunt
```

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

Create a `.env` file:

```env
PORT=4000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_jwt_secret
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```
Create a `.env` file:
```env
     VITE_API_ENDPOINT=http://localhost:4000/api/v1
```

---

## 📦 Deployment

* **Frontend**: [Vercel](https://vercel.com)
* **Backend**: Can be hosted via Vercel Serverless Functions, Render, Railway, or Cyclic

---

## 🌟 Highlights

* Modern UI with Tailwind CSS + shadcn
* Fully functional recruiter dashboard
* Loading skeletons, toast notifications
* Optimized job search with debounce and pagination

---

## 📧 Contact

Created by **Diego Vilhalva**
GitHub: [@diegovilhalva](https://github.com/diegovilhalva)

---

## 📝 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---


