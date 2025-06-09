import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import TaskCard from '../components/TaskCard';
import EditTaskDialog from '../components/EditTaskDialog';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [editingTask, setEditingTask] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [filter, setFilter] = useState('all'); // NEW: filter state
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

    const startEditingTask = (task) => {
        setEditingTask(task);
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
        setEditingTask(null);
    };

    const handleDialogSave = async (updatedTask) => {
        const token = localStorage.getItem('taskflowToken');
        const response = await fetch(`http://localhost:5000/api/tasks/${updatedTask._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            credentials: 'include',
            body: JSON.stringify({ title: updatedTask.title }),
        });
        if (response.ok) {
            const newTask = await response.json();
            setTasks(tasks.map(t => t._id === newTask._id ? newTask : t));
        }
        handleDialogClose();
    };

    // Separate tasks
    const ongoingTasks = tasks.filter(task => task.status !== 'completed');
    const completedTasks = tasks.filter(task => task.status === 'completed');

    return (
        <>
            <Navbar />
            <EditTaskDialog
                open={dialogOpen}
                onClose={handleDialogClose}
                task={editingTask}
                onSave={handleDialogSave}
            />
            <Container maxWidth="lg" sx={{ pt: '64px' }} disableGutters>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
                    <Typography variant="h4" fontWeight={700}>Your Tasks</Typography>
                    {/* Filter Buttons */}
                    <ButtonGroup variant="outlined" color="primary">
                        <Button
                            variant={filter === 'all' ? 'contained' : 'outlined'}
                            onClick={() => setFilter('all')}
                        >
                            All
                        </Button>
                        <Button
                            variant={filter === 'ongoing' ? 'contained' : 'outlined'}
                            onClick={() => setFilter('ongoing')}
                        >
                            Ongoing
                        </Button>
                        <Button
                            variant={filter === 'completed' ? 'contained' : 'outlined'}
                            onClick={() => setFilter('completed')}
                        >
                            Completed
                        </Button>
                    </ButtonGroup>
                </Box>

                {/* Show sections based on filter */}
                {(filter === 'all' || filter === 'ongoing') && (
                    <>
                        <Typography variant="h5" fontWeight={600} align="left" mb={3} sx={{ ml: 1 }}>
                            Ongoing Tasks
                        </Typography>
                        {ongoingTasks.length === 0 ? (
                            <Typography color="text.secondary" align="center" mb={4}>
                                No ongoing tasks!
                            </Typography>
                        ) : (
                            <Grid container spacing={4} alignItems="flex-start" justifyContent="flex-start" mb={6}>
                                {ongoingTasks.map(task => (
                                    <Grid item xs={12} sm={6} md={4} key={task._id}>
                                        <TaskCard
                                            task={task}
                                            toggleTaskCompletion={toggleTaskCompletion}
                                            deleteTask={deleteTask}
                                            startEditingTask={startEditingTask}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        )}
                    </>
                )}

                {(filter === 'all' || filter === 'completed') && (
                    <>
                        <Typography variant="h5" fontWeight={600} align="left" mb={3} sx={{ ml: 1, mt: 6 }}>
                            Completed Tasks
                        </Typography>
                        {completedTasks.length === 0 ? (
                            <Typography color="text.secondary" align="center">
                                No completed tasks yet!
                            </Typography>
                        ) : (
                            <Grid container spacing={4} alignItems="flex-start" justifyContent="flex-start">
                                {completedTasks.map(task => (
                                    <Grid item xs={12} sm={6} md={4} key={task._id}>
                                        <TaskCard
                                            task={task}
                                            toggleTaskCompletion={toggleTaskCompletion}
                                            deleteTask={deleteTask}
                                            startEditingTask={startEditingTask}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        )}
                    </>
                )}
            </Container>
        </>
    );
};

export default Dashboard;