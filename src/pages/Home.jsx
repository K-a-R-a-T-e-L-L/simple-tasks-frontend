import { FileText, FolderOpen } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppHeader from "../components/layout/AppHeader";
import CategoryList from "../components/ui/CategoryList";
import NewCategoryForm from "../components/ui/NewCategoryForm";
import SectionCard from "../components/ui/SectionCard";
import TaskFilters from "../components/ui/TaskFilters";
import TaskForm from "../components/ui/TaskForm";
import TaskList from "../components/ui/TaskList";
import useAuthStore from "../store/useAuthStore";
import useTasksStore from "../store/useTasksStore";

const Home = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const {
    categories,
    tasks,
    filters,
    loading,
    error,
    clearError,
    setFilter,
    loadInitialData,
    createCategory,
    deleteCategory,
    createTask,
    deleteTask,
    toggleTaskStatus,
  } = useTasksStore();

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      <AppHeader
        onLogout={handleLogout}
        onSearchChange={(value) => setFilter("search", value)}
        search={filters.search}
        user={user}
      />

      <main className="mx-auto flex w-full max-w-[1400px] flex-col gap-6 px-4 py-6 md:px-8">
        {error && (
          <button
            className="rounded-xl border border-rose-300 bg-rose-50 px-4 py-3 text-left text-rose-700"
            onClick={clearError}
            type="button"
          >
            {error}
          </button>
        )}

        <SectionCard icon={FolderOpen} title="Ваши категории">
          <CategoryList
            categories={categories}
            onDeleteCategory={deleteCategory}
            onSelectCategory={(value) => setFilter("categoryId", value)}
            selectedCategoryId={filters.categoryId}
          />
          <NewCategoryForm loading={loading} onSubmit={createCategory} />
        </SectionCard>

        <SectionCard icon={FileText} title="Ваши задачи">
          <TaskFilters onStatusChange={(value) => setFilter("status", value)} status={filters.status} />
          <TaskForm categories={categories} loading={loading} onSubmit={createTask} />
          <div className="mt-6">
            <TaskList onDeleteTask={deleteTask} onToggleTask={toggleTaskStatus} tasks={tasks} />
          </div>
        </SectionCard>
      </main>
    </div>
  );
};

export default Home;
