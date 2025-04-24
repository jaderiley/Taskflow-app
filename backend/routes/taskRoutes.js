import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} from '../controllers/taskController.js';

const router = express.Router();

router.route('/')
  .get(protect, getAllTasks) // Protect this route
  .post(protect, createTask); // Protect this route

router.route('/:id')
  .get(protect, getTask) // Protect this route
  .put(protect, updateTask) // Protect this route
  .delete(protect, deleteTask); // Protect this route

export default router;