import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import TaskCard from '../components/TaskCard';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
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
        <>
            <Navbar />
            <Container maxWidth="lg" sx={{ pt: 3 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
                    <Typography variant="h4" fontWeight={700}>Your Tasks</Typography>
                    <Button variant="contained" color="primary" onClick={() => navigate('/create-task')}>
                        Add Task
                    </Button>
                </Box>
                <Grid container spacing={4} alignItems="flex-start">
                    {tasks.length === 0 ? (
                        <Grid item xs={12}>
                            <Typography color="text.secondary" align="center">
                                No tasks available. Add a new task!
                            </Typography>
                        </Grid>
                    ) : (
                        tasks.map(task => (
                            <Grid item xs={12} sm={6} md={4} key={task._id}>
                                <TaskCard
                                    task={task}
                                    toggleTaskCompletion={toggleTaskCompletion}
                                    deleteTask={deleteTask}
                                    startEditingTask={startEditingTask}
                                />
                            </Grid>
                        ))
                    )}
                </Grid>
            </Container>
        </>
    );
};

export default Dashboard;