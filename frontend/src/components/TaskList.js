import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import TaskForm from './TaskForm';
import '../styles.css';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    const fetchTasks = async () => {
      try {
        const res = await api.get('/api/tasks', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(res.data);
      } catch (err) {
        console.error('Error fetching tasks:', err);
      }
    };
    fetchTasks();
  }, [token, navigate]);

  const toggleStatus = async (id) => {
    try {
      await api.patch(`/api/tasks/${id}/toggle`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.map(task => task._id === id ? { ...task, status: task.status === 'pending' ? 'completed' : 'pending' } : task));
    } catch (err) {
      console.error('Error toggling task:', err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.filter(task => task._id !== id));
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };
  

  if (!token) return null;
    
  return (
     

  <div className="container">
  
  

  <TaskForm onTaskAdded={(newTask) => setTasks([...tasks, newTask])} />

  <div className="task-list">
    <ul className="space-y-2">
      {tasks.map(task => (
        <li key={task._id} className={`task-item ${task.status === 'completed' ? 'completed' : ''}`}>
          <span>{task.title}</span>
          <div>
            <input
              type="checkbox"
              checked={task.status === 'completed'}
              onChange={() => toggleStatus(task._id)}
              className="mr-2"
            />
            <button onClick={() => deleteTask(task._id)} className="text-red-600">Delete</button>
          </div>
        </li>
      ))}
    </ul>
  </div>
</div>


  );
};

export default TaskList;