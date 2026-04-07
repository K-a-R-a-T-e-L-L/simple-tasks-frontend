import { create } from "zustand";
import { createCategoryRequest, deleteCategoryRequest, fetchCategoriesRequest } from "../api/categories.api";
import { createTaskRequest, deleteTaskRequest, fetchTasksRequest, toggleTaskStatusRequest } from "../api/tasks.api";

const normalizeError = (error) =>
  error?.response?.data?.message || "Request failed. Please try again.";

const useTasksStore = create((set, get) => ({
  categories: [],
  tasks: [],
  loading: false,
  error: null,
  filters: {
    status: "all",
    categoryId: "all",
    search: "",
  },

  setFilter: (name, value) => {
    set((state) => ({
      filters: {
        ...state.filters,
        [name]: value,
      },
    }));

    get().loadTasks();
  },

  clearError: () => set({ error: null }),

  loadInitialData: async () => {
    set({ loading: true, error: null });

    try {
      const [categories, tasks] = await Promise.all([
        fetchCategoriesRequest(),
        fetchTasksRequest(get().filters),
      ]);

      set({ categories, tasks, loading: false });
    } catch (error) {
      set({ error: normalizeError(error), loading: false });
    }
  },

  loadTasks: async () => {
    set({ loading: true, error: null });

    try {
      const tasks = await fetchTasksRequest(get().filters);
      set({ tasks, loading: false });
    } catch (error) {
      set({ error: normalizeError(error), loading: false });
    }
  },

  createCategory: async (payload) => {
    set({ loading: true, error: null });

    try {
      await createCategoryRequest(payload);
      const [categories, tasks] = await Promise.all([
        fetchCategoriesRequest(),
        fetchTasksRequest(get().filters),
      ]);
      set({ categories, tasks, loading: false });
      return true;
    } catch (error) {
      set({ error: normalizeError(error), loading: false });
      return false;
    }
  },

  deleteCategory: async (id) => {
    set({ loading: true, error: null });

    try {
      await deleteCategoryRequest(id);
      const nextFilters = { ...get().filters };
      if (String(nextFilters.categoryId) === String(id)) {
        nextFilters.categoryId = "all";
      }

      const [categories, tasks] = await Promise.all([
        fetchCategoriesRequest(),
        fetchTasksRequest(nextFilters),
      ]);

      set({ categories, tasks, filters: nextFilters, loading: false });
    } catch (error) {
      set({ error: normalizeError(error), loading: false });
    }
  },

  createTask: async (payload) => {
    set({ loading: true, error: null });

    try {
      await createTaskRequest(payload);
      const [categories, tasks] = await Promise.all([
        fetchCategoriesRequest(),
        fetchTasksRequest(get().filters),
      ]);
      set({ categories, tasks, loading: false });
      return true;
    } catch (error) {
      set({ error: normalizeError(error), loading: false });
      return false;
    }
  },

  deleteTask: async (id) => {
    set({ loading: true, error: null });

    try {
      await deleteTaskRequest(id);
      const [categories, tasks] = await Promise.all([
        fetchCategoriesRequest(),
        fetchTasksRequest(get().filters),
      ]);
      set({ categories, tasks, loading: false });
    } catch (error) {
      set({ error: normalizeError(error), loading: false });
    }
  },

  toggleTaskStatus: async (id) => {
    set({ loading: true, error: null });

    try {
      await toggleTaskStatusRequest(id);
      const [categories, tasks] = await Promise.all([
        fetchCategoriesRequest(),
        fetchTasksRequest(get().filters),
      ]);
      set({ categories, tasks, loading: false });
    } catch (error) {
      set({ error: normalizeError(error), loading: false });
    }
  },
}));

export default useTasksStore;
