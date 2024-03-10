import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const TaskModal = ({ show, handleClose, task, handleSaveChanges, handleDelete, columns }) => {
  const [editedTask, setEditedTask] = useState({ ...task });

  useEffect(() => {
    setEditedTask({ ...task });
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSave = () => {
    handleSaveChanges(editedTask);
    handleClose();
  };

  const handleDeleteTask = () => {
    handleDelete(task.id);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formTaskTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={editedTask.title}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formTaskStatus">
            <Form.Label>Status</Form.Label>
            <Form.Control
              as="select"
              name="status"
              value={editedTask.status}
              onChange={handleChange}
            >
              {columns.map(column => (
                <option key={column.id} value={column.status}>{column.title}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formTaskDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={editedTask.description}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={handleDeleteTask}>Delete Task</Button>
        <Button variant="outline-secondary" onClick={handleClose}>Close</Button>
        <Button variant="outline-primary" onClick={handleSave}>Save Changes</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TaskModal;
