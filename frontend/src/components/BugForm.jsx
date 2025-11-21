import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const BugForm = ({ onSubmit, editingBug, cancelEdit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('open');
  const [priority, setPriority] = useState('medium');

  useEffect(() => {
    if (editingBug) {
      setTitle(editingBug.title);
      setDescription(editingBug.description);
      setStatus(editingBug.status);
      setPriority(editingBug.priority);
    } else {
      setTitle('');
      setDescription('');
      setStatus('open');
      setPriority('medium');
    }
  }, [editingBug]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !description) {
      toast.error("Title and description are required");
      return;
    }

    const bug = { title, description, status, priority };
    onSubmit(bug);

    if (!editingBug) {
      setTitle('');
      setDescription('');
      setStatus('open');
      setPriority('medium');
    }
  };

  return (
    <div className="card p-3 mb-4" style={{ backgroundColor: '#f5f5dc' }}>
      <h4>{editingBug ? 'Edit Bug' : 'Add New Bug'}</h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label>Title</label>
          <input 
            type="text" 
            className="form-control" 
            placeholder="Enter title"
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
          />
        </div>
        <div className="mb-2">
          <label>Description</label>
          <textarea 
            className="form-control" 
            placeholder="Enter description"
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
          />
        </div>
        <div className="mb-2">
          <label>Status</label>
          <select 
            className="form-control" 
            value={status} 
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="closed">Closed</option>
          </select>
        </div>
        <div className="mb-3">
          <label>Priority</label>
          <select 
            className="form-control" 
            value={priority} 
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary me-2">
          {editingBug ? 'Update Bug' : 'Add Bug'}
        </button>
        {editingBug && (
          <button type="button" className="btn btn-secondary" onClick={cancelEdit}>
            Cancel
          </button>
        )}
      </form>
    </div>
  );
};

export default BugForm;
