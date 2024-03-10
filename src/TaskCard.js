// TaskCard.js
import React from 'react';
import { useDrag } from 'react-dnd';
import { Card } from 'react-bootstrap';
import './App.css'; // Import the CSS file for styling

const TaskCard = ({ task, onClick }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'TASK',
    item: { id: task.id, title: task.title, status: task.status },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div 
      ref={drag}
      className={`task-card ${isDragging ? 'dragging' : ''}`}
    >
      <Card className="mb-2" onClick={() => onClick(task)}>
        <Card.Body id="cardbody">
          <Card.Title>{task.title}</Card.Title>
        </Card.Body>
      </Card>
    </div>
  );
};

export default TaskCard;
