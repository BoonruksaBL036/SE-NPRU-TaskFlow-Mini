import { useState } from "react";
import { Plus } from "lucide-react";

const TaskForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
    status: "todo",
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
    setFormData({
      title: "",
      description: "",
      priority: "medium",
      status: "todo",
    });
  };

  return (
    <div className="task-form-panel">
      <div className="tfp-header">
        <h3>Create New Task</h3>
      </div>
      <form onSubmit={handleSubmit} className="balanced-form">
        <div className="form-row">
          <div className="form-group">
            <label>Task Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={onChange}
              placeholder="What needs to be done?"
              required
            />
          </div>
          <div className="form-group">
            <label>Priority</label>
            <select
              name="priority"
              value={formData.priority}
              onChange={onChange}
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
          </div>
        </div>

        <div
          className="form-group"
          style={{ width: "100%", marginBottom: "1rem" }}
        >
          <label>Description Detail</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={onChange}
            placeholder="Add some details about the task..."
            rows="3"
            style={{ minHeight: "80px", resize: "vertical" }}
          />
        </div>

        <div
          className="tfp-actions"
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <button
            type="submit"
            className="btn btn-primary btn-submit-task"
            style={{
              background: "var(--accent-blue)",
              color: "#fff",
              border: "none",
              padding: "0.75rem 2rem",
              borderRadius: "8px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              fontWeight: 600,
            }}
            disabled={isLoading}
          >
            <Plus size={16} /> Add Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
