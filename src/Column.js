import React from 'react';
import { Col, Button } from 'react-bootstrap';
import { useDrop } from 'react-dnd';
import TaskCard from './TaskCard';
import { IoMdCloseCircleOutline } from "react-icons/io";
import './App.css'; // Import the CSS file for styling

const Column = ({ title, status, tasks, setTasks, handleTaskClick, addNewTask, count, onDeleteColumn }) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'TASK',
    drop: (item) => handleDrop(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const handleDrop = (item) => {
    const taskId = item.id;
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, status };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  return (
    <Col className="column-container" style={{ boxShadow: "0 0 10px 0 rgba(0,0,0,0.5)", margin: "5px", borderRadius: "20px",
    padding:"15px",backgroundColor: "#fff1e6" }}>
      <div className="column-header">
       <div style={{display:"flex",justifyContent:"center",alignItems:"center",gap:"10px"}}> 
        <h2>{title}</h2>
        
        <h6>Tasks:{count}</h6>
        </div>
        
        <span>
          <IoMdCloseCircleOutline  size={40} onClick={() => onDeleteColumn(status)} style={{cursor:"pointer",color:"red"}}/>
        </span>
        
       
      </div>
      <div ref={drop} className={isOver ? 'column active' : 'column'}>
        {tasks
          .filter((task) => task.status === status)
          .map((task) => (
            <TaskCard key={task.id} task={task} onClick={handleTaskClick} />
          ))}
      </div>
      <Button onClick={() => addNewTask(status)} className="mt-3" variant="outline-danger">
        + NEW
      </Button>
    </Col>
    
  );
};

export default Column;
