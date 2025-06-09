import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import taskRoutes from './routes/taskRoutes.js'; // Import task routes
import authRoutes from './routes/authRoutes.js'; // Import auth routes
import profileRoutes from './routes/profileRoutes.js'; // Import profile routes


dotenv.config();

const app = express();

// CORS setup
const corsOptions = {
  origin: 'http://localhost:5173', // No trailing slash!
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // <--- ADD THIS LINE
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Add this line after app.use(cors(corsOptions))

// Increase JSON body size limit to 10MB (or more if needed)
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use('/api/tasks', taskRoutes);
app.use('/api/auth', authRoutes); // Add this line for auth routes
app.use('/api/profile', profileRoutes); // Add this line for profile routes

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Test route
app.get('/', (req, res) => {
  res.send('TaskFlow Backend is running!');
});

// General error handler
app.use((err, req, res, next) => {
  console.error('❌ Unhandled error:', err);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Register a new user
// app.post('/register', register);

// Login an existing user
// app.post('/login', login);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
