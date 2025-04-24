import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar"; // Import Navbar
import "./CreateTask.css";

const CreateTask = ({ onAddTask }) => {
    const [taskInput, setTaskInput] = useState({
        title: "",
        deadline: "",
        details: "",
        image: null,
    });
    const [successMessage, setSuccessMessage] = useState(""); // State for success message
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTaskInput((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setTaskInput((prev) => ({
                    ...prev,
                    image: reader.result,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAddTask = () => {
        if (taskInput.title.trim() && taskInput.details.trim()) {
            onAddTask({
                id: Date.now(),
                ...taskInput,
                completed: false,
            });

            // Clear input fields
            setTaskInput({
                title: "",
                deadline: "",
                details: "",
                image: null,
            });

            // Show success message
            setSuccessMessage("Task added successfully!");

            // Hide success message after 3 seconds
            setTimeout(() => setSuccessMessage(""), 3000);

            // Redirect to dashboard
            navigate("/dashboard");
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
                    onChange={handleImageUpload}
                />
                {taskInput.image && (
                    <img
                        src={taskInput.image}
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