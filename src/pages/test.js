import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { works } from '../data';

const Test = () => {
  const [taskeds, setTaskeds] = useState([]);
  useEffect(() => {
    const allTasks = works.flatMap((module) =>
      module.blocks.flatMap((block) => block.days.flatMap((day) => day.tasks))
    );
    setTaskeds(allTasks);
  }, []);

  const [tasks, setTasks] = useState([
    { id: 1, name: 'Task 1', status: 'pending' },
    { id: 2, name: 'Task 2', status: 'pending' },
    { id: 3, name: 'Task 3', status: 'pending' },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleDetailClick = (taskId) => {
    setSelectedTask(tasks.find((task) => task.id === taskId));
    setShowModal(true);
    console.log(taskId);
    console.log(selectedTask);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTask(null);
  };

  const handleSubmitClick = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, status: 'submitted' };
      }
      return task;
    });
    setTasks(updatedTasks);
    handleCloseModal();
  };

  return (
    <div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.name} - {task.status}
            <button onClick={() => handleDetailClick(task.id)}>Detail</button>
          </li>
        ))}
      </ul>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Task Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedTask ? (
            <div>
              <p>Name: {selectedTask.name}</p>
              <p>Status: {selectedTask.status}</p>
            </div>
          ) : (
            <p>No task selected</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => handleSubmitClick(selectedTask.id)}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Test;
