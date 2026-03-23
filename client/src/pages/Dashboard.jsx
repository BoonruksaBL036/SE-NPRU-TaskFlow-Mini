import { useEffect } from "react";
import useAuthStore from "../store/useAuthStore";
import useTaskStore from "../store/useTaskStore";
import { AlertCircle, LogOut } from "lucide-react";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user, logout } = useAuthStore();
  const {
    tasks,
    isLoading,
    error,
    fetchTasks,
    createTask,
    deleteTask,
    updateTask,
  } = useTaskStore();

  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleCreateTask = async (formData) => {
    await createTask(formData);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* HEADER */}
      <div className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Task Dashboard</h1>
          <p className="text-sm text-gray-500">
            Welcome, {user?.name || "User"}
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>

      {/* BODY */}
      <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        {/* ERROR */}
        {error && (
          <div className="flex items-center gap-2 bg-red-100 text-red-600 p-4 rounded-lg">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        {/* CREATE TASK */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-lg font-semibold mb-4">Add New Task</h2>
          <TaskForm onSubmit={handleCreateTask} isLoading={isLoading} />
        </div>

        {/* TASK LIST */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="text-lg font-semibold mb-4">
            My Tasks ({tasks.length})
          </h3>

          {isLoading && tasks.length === 0 ? (
            <div className="text-center text-gray-500">
              ⏳ กำลังโหลดข้อมูลงาน...
            </div>
          ) : tasks.length === 0 ? (
            <div className="text-center text-gray-400">
              📭 ยังไม่มีงานในระบบ ลองเพิ่มด้านบนเลยครับ
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {tasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onDelete={deleteTask}
                  onUpdate={updateTask}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
