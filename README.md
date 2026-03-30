# NeonFlix

A modern streaming platform application built with React and Node.js.

## Features

- 🎬 **Video Streaming**: Upload and stream videos in multiple formats
- 🔍 **Search & Discovery**: Advanced search with filters and recommendations
- 👤 **User Authentication**: Secure registration and login system
- 📱 **Responsive Design**: Modern UI that works on all devices
- ⭐ **User Interactions**: Like, dislike, and comment on videos
- 📊 **Analytics**: View counts and engagement metrics
- 🎨 **Modern UI**: Beautiful neon-themed interface with Tailwind CSS

## Tech Stack

### Frontend
- React 18
- React Router
- Tailwind CSS
- Lucide Icons
- Axios

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Multer for file uploads
- FFmpeg for video processing

## Quick Start

### Prerequisites
- Node.js 16+ 
- MongoDB
- FFmpeg (for video processing)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd neonflix
```

2. **Install dependencies**
```bash
npm run install-deps
```

3. **Set up environment variables**
```bash
# Copy and configure the server environment file
cp server/.env.example server/.env
```

4. **Start MongoDB**
```bash
# Make sure MongoDB is running on your system
mongod
```

5. **Run the application**
```bash
# Start both frontend and backend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile

### Videos
- `GET /api/videos` - Get all videos with pagination
- `GET /api/videos/trending` - Get trending videos
- `GET /api/videos/:id` - Get single video
- `GET /api/videos/:id/stream` - Stream video
- `POST /api/videos/:id/like` - Like video
- `POST /api/videos/:id/dislike` - Dislike video

### Upload
- `POST /api/upload/video` - Upload video
- `POST /api/upload/thumbnail` - Upload thumbnail

### Users
- `GET /api/users/:userId` - Get user profile
- `GET /api/users/:userId/videos` - Get user videos
- `POST /api/users/:userId/subscribe` - Subscribe/unsubscribe

## Project Structure

```
neonflix/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   └── utils/         # Utility functions
│   └── package.json
├── server/                # Node.js backend
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   ├── utils/           # Utility functions
│   └── uploads/         # File upload directory
├── shared/              # Shared utilities
└── package.json        # Root package.json
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
