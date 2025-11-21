A dynamic, full-featured listing platform where users can create, manage, and review listings. Built with Node.js, Express, MongoDB, and MVC architecture, this app combines robust backend functionality with a responsive and intuitive UI. Perfect for showcasing, reviewing, and discovering listings with seamless user experience.

🔥 Features
User Functionality

User Authentication & Authorization using Passport.js.

Create, Read, Update, Delete (CRUD) listings.

Create & Delete Reviews on listings.

Rate Listings with a star-based system.

Profile Popup to manage user info.

Admin Functionality

Admins can delete any user, review, or listing.

Access to total statistics for admin only: number of users, listings, and reviews.

Advanced Features

Image Uploads using Cloudinary.

Geolocation integration using Geoapify.

Search & Filter Listings by category.

Responsive UI for seamless experience across devices.

Error Handling & Middlewares for robust performance.

🛠️ Tech Stack

Backend: Node.js, Express.js

Database: MongoDB, Mongoose

Authentication: Passport.js

File Uploads: Cloudinary

Geocoding & Maps: Geoapify

Frontend: HTML, CSS, JavaScript, EJS, Responsive Design

Architecture: MVC (Model-View-Controller)

⚡ How It Works

Users register and log in securely.

Authenticated users can create, edit, and delete listings.

Users can leave reviews and ratings on listings.

Admins have elevated access to manage users, listings, and reviews.

Track location of listing on map.

Users can search and filter listings by category.

All images are stored in Cloudinary for fast and reliable access.

📌 Folder Structure (MVC)
├── controllers # Route handlers & business logic
├── init        # Initial Listing Data
├── models      # Mongoose schemas
├── public      # CSS, JS, images
├── routes      # Express routes
├── utils       # Helper functions
├── views       # EJS templates
├── middlewares # Custom error handling & authentication
└── app.js      # Entry point


🚀 Installation

Clone the repository:

git clone https://github.com/asmitascript/voyago.git


Install dependencies:

npm install


Create a .env file with the following keys:

ATLASDB_URL=<your_mongodb_url>
CLOUD_NAME=<your_cloud_name>
CLOUD_API_KEY=<your_api_key>
CLOUD_API_SECRET=<your_api_secret>
GEOAPIFY_API_KEY=<your_geoapify_key>
SECRET_KEY=<your_session_secret>


Run the app:

npm start


Visit http://localhost:8080 in your browser.

📊 Stats & Analytics

Total Listings: Dynamic count shown in dashboard.

Total Users: Admins can see total registered users.

Total Reviews: Aggregated for each listing and overall.


💡 Future Enhancements

Implement real-time chat between users and listing owners.

Add wishlist/favorites for listings.

Enhance filtering & sorting options.

Add social login options (Google, Facebook).

📄 License

This project is MIT Licensed – feel free to use and modify!
