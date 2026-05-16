# Car Rental Booking System

A full-stack car rental booking application built with the MERN stack (MongoDB, Express, React, Node.js). This platform enables users to browse and book rental cars while providing car owners with a comprehensive dashboard to manage their vehicles and bookings.

---

## Features

### User Features
- **User Authentication** - Secure registration and login with JWT tokens
- **Car Browsing** - View all available cars with detailed specifications
- **Car Details** - Detailed view of each car including images, pricing, and availability
- **Booking System** - Easy-to-use booking interface with date selection
- **My Bookings** - Track and manage your booking history

### Owner Features
- **Owner Dashboard** - Comprehensive dashboard for car owners
- **Add New Cars** - Upload car details and images
- **Manage Cars** - Edit, update, or remove car listings
- **Manage Bookings** - View and manage bookings for owned cars

### Technical Features
- **Image Upload** - Efficient image management with ImageKit
- **Responsive Design** - Mobile-friendly interface using TailwindCSS
- **RESTful API** - Well-structured API endpoints
- **Modern UI** - Sleek animations with Motion library

---

## Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| React 19 | UI Framework |
| Vite | Build Tool |
| TailwindCSS 4 | Styling |
| React Router DOM | Navigation |
| Axios | HTTP Client |
| Motion | Animations |
| React Hot Toast | Notifications |

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js | Runtime Environment |
| Express.js | Web Framework |
| MongoDB | Database |
| Mongoose | ODM |
| JWT | Authentication |
| bcrypt | Password Hashing |
| Multer | File Upload |
| ImageKit | Image CDN |

---

## Project Structure

```
Full-Stack-Car-Rental-Booking/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── context/        # React context for state
│   │   ├── assets/         # Static assets
│   │   ├── App.jsx         # Main app component
│   │   └── main.jsx        # Entry point
│   ├── index.html          # HTML entry
│   ├── package.json        # Frontend dependencies
│   └── vite.config.js      # Vite configuration
│
├── backend/                  # Node.js backend API
│   ├── configs/            # Database & image config
│   ├── models/             # MongoDB models
│   ├── controllers/        # Business logic
│   ├── routes/             # API routes
│   ├── server.js           # Server entry point
│   ├── package.json        # Backend dependencies
│   └── vercel.json         # Vercel deployment config
│
├── .gitignore              # Git ignore rules
└── README.md               # This file
```

---

## API Endpoints

### User Routes (`/api/user`)
- `POST /api/user/register` - Register new user
- `POST /api/user/login` - User login
- `GET /api/user` - Get user data

### Owner Routes (`/api/owner`)
- `POST /api/owner/register` - Register as owner
- `POST /api/owner/login` - Owner login
- `POST /api/owner/add-car` - Add new car
- `GET /api/owner/cars` - Get owner's cars
- `PUT /api/owner/car/:id` - Update car details
- `DELETE /api/owner/car/:id` - Delete car
- `GET /api/owner/bookings` - Get owner's bookings

### Booking Routes (`/api/bookings`)
- `POST /api/bookings` - Create new booking
- `GET /api/bookings/user/:userId` - Get user's bookings
- `PUT /api/bookings/:id` - Update booking status
- `DELETE /api/bookings/:id` - Cancel booking

---

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Full-Stack-Car-Rental-Booking
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Configure Backend Environment**
   Create a `.env` file in the backend directory:
   ```env
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
   IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
   IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_id
   ```

4. **Install Frontend Dependencies**
   ```bash
   cd frontend
   npm install
   ```

### Running the Application

1. **Start Backend Server**
   ```bash
   cd backend
   npm run server
   ```
   Server runs on `http://localhost:3000`

2. **Start Frontend Development Server**
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend runs on `http://localhost:5173`

### Building for Production

**Frontend:**
```bash
cd frontend
npm run build
```

---

## Environment Variables

### Backend (.env)
| Variable | Description |
|----------|-------------|
| PORT | Server port number |
| MONGODB_URI | MongoDB connection string |
| JWT_SECRET | Secret key for JWT tokens |
| IMAGEKIT_PUBLIC_KEY | ImageKit public key |
| IMAGEKIT_PRIVATE_KEY | ImageKit private key |
| IMAGEKIT_URL_ENDPOINT | ImageKit URL endpoint |

---

## Deployment

### Backend (Vercel)
The backend is configured for Vercel deployment with `vercel.json` configuration.

### Frontend (Vercel)
The frontend is configured for Vercel deployment with `vercel.json` configuration.

---

## License

ISC License

---

## Author

Ahmed DevX

---

## Acknowledgments

- Built with React, Node.js, Express, and MongoDB
- Styled with TailwindCSS
- Animations powered by Motion
- Images managed with ImageKit