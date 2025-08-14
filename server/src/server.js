import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cookieParser from 'cookie-parser';
import connectDB from './config/database.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import tournamentRoutes from './routes/tournaments.js';
import matchRoutes from './routes/matches.js';
import teamRoutes from './routes/teams.js';
import videoRoutes from './routes/videos.js';
import fitnessRoutes from './routes/fitness.js';
import { errorHandler } from './middleware/errorHandler.js';
import { setupSocketHandlers } from './utils/socketHandlers.js';

const app = express();
const server = createServer(app);

// Connect to MongoDB
connectDB();

// Basic middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Security middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl requests)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      process.env.CLIENT_URL,
      'http://localhost:3000',
      'http://localhost:3001'
    ];
    
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api', limiter);

// Socket.io setup
const io = new Server(server, {
  cors: corsOptions
});

// Setup socket handlers
setupSocketHandlers(io);
app.set('io', io);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tournaments', tournamentRoutes);
app.use('/api/matches', matchRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/fitness', fitnessRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'SportSphere API is running' });
});

// Error handling middleware
app.use(errorHandler);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Server startup with fallback ports
const FALLBACK_PORTS = [5001, 5002, 5003, 5004, 5005];
const DEFAULT_PORT = process.env.PORT || 5000;

const startServer = async () => {
  const ports = [DEFAULT_PORT, ...FALLBACK_PORTS.filter(p => p !== DEFAULT_PORT)];
  
  for (const port of ports) {
    try {
      await new Promise((resolve, reject) => {
        const serverInstance = server.listen(port, () => {
          console.log(`🚀 SportSphere server running on port ${port}`);
          console.log(`📊 Environment: ${process.env.NODE_ENV}`);
          resolve();
        });

        serverInstance.on('error', (err) => {
          if (err.code === 'EADDRINUSE') {
            console.log(`⚠️ Port ${port} is in use, trying next port...`);
            serverInstance.close();
            reject(err);
          } else {
            console.error('Server error:', err);
            reject(err);
          }
        });
      });
      // If we reach here, the server started successfully
      return;
    } catch (err) {
      if (port === ports[ports.length - 1]) {
        console.error('❌ All ports are in use. Please free up a port or specify a different port in .env');
        process.exit(1);
      }
      // Continue to next port
    }
  }
};

startServer()
  .catch(error => {
    console.error('Failed to start server:', error);
    process.exit(1);
  });

export default app;
