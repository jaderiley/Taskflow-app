import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar"; // Import Navbar
import "./Dashboard.css";

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

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditedTask((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const saveEditedTask = () => {
        // Logic for saving an edited task
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
                        <div
                            key={task.id}
                            className={`task-card ${task.completed ? "completed" : ""}`}
                        >
                            {task.image && (
                                <img
                                    src={task.image}
                                    alt="Task"
                                    className="task-image"
                                />
                            )}
                            <div className="task-content">
                                <h3>{task.title}</h3>
                                <p>{task.details}</p>
                                {task.deadline && (
                                    <p>
                                        <strong>Deadline:</strong> {task.deadline}
                                    </p>
                                )}
                            </div>
                            <div className="task-actions">
                                <button onClick={() => toggleTaskCompletion(task.id)}>
                                    {task.completed ? "Mark Incomplete" : "Mark Complete"}
                                </button>
                                <button onClick={() => deleteTask(task.id)}>Delete</button>
                                <button onClick={() => startEditingTask(task)}>Edit</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Dashboard;