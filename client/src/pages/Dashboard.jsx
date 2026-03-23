import { useEffect } from "react";
import useAuthStore from "../store/useAuthStore";
import useTaskStore from "../store/useTaskStore";
import { AlertCircle, LogOut } from "lucide-react";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";

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

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleCreateTask = async (formData) => {
    await createTask(formData);
  };

  return (
    <div className="simple-dashboard">
      <div className="dashboard-body">
        {/* แสดงสถานะ Error */}
        {error && (
          <div className="error-banner">
            <AlertCircle size={20} />
            {error}
          </div>
        )}

        {/* 3. เพิ่มงาน (TaskForm) */}
        <TaskForm onSubmit={handleCreateTask} isLoading={isLoading} />

        {/* 4. แสดงสถานะ Loading หรือ รายการงาน */}
        <div className="section-box task-list-section">
          <h3>My Tasks ({tasks.length})</h3>

          {isLoading && tasks.length === 0 ? (
            <div className="loading-state">กำลังโหลดข้อมูลงาน...</div>
          ) : tasks.length === 0 ? (
            <div className="empty-state">
              ยังไม่มีงานในระบบ ลองเพิ่มด้านบนเลยครับ
            </div>
          ) : (
            <div className="task-list">
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
