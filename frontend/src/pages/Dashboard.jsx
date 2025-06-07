import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar'; // Import Navbar
import TaskCard from '../components/TaskCard'; // Import TaskCard
import './Dashboard.css';

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [editingTask, setEditingTask] = useState(null); // State to track the task being edited
    const [editedTask, setEditedTask] = useState({}); // State to store the edited task details
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTasks = async () => {
            const token = localStorage.getItem('taskflowToken');
            const response = await fetch('http://localhost:5000/api/tasks', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                credentials: 'include',
            });
            if (response.ok) {
                const data = await response.json();
                setTasks(data);
            }
        };
        fetchTasks();
    }, []);

    const toggleTaskCompletion = async (id) => {
        const token = localStorage.getItem('taskflowToken');
        const task = tasks.find(t => t._id === id);
        const newStatus = task.status === 'completed' ? 'todo' : 'completed';
        const response = await fetch(`http://localhost:5000/api/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            credentials: 'include',
            body: JSON.stringify({ status: newStatus }),
        });
        if (response.ok) {
            const updatedTask = await response.json();
            setTasks(tasks.map(t => t._id === id ? updatedTask : t));
        }
    };

    const deleteTask = async (id) => {
        const token = localStorage.getItem('taskflowToken');
        const response = await fetch(`http://localhost:5000/api/tasks/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            credentials: 'include',
        });
        if (response.ok) {
            setTasks(tasks.filter(task => task._id !== id));
        }
    };

    const startEditingTask = async (task) => {
        const newTitle = prompt("Edit task title:", task.title);
        if (newTitle && newTitle !== task.title) {
            const token = localStorage.getItem('taskflowToken');
            const response = await fetch(`http://localhost:5000/api/tasks/${task._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                credentials: 'include',
                body: JSON.stringify({ title: newTitle }),
            });
            if (response.ok) {
                const updatedTask = await response.json();
                setTasks(tasks.map(t => t._id === task._id ? updatedTask : t));
            }
        }
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
                            key={task._id}
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