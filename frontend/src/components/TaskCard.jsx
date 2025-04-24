import React from 'react';
import './TaskCard.css'; // Import CSS for styling

const TaskCard = ({ task, toggleTaskCompletion, deleteTask, startEditingTask }) => {
    return (
        <div className={`task-card ${task.completed ? 'completed' : ''}`}>
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
                    {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
                </button>
                <button onClick={() => deleteTask(task.id)}>Delete</button>
                <button onClick={() => startEditingTask(task)}>Edit</button>
            </div>
        </div>
    );
};

export default TaskCard;