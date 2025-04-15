import React, { useState } from "react";
import "./Dashboard.css";

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [taskInput, setTaskInput] = useState("");

    const addTask = () => {
        if (taskInput.trim()) {
            setTasks([...tasks, { id: Date.now(), text: taskInput, completed: false }]);
            setTaskInput("");
        }
    };

    const toggleTaskCompletion = (id) => {
        setTasks(
            tasks.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter((task) => task.id !== id));
    };

    return (
        <div className="dashboard">
            <h1>Task Flow Dashboard</h1>
            <div className="task-input">
                <input
                    type="text"
                    placeholder="Add a new task..."
                    value={taskInput}
                    onChange={(e) => setTaskInput(e.target.value)}
                />
                <button onClick={addTask}>Add Task</button>
            </div>
            <div className="task-list">
                {tasks.map((task) => (
                    <div
                        key={task.id}
                        className={`task-item ${task.completed ? "completed" : ""}`}
                    >
                        <span onClick={() => toggleTaskCompletion(task.id)}>
                            {task.text}
                        </span>
                        <button onClick={() => deleteTask(task.id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;