# SportSphere Backend API

A comprehensive RESTful API for SportSphere - a unified multi-sport scoring, match management, and fitness hub platform.

## Features

- **User Authentication**: JWT-based authentication with role-based access control
- **Tournament Management**: Create, manage, and track sports tournaments
- **Team Registration**: Team creation and management for tournaments
- **Live Match Scoring**: Real-time match updates with Socket.io
- **Video Sharing**: Upload and share sports videos with social features
- **Fitness Content**: Guided workouts, yoga sessions, and fitness tracking
- **User Profiles**: Comprehensive user profiles with stats and preferences

## Tech Stack

- **Framework**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT tokens
- **File Storage**: Cloudinary for video/image uploads
- **Real-time**: Socket.io for live updates
- **Validation**: Express-validator
- **Security**: Helmet, CORS, Rate limiting

## Quick Start

### Prerequisites

- Node.js 18+
- MongoDB 4.4+
- Cloudinary account (for file uploads)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   cd server
   npm install
   ```

3. Copy environment variables:
   ```bash
   cp .env.example .env
   ```

4. Update `.env` with your configuration:
   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development

   # Database
   MONGODB_URI=mongodb://localhost:27017/sportsphere

   # JWT Secret
   JWT_SECRET=your_super_secret_jwt_key_here
   JWT_EXPIRE=7d

   # Cloudinary Configuration
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret

   # Frontend URL
   CLIENT_URL=http://localhost:3000
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

The API will be available at `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile
- `PUT /api/auth/change-password` - Change password

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users/:id/follow` - Follow user
- `GET /api/users/:id/stats` - Get user statistics

### Tournaments
- `GET /api/tournaments` - Get all tournaments
- `POST /api/tournaments` - Create tournament (Organizer only)
- `GET /api/tournaments/:id` - Get tournament details
- `PUT /api/tournaments/:id` - Update tournament
- `POST /api/tournaments/:id/register` - Register team

### Matches
- `GET /api/matches` - Get all matches
- `GET /api/matches/live` - Get live matches
- `POST /api/matches` - Create match (Organizer only)
- `PUT /api/matches/:id/score` - Update match score
- `POST /api/matches/:id/events` - Add match event

### Teams
- `GET /api/teams` - Get all teams
- `POST /api/teams` - Create team
- `GET /api/teams/:id` - Get team details
- `POST /api/teams/:id/players` - Add player to team

### Videos
- `GET /api/videos` - Get all videos
- `POST /api/videos/upload` - Upload video
- `GET /api/videos/trending` - Get trending videos
- `POST /api/videos/:id/like` - Like/unlike video
- `POST /api/videos/:id/comments` - Comment on video

### Fitness
- `GET /api/fitness` - Get fitness content
- `POST /api/fitness` - Create fitness content (Instructor only)
- `GET /api/fitness/featured` - Get featured content
- `POST /api/fitness/:id/rate` - Rate content
- `POST /api/fitness/:id/progress` - Track progress

## Socket.io Events

### Real-time Match Updates
- `join-match` - Join match room for live updates
- `score-update` - Live score updates
- `match-event` - Match events (goals, cards, etc.)
- `match-status-change` - Match status changes

### Tournament Updates
- `join-tournament` - Join tournament room
- `bracket-update` - Tournament bracket updates

## Data Models

### User
- Personal information and authentication
- Role-based permissions (player, organizer, fan)
- Sports preferences and statistics
- Social connections (following/followers)

### Tournament
- Tournament details and configuration
- Team registration management
- Bracket and standings tracking
- Match scheduling

### Team
- Team information and roster
- Player management
- Statistics tracking
- Registration status

### Match
- Match details and scheduling
- Live scoring and events
- Player statistics
- Result tracking

### VideoPost
- Video metadata and content
- Social interactions (likes, comments)
- Categorization and tagging
- View tracking

### FitnessContent
- Workout and fitness content
- Progress tracking
- Rating and review system
- Equipment and difficulty filters

## Development

### Project Structure
```
server/
├── src/
│   ├── config/         # Database and external service configs
│   ├── controllers/    # Request handlers
│   ├── middleware/     # Authentication and validation
│   ├── models/         # MongoDB schemas
│   ├── routes/         # API route definitions
│   ├── utils/          # Helper functions and utilities
│   └── server.js       # Main application entry point
├── package.json
└── .env.example
```

### Scripts
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run test suite

### Error Handling
The API uses centralized error handling with appropriate HTTP status codes and consistent error response format:

```json
{
  "success": false,
  "error": "Error message",
  "details": [] // Validation errors if applicable
}
```

### Authentication
Uses JWT tokens for authentication. Include the token in the Authorization header:
```
Authorization: Bearer <token>
```

### Rate Limiting
- 100 requests per 15 minutes per IP address
- Applied to all API routes

## Deployment

### Environment Variables
Ensure all required environment variables are set in production:
- Database connection string
- JWT secret (use a strong, random key)
- Cloudinary credentials
- CORS origin URL

### Security Considerations
- Use HTTPS in production
- Set secure environment variables
- Configure proper CORS origins
- Use rate limiting and request size limits
- Keep dependencies updated

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details
