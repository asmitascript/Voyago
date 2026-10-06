# Voyago

Voyago is a full-stack travel listing platform where users can discover, create, manage, and review travel destinations. It provides secure authentication, listing management, reviews and ratings, category-based discovery, image uploads, and interactive location mapping through Geoapify.

The project follows an MVC architecture using Node.js, Express.js, MongoDB, and EJS to provide a structured and responsive travel listing experience.

---

# Features

* User registration and authentication
* User authorization and protected routes
* Create, read, update, and delete listings
* Create and delete reviews
* Star-based listing ratings
* Category-based listing search and filtering
* Listing image uploads using Cloudinary
* Geolocation and interactive maps using Geoapify
* User profile management
* Admin-level access and moderation
* Admin dashboard statistics
* Responsive user interface
* Custom middleware and error handling
* MVC-based application architecture

---

# Tech Stack

## Frontend

* HTML
* CSS
* JavaScript
* EJS
* Responsive Design

## Backend

* Node.js
* Express.js

## Database

* MongoDB
* Mongoose

## Authentication

* Passport.js
* Session-based Authentication

## External Services

* Cloudinary — Image Storage
* Geoapify — Geocoding and Maps

## Architecture

* Model-View-Controller (MVC)

## Development Tools

* Git
* GitHub
* Visual Studio Code

---

# How It Works

```text
                 ┌──────────────────────┐
                 │     User Login       │
                 │    / Registration    │
                 └──────────┬───────────┘
                            │
                            ▼
                 ┌──────────────────────┐
                 │    Browse Listings   │
                 │                      │
                 │ Search / Filter      │
                 │ Category Discovery   │
                 └──────────┬───────────┘
                            │
                            ▼
                 ┌──────────────────────┐
                 │    View Listing      │
                 │                      │
                 │ Details              │
                 │ Reviews              │
                 │ Ratings              │
                 │ Location Map         │
                 └──────────┬───────────┘
                            │
                            ▼
                 ┌──────────────────────┐
                 │   Create Listing     │
                 │                      │
                 │ Details              │
                 │ Image Upload         │
                 │ Location             │
                 └──────────┬───────────┘
                            │
                            ▼
                 ┌──────────────────────┐
                 │      MongoDB         │
                 │   Listing Data       │
                 └──────────────────────┘
```

---

# Application Workflow

1. The user registers or logs into the application.
2. The user can browse available travel listings.
3. Listings can be searched and filtered by category.
4. A user can open a listing to view its details, reviews, ratings, and location.
5. Authenticated users can create their own listings.
6. Listing images are uploaded to Cloudinary.
7. Listing locations are processed using Geoapify and displayed on an interactive map.
8. Users can submit reviews and ratings for listings.
9. Listing owners can manage their own listings.
10. Administrators can moderate users, listings, and reviews.
11. Administrators can view platform-level statistics.

---

# Project Structure

```text
Voyago/
│
├── controllers/
│   └── Route handlers and business logic
│
├── init/
│   └── Initial listing data
│
├── models/
│   ├── User model
│   ├── Listing model
│   └── Review model
│
├── public/
│   ├── CSS
│   ├── JavaScript
│   └── Static assets
│
├── routes/
│   └── Application routes
│
├── utils/
│   └── Helper functions
│
├── views/
│   └── EJS templates
│
├── middlewares/
│   ├── Authentication
│   ├── Authorization
│   └── Error handling
│
├── app.js
├── package.json
└── ...
```

> The structure may evolve as additional features are implemented.

---

# MVC Architecture

Voyago follows the **Model-View-Controller (MVC)** architecture to separate application responsibilities.

```text
                 User Request
                      │
                      ▼
                   Routes
                      │
                      ▼
                Controllers
                 /        \
                ▼          ▼
             Models      Business
                │          Logic
                ▼
             MongoDB
                │
                ▼
              Views
                │
                ▼
              User
```

### Model

Handles application data and database schemas using Mongoose.

### View

EJS templates are used to render the user interface.

### Controller

Contains route handlers and application logic, keeping routes organized and separating business logic from the views.

---

# Authentication and Security

Voyago implements authentication and authorization to protect user accounts and application resources.

* Passport.js is used for user authentication.
* Passwords are securely handled through the authentication system.
* Protected routes require authentication.
* Users can manage only resources they are authorized to modify.
* Admin users have additional moderation privileges.
* Authorization middleware protects restricted operations.
* Environment variables are used for sensitive API credentials and configuration.
* Custom error-handling middleware manages application errors.

---

# Cloudinary Integration

Voyago uses **Cloudinary** for listing image storage.

```text
User
 │
 ▼
Upload Listing Image
 │
 ▼
Cloudinary
 │
 ▼
Image URL
 │
 ▼
Listing Document
 │
 ▼
MongoDB
```

This keeps image storage separate from the application server while allowing listing images to be displayed through their stored URLs.

---

# Geolocation and Maps

Voyago integrates **Geoapify** to provide location-based functionality.

```text
Listing Location
       │
       ▼
   Geoapify API
       │
       ▼
   Geocoding
       │
       ▼
 Coordinates
       │
       ▼
 Interactive Map
```

Users can view the geographical location associated with a listing directly on the listing page.

---

# Admin Functionality

Administrators have additional privileges for managing the platform.

### Admin capabilities

* View total registered users
* View total listings
* View total reviews
* Delete users
* Delete listings
* Delete reviews

This provides basic platform-level moderation and analytics.

---

# Setup and Installation

## Prerequisites

* Node.js
* MongoDB / MongoDB Atlas
* Cloudinary account
* Geoapify API key
* Git

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/asmitascript/voyago.git
cd voyago
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create Environment Variables

Create a `.env` file in the project root.

```env
ATLASDB_URL=<your_mongodb_url>
CLOUD_NAME=<your_cloudinary_name>
CLOUD_API_KEY=<your_cloudinary_api_key>
CLOUD_API_SECRET=<your_cloudinary_api_secret>
GEOAPIFY_API_KEY=<your_geoapify_api_key>
SECRET_KEY=<your_session_secret>
```
Do not commit the `.env` file or expose API credentials publicly.


### 4. Start the Application

```bash
npm start
```

The application will run at:

```text
http://localhost:8080
```

---

# Usage

1. Open the application.
2. Register a new account or log in.
3. Browse available listings.
4. Search or filter listings by category.
5. Open a listing to view its details.
6. View the listing location on the map.
7. Add a review and rating.
8. Create your own listing.
9. Upload images for your listing.
10. Edit or delete your own listings.
11. Administrators can access additional moderation and statistics functionality.

---

# Current Development Status

## Implemented

* [x] User registration and login
* [x] User authentication
* [x] User authorization
* [x] Listing CRUD operations
* [x] Listing image uploads
* [x] Cloudinary integration
* [x] Listing reviews
* [x] Star-based ratings
* [x] Category-based search
* [x] Category filtering
* [x] Geoapify geocoding
* [x] Interactive listing maps
* [x] User profile functionality
* [x] Admin authorization
* [x] Admin user moderation
* [x] Admin listing moderation
* [x] Admin review moderation
* [x] Platform statistics
* [x] Custom middleware
* [x] Error handling
* [x] MVC architecture
* [x] Responsive UI

## Planned

* [ ] Wishlist / favorite listings
* [ ] Real-time chat between users and listing owners
* [ ] Social login
* [ ] Personalized destination recommendations
* [ ] Advanced platform analytics

---

# Future Vision

The goal of Voyago is to evolve from a basic travel listing platform into a more complete destination discovery and travel management application.

Future versions could provide users with personalized recommendations based on their interests, saved destinations, and previous activity.

```text
User Activity
      │
      ▼
Preferences & History
      │
      ▼
Recommendation System
      │
      ▼
Personalized Destinations
      │
      ▼
Better Travel Discovery
```

---

# What I Learned

This project helped me gain practical experience with:

* Full-stack web application development
* MVC architecture
* Node.js and Express.js
* RESTful application design
* MongoDB data modeling
* Mongoose
* Authentication and authorization
* Passport.js
* Middleware design
* Cloudinary integration
* Geolocation APIs
* External API integration
* CRUD operations
* User-generated content
* Admin-level access control
* Error handling
* Responsive web development
* Building a complete application rather than isolated features


---

# 🤝 Contributing

Contributions, suggestions, and feedback are welcome.

If you'd like to contribute:

```bash
# Fork the repository

# Create a new branch
git checkout -b feature/your-feature

# Commit your changes
git commit -m "Add your feature"

# Push the branch
git push origin feature/your-feature
```

Then open a Pull Request.


---

# Author

**Asmita Chowdhury**

B.Tech Computer Science & Engineering

Interested in software engineering, full-stack development, and building real-world applications.

---

⭐ If you find this project interesting, consider giving the repository a star!
