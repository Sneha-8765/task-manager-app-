import React, { useState } from 'react';
import api from '../api';
import '../styles.css';

const TaskForm = ({ onTaskAdded }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/api/tasks', { title, description }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onTaskAdded(res.data);
      setTitle('');
      setDescription('');
    } catch (err) {
      console.error('Error adding task:', err);
    }
  };

  return (
    <div className="card">
      <h3 className="text-center text-xl font-bold mb-4">Add New Task</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-group">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />
        </div>
        <button type="submit" className="btn">Add Task</button>
      </form>
    </div>
  );
};

export default TaskForm;