# Coupon Distribution Web App Documentation

## Overview
The **Coupon Distribution Web App** allows users to claim coupons in a **round-robin** manner while preventing abuse. Admins can manage coupons, track claim history, and revoke claims through a secure admin panel.

## Features
### User Features
- **Claim Coupons**: Users can claim an available coupon.
- **Abuse Prevention**: Users cannot claim multiple coupons within a short period.
- **Responsive UI**: Mobile and desktop-friendly design.

### Admin Features
- **Add Coupons**: Admins can add new coupons to the system.
- **View Coupons**: See available and claimed coupons.
- **Unclaim Coupons**: Admins can revoke a coupon claim.
- **Claim History**: View which users have claimed coupons.
- **Secure Login**: Admin access requires authentication.

## Tech Stack
- **Frontend**: React (Vite), Tailwind CSS
- **Backend**: Node.js (Express), MongoDB
- **Authentication**: LocalStorage-based admin login
- **Deployment**: User-handled

## Installation & Setup
### Prerequisites
- Node.js & npm installed
- MongoDB Atlas or local MongoDB setup

### Backend Setup
1. Navigate to the backend folder:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Configure environment variables (`.env`):
   ```env
   MONGO_URI=your_mongo_connection_string
   VITE_ADMIN_USER=admin
   VITE_ADMIN_PASS=admin123
   ```
4. Start the backend server:
   ```sh
   npm start
   ```

### Frontend Setup
1. Navigate to the frontend folder:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```

## API Endpoints
### **User Routes**
- `POST /api/coupons/claim` → Claim an available coupon.
- `GET /api/coupons` → Retrieve all coupons.

### **Admin Routes**
- `POST /api/coupons/add` → Add a new coupon.
- `GET /api/coupons/history` → View claim history.
- `PATCH /api/coupons/unclaim/:code` → Revoke a claimed coupon.

## Usage
1. Users visit the homepage and click **"Claim Coupon"**.
2. If a coupon is available, they receive a unique coupon code.
3. Admins log in via the **Admin Panel**.
4. Admins can add, view, or revoke coupons as needed.

## Troubleshooting
### Tailwind CSS Not Applying Styles?
- Ensure Tailwind is installed:
  ```sh
  npm install -D tailwindcss postcss autoprefixer
  npx tailwindcss init -p
  ```
- Check `tailwind.config.js` content paths:
  ```js
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"]
  ```
- Restart the frontend server:
  ```sh
  npm run dev
  ```

### Cannot Connect to MongoDB?
- Ensure the MongoDB URI in `.env` is correct.
- Check if MongoDB is running (`mongod` for local setup).
- Restart the backend server:
  ```sh
  npm start
  ```

## Conclusion
This web app provides a streamlined **coupon distribution system** with a secure **admin panel** for management. Let me know if you need enhancements! 🚀

