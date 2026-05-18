# MediQueue | Tutor Booking Web Application

MediQueue is a premium, state-of-the-art tutor booking platform designed to simplify schedule planning, eliminate booking conflicts, and deliver a smooth learning session management flow for both students and instructors.

**Live Site URL:** [https://mediqueue-client.vercel.app](https://mediqueue-client.vercel.app)

---

## ✨ Key Product Features

- **🌐 Resilient Dual-Mode Database Connection**: Features a self-healing server database connection manager that automatically connects to local MongoDB, but falls back seamlessly to a file-persisted JSON database (`db.json`) if offline or local MongoDB services are inactive, ensuring 100% startup stability.
- **🔒 Active Date & Slot Pre-Booking Locks**: Prevents scheduling mistakes by dynamically restricting bookings if the current date is earlier than the tutor's session start date ("Booking is not available yet"), or if tutor slots hit 0 ("No available slots left").
- **⚡ Transactional Auto-Adjusting Slots**: Automatically decreases available tutor slots by 1 in the database upon successful booking, and increments available slots by 1 if a booked session is cancelled by a student, keeping schedules accurate.
- **🔑 Custom JWT Secure Authentication**: Integrates standard credential authentication (email & password) and a simulated Google social login flow. Instantly signs server-verified JSON Web Tokens (JWT) stored client-side for reliable route guard security.
- **✨ Private Reload State Persistence**: Uses a smart Browser State provider with dedicated loading animations, ensuring authenticated users never get logged out or redirected to `/login` when refreshing private dashboard routes.
- **🎨 Glassmorphic HSL Light & Dark Toggles**: Features premium responsive design incorporating custom Google Fonts (`Outfit` & `Inter`), Tailwind CSS v4, and dual DaisyUI themes (`emerald` and `forest`) for fluid dark and light switching.
- **🏷️ Real-Time Date Filters & Case-Insensitive Search**: Allows students to search instructors via a case-insensitive MongoDB `$regex` string matcher, and filter tutor sessions within customized start and end date ranges (`$gte`, `$lte`).
- **📌 Dynamic Branding Title Changes**: Automatically updates the browser tab title during client-side route changes to match the user's active page layout (e.g. `MediQueue | Browse Professional Tutors`).

---

## 🛠️ Architecture & Technology Stack

- **Client (Frontend)**: Next.js (App Router), Tailwind CSS v4, DaisyUI Components, Lucide React (Icons), React Hot Toast.
- **Server (Backend)**: Node.js, Express.js, MongoDB Official Node Driver, JSON Web Tokens (JWT), BcryptJS (Password Salting & Hashing), Cookie Parser.
- **Development Tooling**: Git Version Control, Nodemon, ESLint.

---

## 🚀 Local Installation & Set Up

### 1. Pre-requisites
- Ensure you have [Node.js](https://nodejs.org) (v18+) installed.
- Optional: Local [MongoDB](https://www.mongodb.com) server running on `127.0.0.1:27017` (if not running, the application will automatically fall back to the built-in file-persisted JSON database!).

### 2. Configure Backend Server
```bash
cd mediQueue-server
npm install
```
Create a `.env` file inside `mediQueue-server/` with the following configuration:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/mediQueue
JWT_SECRET=super_secret_key_for_mediqueue_jwt_token_2026
```
Start the backend development server:
```bash
npm run dev
```

### 3. Configure Frontend Client
```bash
cd ../mediQueue-client
npm install
```
Start the frontend Next.js development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) inside your web browser to browse and test the application!
