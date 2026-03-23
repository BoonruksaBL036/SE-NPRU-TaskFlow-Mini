import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useTaskStore from '../store/useTaskStore';
import { ArrowLeft, Save, AlertCircle } from 'lucide-react';

const TaskDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks, updateTask, fetchTasks, error: storeError } = useTaskStore();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending',
    priority: 'medium'
  });
  const [pageError, setPageError] = useState(null);

  useEffect(() => {
    const loadTask = async () => {
      // If tasks aren't loaded yet (page refresh), fetch them first
      if (tasks.length === 0) {
        await fetchTasks();
      }
    };
    loadTask();
  }, [fetchTasks, tasks.length]);

  useEffect(() => {
    if (tasks.length > 0) {
      const task = tasks.find(t => t._id === id);
      if (task) {
        setFormData({
          title: task.title,
          description: task.description || '',
          status: task.status,
          priority: task.priority
        });
      } else {
        setPageError('Task not found');
      }
    }
  }, [id, tasks]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const success = await updateTask(id, formData);
    if (success) {
      navigate('/dashboard');
    }
  };

  if (pageError) {
    return (
      <div className="dashboard-container">
        <button className="btn-outline" onClick={() => navigate('/dashboard')} style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <ArrowLeft size={16} /> Back to Dashboard
        </button>
        <div className="error-message">
          <AlertCircle size={18} />
          <span>{pageError}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem', gap: '1rem' }}>
        <button className="icon-btn" onClick={() => navigate('/dashboard')} aria-label="Go back">
          <ArrowLeft size={24} />
        </button>
        <h2>Edit Task Details</h2>
      </div>

      {storeError && (
        <div className="error-message">
          <AlertCircle size={18} />
          <span>{storeError}</span>
        </div>
      )}

      <div className="auth-card" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={onChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Description (Optional)</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={onChange}
              rows="4"
              style={{ resize: 'vertical' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select id="status" name="status" value={formData.status} onChange={onChange}>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="priority">Priority</label>
              <select id="priority" name="priority" value={formData.priority} onChange={onChange}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
          
          <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>
            <Save size={18} /> Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskDetail;
