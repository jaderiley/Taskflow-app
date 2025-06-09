import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const TaskCard = ({ task, toggleTaskCompletion, deleteTask, startEditingTask }) => (
  <Card
    className="task-card"
    sx={{
      minWidth: 300,
      maxWidth: 350,
      borderRadius: 3,
      boxShadow: 6,
      background: task.status === 'completed'
        ? 'linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)'
        : 'rgba(255,255,255,0.08)',
      color: task.status === 'completed' ? '#222' : '#333',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      transition: 'transform 0.18s, box-shadow 0.18s',
      perspective: 600,
    }}
  >
    {task.image && (
      <Box
        component="img"
        src={task.image}
        alt={task.title}
        sx={{
          width: '100%',
          maxWidth: 180,
          height: 120,
          objectFit: 'cover',
          borderRadius: 2,
          mt: 2,
          mb: 1,
          boxShadow: 2,
          background: '#fff',
        }}
      />
    )}
    <CardContent sx={{ width: '100%', textAlign: 'center' }}>
      <Typography
        variant="h6"
        component="div"
        sx={{
          fontWeight: 600,
          mb: 1,
          color: 'white', // <-- Make the title white
          textShadow: '0 1px 4px rgba(0,0,0,0.4)', // Optional: add a subtle shadow for readability
        }}
      >
        {task.title}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        {task.description}
      </Typography>
      {task.dueDate && (
        <Typography variant="caption" color="primary">
          Due: {new Date(task.dueDate).toLocaleDateString()}
        </Typography>
      )}
    </CardContent>
    <CardActions sx={{ justifyContent: 'center', mb: 1 }}>
      <Button
        variant="contained"
        color={task.status === 'completed' ? 'success' : 'primary'}
        size="small"
        onClick={() => toggleTaskCompletion(task._id)}
      >
        {task.status === 'completed' ? 'Mark Incomplete' : 'Mark Complete'}
      </Button>
      <Button
        variant="contained"
        color="error"
        size="small"
        onClick={() => deleteTask(task._id)}
      >
        Delete
      </Button>
      <Button
        variant="contained"
        color="warning"
        size="small"
        onClick={() => startEditingTask(task)}
      >
        Edit
      </Button>
    </CardActions>
  </Card>
);

export default TaskCard;