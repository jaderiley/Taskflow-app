import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import taskRoutes from './routes/taskRoutes.js'; // Import task routes
import taskRoutes from './routes/taskRoutes.js'; // Import task routes
dotenv.config();

const app = express();

// CORS setup
const corsOptions = {
  origin: 'http://localhost:3000', // Adjust this based on where your frontend is running
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
};
app.use(cors(corsOptions));

app.use(express.json());
app.use('/api/tasks', taskRoutes);

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
import { register, login } from './controllers/authController.js';

// Register a new user
app.post('/register', register);

// Login an existing user
app.post('/login', login);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);

  
});
