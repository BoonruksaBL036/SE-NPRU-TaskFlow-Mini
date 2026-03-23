import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useTaskStore from "../store/useTaskStore";
import { ArrowLeft, Save, AlertCircle } from "lucide-react";

const TaskDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks, updateTask, fetchTasks, error: storeError } = useTaskStore();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "pending",
    priority: "medium",
  });
  const [pageError, setPageError] = useState(null);

  useEffect(() => {
    const loadTask = async () => {
      if (tasks.length === 0) {
        await fetchTasks();
      }
    };
    loadTask();
  }, [fetchTasks, tasks.length]);

  useEffect(() => {
    if (tasks.length > 0) {
      const task = tasks.find((t) => t._id === id);
      if (task) {
        setFormData({
          title: task.title,
          description: task.description || "",
          status: task.status,
          priority: task.priority,
        });
      } else {
        setPageError("Task not found");
      }
    }
  }, [id, tasks]);

  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const success = await updateTask(id, formData);
    if (success) navigate("/dashboard");
  };

  if (pageError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 mb-4 text-blue-500 hover:underline"
        >
          <ArrowLeft size={16} /> Back to Dashboard
        </button>

        <div className="flex items-center gap-2 bg-red-100 text-red-600 p-4 rounded">
          <AlertCircle size={18} />
          <span>{pageError}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      {/* Header */}
      <div className="max-w-3xl mx-auto mb-6 flex items-center gap-4">
        <button
          onClick={() => navigate("/dashboard")}
          className="p-2 rounded-full hover:bg-gray-200 transition"
        >
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-2xl font-bold text-gray-800">Edit Task Details</h2>
      </div>

      {/* Error */}
      {storeError && (
        <div className="max-w-3xl mx-auto mb-4 flex items-center gap-2 bg-red-100 text-red-600 p-3 rounded">
          <AlertCircle size={18} />
          <span>{storeError}</span>
        </div>
      )}

      {/* Card */}
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <form onSubmit={onSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={onChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Description (Optional)
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={onChange}
              rows="4"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-y"
            />
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Status */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={onChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            {/* Priority */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Priority
              </label>
              <select
                name="priority"
                value={formData.priority}
                onChange={onChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full mt-4 bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-600 transition flex items-center justify-center gap-2"
          >
            <Save size={18} />
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskDetail;
