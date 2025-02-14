# RideShare App

## Overview
RideShare is a web-based ride-sharing application similar to BlaBlaCar. The platform allows travelers to share their journeys with drivers who are willing to offer rides. Passengers can search for available rides, book a trip, and pay the driver for the journey.

## Features
- User authentication (Registration & Login)
- Drivers can post ride offers with journey details
- Passengers can search and book rides based on start and destination
- Google Maps API integration for route selection
- Payment system for ride fares

## Tech Stack
- **Frontend:** React (TypeScript)
- **Backend:** Django (Django REST Framework)
- **Database:** MySQL
- **Authentication:** JWT (JSON Web Tokens)
- **Containerization:** Docker & Docker Compose

## Setup Instructions

### **Prerequisites**
Ensure you have the following installed:
- Docker & Docker Compose
- Node.js (if running frontend locally)
- Python 3.10 (if running backend locally)

### **Installation & Running**
#### **1. Clone the repository**
```sh
git clone git@github.com:kapilpundit/ride_share.git
cd ride_share
```

#### **2. Start the project using Docker Compose**
```sh
docker compose up --build -d
```

#### **3. Access the application**
- **Backend:** `http://localhost:8000/`
- **Frontend:** `http://localhost:3000/`
- **phpMyAdmin (Database Management):** `http://localhost:8080/`

## **Frontend Development**
If you want to run the frontend outside Docker:
```sh
cd frontend
npm install
npm start
```

## **Backend Development**
If you want to run the backend outside Docker:
```sh
cd backend
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

## API Endpoints
### **Authentication**
- `POST /api/register/` - Register a new user
- `POST /api/login/` - Login and obtain JWT tokens

### **Ride Management**
- `POST /api/rides/` - Create a new ride
- `GET /api/rides/` - Get available rides
- `POST /api/bookings/` - Book a ride

## **Contributing**
1. Fork the repository.
2. Create a new branch.
3. Make your changes and commit them.
4. Push to your fork and submit a pull request.

## **License**
This project is licensed under the MIT License.

