import { create } from 'zustand';
import api from '../services/api';

const useTaskStore = create((set, get) => ({
  tasks: [],
  isLoading: false,
  error: null,

  fetchTasks: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get("/tasks");

      console.log("API:", response.data); // 👈 เช็คตรงนี้

      set({
        tasks: Array.isArray(response.data)
          ? response.data
          : response.data.tasks || [],
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to fetch tasks",
        isLoading: false,
      });
    }
  },

  createTask: async (taskData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post("/tasks", taskData);
      set((state) => ({
        tasks: [response.data, ...state.tasks],
        isLoading: false,
      }));
      return true;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to create task",
        isLoading: false,
      });
      return false;
    }
  },

  updateTask: async (id, taskData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.put(`/tasks/${id}`, taskData);
      set((state) => ({
        tasks: state.tasks.map((task) =>
          task._id === id ? response.data : task,
        ),
        isLoading: false,
      }));
      return true;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to update task",
        isLoading: false,
      });
      return false;
    }
  },

  deleteTask: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await api.delete(`/tasks/${id}`);
      set((state) => ({
        tasks: state.tasks.filter((task) => task._id !== id),
        isLoading: false,
      }));
      return true;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to delete task",
        isLoading: false,
      });
      return false;
    }
  },
}));

export default useTaskStore;
