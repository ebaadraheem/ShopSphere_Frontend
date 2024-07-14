ShopSphere
Welcome to ShopSphere, an e-commerce platform built using the MERN stack (MongoDB, Express.js, React.js, Node.js) and integrated with Stripe for seamless payment processing. This README provides a detailed overview of the project's features, setup instructions, and usage guidelines.

Table of Contents
Features
Technologies Used
Prerequisites
Installation
Configuration
Running the Application
Usage
Screenshots
License
Features
User Authentication: Sign up, log in, and manage profiles using Firebase authentication.
Product Management: Admin functionalities to create, update, and delete products.
Order Management: Users can create and manage their orders.
Favorites: Users can add products to their favorites.
Categories: Browse products by categories.
Search Functionality: Search for products by name or category.
Contact Form: Users can send messages to the admin.
Stripe Payment Integration: Secure payment processing using Stripe.
Technologies Used
Frontend: React.js, Tailwind CSS
Backend: Node.js, Express.js
Database: MongoDB
Authentication: Firebase
Payment Processing: Stripe
Prerequisites
Before you begin, ensure you have the following installed on your local machine:

Node.js (v14.x or later)
npm (v6.x or later)
MongoDB (v4.x or later)
Installation
Clone the repository:

sh
Copy code
git clone https://github.com/your-username/shopsphere.git
cd shopsphere
Install dependencies for the backend:

sh
Copy code
cd backend
npm install
Install dependencies for the frontend:

sh
Copy code
cd ../frontend
npm install
Configuration
Backend Configuration:

Create a .env file in the backend directory with the following environment variables:

env
Copy code
DB_CONNECTION_STRING=Database_Url
STRIPE_SECRET_KEY=your_stripe_secret_key
Frontend_URL=http://localhost:3000
AZURE_STORAGE_CONTAINER=Your_container_name
AZURE_STORAGE_CONNECTION_STRING=Connection_string
Frontend Configuration:

Create a .env file in the frontend directory with the following environment variables:

env
Copy code
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
VITE_BACKEND_URL=http://localhost:5000
VITE_ADMIN_ID=Your_specific_admin_id
VITE_FIREBASE_API_KEY=your_firebase_api_key

Running the Application
Start the backend server:

sh
Copy code
cd backend
nodemon server.js
Start the frontend server:

sh
Copy code
cd ../frontend
npm run dev
Usage
User Authentication:

Sign up and log in to access the platform.
Update profile information from the user dashboard.
Product Management:

Admin users can create, update, and delete products.
Order Management:

Users can add products to their cart and place orders.
Order details are stored and managed through the backend.
Favorites:

Add products to your favorites list for quick access.
Stripe Payment Integration:

Complete the checkout process securely using Stripe.
View payment status and order details after successful payment.

License
This project is licensed under the MIT License. See the LICENSE file for details.

Thank you for using ShopSphere! 
