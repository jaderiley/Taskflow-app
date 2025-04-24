import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar'; // Import Navbar
import TaskCard from '../components/TaskCard'; // Import TaskCard
import './Dashboard.css';

const Dashboard = ({ tasks }) => {
    const [editingTask, setEditingTask] = useState(null); // State to track the task being edited
    const [editedTask, setEditedTask] = useState({}); // State to store the edited task details
    const navigate = useNavigate();

    const toggleTaskCompletion = (id) => {
        // Logic for toggling task completion
    };

    const deleteTask = (id) => {
        // Logic for deleting a task
    };

    const startEditingTask = (task) => {
        setEditingTask(task.id);
        setEditedTask(task);
    };

    return (
        <div className="dashboard">
            <Navbar /> {/* Add Navbar */}
            <header className="dashboard-header">
                <h1>Task Flow Dashboard</h1>
            </header>
            <div className="task-list">
                {tasks.length === 0 ? (
                    <p>No tasks available. Add a new task!</p>
                ) : (
                    tasks.map((task) => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            toggleTaskCompletion={toggleTaskCompletion}
                            deleteTask={deleteTask}
                            startEditingTask={startEditingTask}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default Dashboard;