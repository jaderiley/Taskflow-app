import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';

const LIST_OPTIONS = ["Work", "School", "General"];

const CreateTask = () => {
    const [taskInput, setTaskInput] = useState({
        title: "",
        deadline: "",
        details: "",
        list: "General", // Default value
    });
    const [imageBase64, setImageBase64] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
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
                        list: taskInput.list, // <-- send list
                    }),
                    credentials: 'include',
                });

                if (!response.ok) {
                    throw new Error('Failed to create task');
                }

                setSuccessMessage("Task added successfully!");
                setTimeout(() => setSuccessMessage(""), 2000);
                navigate("/dashboard");
            } catch (err) {
                setSuccessMessage(err.message);
            }
        }
    };

    return (
        <>
            <Navbar />
            <Container maxWidth="sm" sx={{ pt: 10 }}>
                <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
                    <Typography variant="h5" fontWeight={700} align="center" mb={3}>
                        Create a New Task
                    </Typography>
                    {successMessage && (
                        <Typography color="success.main" align="center" mb={2}>
                            {successMessage}
                        </Typography>
                    )}
                    <Box display="flex" flexDirection="column" gap={2}>
                        <TextField
                            label="Task Title"
                            name="title"
                            value={taskInput.title}
                            onChange={handleInputChange}
                            required
                            fullWidth
                        />
                        <TextField
                            label="Deadline"
                            name="deadline"
                            type="date"
                            value={taskInput.deadline}
                            onChange={handleInputChange}
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                        />
                        <TextField
                            label="Task Details"
                            name="details"
                            value={taskInput.details}
                            onChange={handleInputChange}
                            multiline
                            minRows={3}
                            required
                            fullWidth
                        />
                        <TextField
                            select
                            label="Task List"
                            name="list"
                            value={taskInput.list}
                            onChange={handleInputChange}
                            fullWidth
                        >
                            {LIST_OPTIONS.map(option => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                        <Button variant="outlined" component="label">
                            Upload Image
                            <input type="file" accept="image/*" hidden onChange={handleImageChange} />
                        </Button>
                        {imageBase64 && (
                            <Box display="flex" justifyContent="center" mt={1}>
                                <img src={imageBase64} alt="Preview" style={{ maxWidth: 180, maxHeight: 120, borderRadius: 8 }} />
                            </Box>
                        )}
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleAddTask}
                            sx={{ mt: 2 }}
                        >
                            Add Task
                        </Button>
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() => navigate('/dashboard')}
                        >
                            Back to Dashboard
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </>
    );
};

export default CreateTask;