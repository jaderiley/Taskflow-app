import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar"; // Import Navbar
import "./CreateTask.css";

const CreateTask = ({ onAddTask }) => {
    const [taskInput, setTaskInput] = useState({
        title: "",
        deadline: "",
        details: "",
    });
    const [imageBase64, setImageBase64] = useState("");
    const [successMessage, setSuccessMessage] = useState(""); // State for success message
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTaskInput((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => {
            setImageBase64(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleAddTask = async () => {
        if (taskInput.title.trim() && taskInput.details.trim()) {
            try {
                const token = localStorage.getItem('taskflowToken');
                const response = await fetch('http://localhost:5000/api/tasks', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        title: taskInput.title,
                        description: taskInput.details,
                        dueDate: taskInput.deadline,
                        image: imageBase64,
                    }),
                    credentials: 'include',
                });

                if (!response.ok) {
                    throw new Error('Failed to create task');
                }

                // Optionally show a success message
                setSuccessMessage("Task added successfully!");
                setTimeout(() => setSuccessMessage(""), 2000);

                // Redirect to dashboard (which will fetch tasks from backend)
                navigate("/dashboard");
            } catch (err) {
                setSuccessMessage(err.message);
            }
        }
    };

    return (
        <div className="create-task">
            <Navbar /> {/* Add Navbar */}
            <h2>Create a New Task</h2>
            {successMessage && <p className="success-message">{successMessage}</p>} {/* Success message */}
            <div className="form-group">
                <label>Task Title</label>
                <input
                    type="text"
                    name="title"
                    placeholder="Enter task title"
                    value={taskInput.title}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className="form-group">
                <label>Deadline</label>
                <input
                    type="date"
                    name="deadline"
                    value={taskInput.deadline}
                    onChange={handleInputChange}
                />
            </div>
            <div className="form-group">
                <label>Task Details</label>
                <textarea
                    name="details"
                    placeholder="Enter task details"
                    value={taskInput.details}
                    onChange={handleInputChange}
                    required
                ></textarea>
            </div>
            <div className="form-group">
                <label>Upload Image</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                />
                {imageBase64 && (
                    <img
                        src={imageBase64}
                        alt="Task Preview"
                        className="image-preview"
                    />
                )}
            </div>
            <button onClick={handleAddTask}>Add Task</button>
            <button onClick={() => navigate("/dashboard")} className="back-button">
                Back to Dashboard
            </button>
        </div>
    );
};

export default CreateTask;