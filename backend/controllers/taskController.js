// backend/controllers/taskController.js
const Task = require('../models/Task');
const User = require('../models/User');

// @desc    Get all tasks
// @route   GET /api/tasks
// @access  Private
const getAllTasks = async (req, res) => {
    try {
        // Get user ID from JWT
        const userId = req.user.id;

        // Optional query parameters for filtering/sorting
        const { status } = req.query;
        const sort = {};
        
        if (req.query.sortBy) {
            const parts = req.query.sortBy.split(':');
            sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
        }

        // Build query
        const query = { userId };
        if (status) {
            query.status = status;
        }

        const tasks = await Task.find(query)
            .sort(sort)
            .exec();

        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Get single task
// @route   GET /api/tasks/:id
// @access  Private
const getTask = async (req, res) => {
    try {
        const task = await Task.findOne({
            _id: req.params.id,
            userId: req.user.id
        });

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Create new task
// @route   POST /api/tasks
// @access  Private
const createTask = async (req, res) => {
    try {
        const { title, description, dueDate, priority, status } = req.body;

        // Simple validation
        if (!title || !description) {
            return res.status(400).json({ message: 'Title and description are required' });
        }

        const newTask = new Task({
            title,
            description,
            dueDate: dueDate || null,
            priority: priority || 'medium',
            status: status || 'todo',
            userId: req.user.id
        });

        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = async (req, res) => {
    try {
        const { title, description, dueDate, priority, status } = req.body;

        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.id },
            { title, description, dueDate, priority, status },
            { new: true, runValidators: true }
        );

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.id
        });

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

module.exports = {
    getAllTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask
};