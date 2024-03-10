import React, { useState, useEffect } from 'react';
import { Container, Row, Button } from 'react-bootstrap';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import TaskModal from './TaskModal';
import Column from './Column';
import './App.css';
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

function App() {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks
      ? JSON.parse(storedTasks)
      : [
          { id: '1', title: 'Task 1', status: 'todo', description: 'Description for Task 1' },
          { id: '2', title: 'Task 2', status: 'in-progress', description: 'Description for Task 2' },
          { id: '3', title: 'Task 3', status: 'done', description: 'Description for Task 3' },
        ];
  });
  const [selectedTask, setSelectedTask] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [columns, setColumns] = useState(() => {
    const storedColumns = localStorage.getItem('columns');
    return storedColumns
      ? JSON.parse(storedColumns)
      : [
          { id: '1', title: 'To Do', status: 'todo' },
          { id: '2', title: 'In Progress', status: 'in-progress' },
          { id: '3', title: 'Done', status: 'done' },
        ];
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('columns', JSON.stringify(columns));
  }, [columns]);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleSaveChanges = (updatedTask) => {
    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
    setShowModal(false);
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const addNewTask = (status) => {
    const newTask = {
      id: String(tasks.length + 1),
      title: `New Task ${tasks.length + 1}`,
      status: status,
      description: `Description for New Task ${tasks.length + 1}`,
    };
    setTasks([...tasks, newTask]);
  };

  const handleDeleteColumn = (status) => {
    setTasks(tasks.filter((task) => task.status !== status));
    setColumns(columns.filter((column) => column.status !== status));
  };

  const addNewColumn = () => {
    const newColumn = {
      id: String(columns.length + 1),
      title: `New Column ${columns.length + 1}`,
      status: `new-status-${columns.length + 1}`,
    };
    setColumns([...columns, newColumn]);
  };

  const handleChangeColumnName = (id, newName) => {
    setColumns(
      columns.map((column) => {
        if (column.id === id) {
          return { ...column, title: newName };
        }
        return column;
      })
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className='container'>
        <div className='header'>
        <h1 className="text-center mt-3">Amanpreet's Board</h1>
       <div className='social-icons' style={{display:"flex",justifyContent:"center",alignItems:"center",gap:"20px"}}>
        <a href='https://www.linkedin.com/in/amanpreetsingh6057' target='_blank'><FaLinkedin size={30} color='black'/></a>
        <a href='https://github.com/AmanpreetS18' target='_blank'><FaGithub size={30} color='black'/></a>
        <a href='https://leetcode.com/amansinghpreet/' target='_blank'><SiLeetcode size={30} color='black'/></a>
        </div>
        <div className="add-column-container">
          <Button variant="danger" size="sm" onClick={addNewColumn} className="add-column-btn">
            + Add Column
          </Button>
        </div></div>
        <Row className="mt-3" id="maincont" >
          <div className="columns-container">
            {columns.map((column) => (
              <Column
                key={column.id}
                title={column.title}
                status={column.status}
                tasks={tasks}
                setTasks={setTasks}
                handleTaskClick={handleTaskClick}
                addNewTask={addNewTask}
                count={tasks.filter((task) => task.status === column.status).length}
                onDeleteColumn={handleDeleteColumn}
              />
            ))}
             
          </div>
          
        </Row>
        
        <TaskModal
          show={showModal}
          handleClose={handleModalClose}
          task={selectedTask}
          handleSaveChanges={handleSaveChanges}
          handleDelete={handleDeleteTask}
          columns={columns}
        />
      
      </div>
    </DndProvider>
  );
}

export default App;
