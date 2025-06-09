import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const TaskCard = ({ task, toggleTaskCompletion, deleteTask, startEditingTask }) => (
  <Box
    sx={{
      background: "rgba(36,26,50,0.85)",
      borderRadius: 2,
      boxShadow: "0 2px 12px 0 rgba(148,70,201,0.10)",
      border: "1.5px solid rgba(255,255,255,0.08)",
      p: 2.5, // Slightly increased padding
      mb: 2,
      minWidth: "300px", // Slightly bigger min width
      maxWidth: "350px", // Slightly bigger max width
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      backdropFilter: "blur(2px)",
    }}
  >
    <Card
      className="task-card"
      sx={{
        minWidth: 250,
        maxWidth: 300,
        borderRadius: 3,
        boxShadow: "0 6px 24px 0 rgba(148,70,201,0.15), 0 1px 8px 0 rgba(0,0,0,0.08)",
        background: task.status === 'completed'
          ? 'linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)'
          : 'linear-gradient(135deg, rgba(255,255,255,0.13) 60%, rgba(148,70,201,0.13) 100%)',
        color: task.status === 'completed' ? '#222' : '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        transition: 'transform 0.18s, box-shadow 0.18s',
        perspective: 600,
        border: "1.5px solid rgba(255,255,255,0.18)",
        backdropFilter: "blur(8px)",
        "&:hover": {
          transform: "translateY(-8px) scale(1.025) rotateX(2deg)",
          boxShadow: "0 12px 24px 0 rgba(148,99,255,0.18), 0 1px 8px 0 rgba(0,0,0,0.08)",
          zIndex: 2,
        },
      }}
    >
      {task.image && (
        <Box
          component="img"
          src={task.image}
          alt={task.title}
          sx={{
            width: '100%',
            maxWidth: 140, // Slightly bigger image
            height: 100,    // Slightly bigger image
            objectFit: 'cover',
            borderRadius: 1.5,
            mt: 1,
            mb: 1,
            boxShadow: 1,
            background: '#fff',
          }}
        />
      )}
      <CardContent sx={{ width: '100%', textAlign: 'center', p: 1.5 }}>
        <Typography
          variant="subtitle1"
          component="div"
          sx={{
            fontWeight: 600,
            mb: 0.5,
            color: 'white',
            fontSize: '1.08rem',
            textShadow: '0 1px 4px rgba(0,0,0,0.3)',
          }}
        >
          {task.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5, fontSize: '0.92rem' }}>
          {task.description}
        </Typography>
        {task.dueDate && (
          <Typography variant="caption" color="primary" sx={{ fontSize: '0.8rem' }}>
            Due: {new Date(task.dueDate).toLocaleDateString()}
          </Typography>
        )}
      </CardContent>
      <CardActions sx={{ justifyContent: 'center', mb: 0.5, p: 0 }}>
        <Button
          variant="contained"
          color={task.status === 'completed' ? 'success' : 'primary'}
          size="small"
          sx={{
            boxShadow: "0 1px 4px rgba(108,99,255,0.10)",
            borderRadius: 1.5,
            fontWeight: 600,
            fontSize: '0.85rem',
            minWidth: 0,
            px: 1.4,
            "&:hover": {
              boxShadow: "0 2px 8px rgba(148,70,201,0.12)",
            }
          }}
          onClick={() => toggleTaskCompletion(task._id)}
        >
          {task.status === 'completed' ? 'Incomplete' : 'Complete'}
        </Button>
        <Button
          variant="contained"
          color="error"
          size="small"
          sx={{ fontSize: '0.85rem', minWidth: 0, px: 1.4 }}
          onClick={() => deleteTask(task._id)}
        >
          Delete
        </Button>
        <Button
          variant="contained"
          color="warning"
          size="small"
          sx={{ fontSize: '0.85rem', minWidth: 0, px: 1.4 }}
          onClick={() => startEditingTask(task)}
        >
          Edit
        </Button>
      </CardActions>
    </Card>
  </Box>
);

export default TaskCard;