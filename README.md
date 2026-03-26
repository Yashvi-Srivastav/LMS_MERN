# CourseNest - Learning Management System
CourseNest is a MERN-stack web application that allows students to browse, purchase, and learn from online courses, while giving admins full control to manage content, track revenue, and monitor platform growth. 
This project was built as a hands-on way to learn how real-world platforms handle authentication, payments, media, and dashboards — all in one place.

## Live Demo
Frontend: https://lms-mern-eta.vercel.app  
Backend: https://lms-mern-599c.onrender.com

Note: The backend is hosted on Render's free tier, so it may take 30-50 seconds to wake up on the first request. Just wait a moment and try again.

## What it does
=>For students:
- Create an account and log in securely
- Browse available courses
- Purchase a course using Stripe (test mode)
- Watch video lectures module by module
- Leave comments on modules
- Take quizzes after each module
=>For admins:
- View an analytics dashboard with total users, courses, enrollments, and revenue
- See a daily revenue chart for the last 7 days
- Create and manage courses with thumbnails
- Upload video modules for each course
- Create quizzes linked to specific modules

## Tech Stack
=>Frontend:
- React with Vite
- Tailwind CSS for styling
- Zustand for global state management
- React Query for data fetching and caching
- Recharts for the analytics chart
- Axios for API calls
- Stripe.js for payment UI
=>Backend:
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- Bcrypt for password hashing
- Stripe API for payment processing
- Cloudinary for video and image storage
=>Deployment:
- Frontend on Vercel
- Backend on Render
- Database on MongoDB Atlas

## How to run it locally

~You will need Node.js, a MongoDB Atlas account, a Stripe account, and a Cloudinary account before starting.
Setting up the backend:
~Go into the backend folder and install dependencies:
cd backend, npm install

~Create a .env file inside the backend folder with these values:
MONGO_URI=your_mongodb_connection_string  
JWT_SECRET=your_secret_key  
STRIPE_SECRET_KEY=your_stripe_secret_key  
CLIENT_URL=http://localhost:5173  
ADMIN=the_email_you_want_as_admin  
CLOUDINARY_CLOUD_NAME=your_cloudinary_name  
CLOUDINARY_API_KEY=your_cloudinary_key  
CLOUDINARY_API_SECRET=your_cloudinary_secret  

~Then start the backend:
npm run dev

~Setting up the frontend:
Go into the frontend folder and install dependencies:
cd frontend/lms-frontend  
npm install

~Create a .env file inside the lms-frontend folder with these values:
VITE_BASE_URL=http://localhost:5000/api  
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key  

~Then start the frontend:
npm run dev

## Testing payments
~This project uses Stripe in test mode so no real money is involved. To test a payment use the following card details:
Card number: 4242 4242 4242 4242  
Expiry: Any future date, for example 12/34  
CVC: Any three digits, for example 123  

## Project structure
The project is split into two main parts:
1.backend contains all the server-side code including controllers for auth, courses, modules, payments, quizzes, and analytics. Models define the MongoDB schemas. Routes wire everything together. Middleware handles authentication.
2.frontend/lms-frontend contains the React app. Pages are split into Admin and User sections. Hooks handle all API calls using React Query. The Store folder contains Zustand stores for global state. The Api folder contains all Axios API functions.

## A few things to know
-The admin account is determined by the email set in the ADMIN environment variable. Whoever registers with that email gets admin access automatically.
-The daily revenue chart currently shows data for a fixed date range. Updating it to always show the last 7 days from today is on the improvement list.
-Stripe is in test mode. To accept real payments the Stripe account would need to be verified with KYC and live keys would need to be used instead.

---

## Author

Built by Yashvi Srivastava  
GitHub: https://github.com/Yashvi-Srivastav  
