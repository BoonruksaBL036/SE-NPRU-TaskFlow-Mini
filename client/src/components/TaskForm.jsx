import { useState } from 'react';
import { Plus } from 'lucide-react';

const TaskForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    status: 'todo'
  });

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title) return;
    
    onSubmit(formData);
    setFormData({ title: '', description: '', priority: 'medium', status: 'todo' });
  };

  return (
    <div className="task-form-panel">
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div className="form-group" style={{ marginBottom: 0 }}>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={onChange}
            placeholder="What needs to be done?"
            required
          />
        </div>
        <div className="form-group" style={{ marginBottom: 0 }}>
          <textarea
            name="description"
            value={formData.description}
            onChange={onChange}
            placeholder="Description (optional)"
            rows="2"
            style={{ minHeight: '60px' }}
          />
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
            <select name="priority" value={formData.priority} onChange={onChange}>
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: 'auto', padding: '0.85rem 2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }} disabled={isLoading}>
            <Plus size={18} /> Add Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
