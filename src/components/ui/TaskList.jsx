import TaskItem from "./TaskItem";

const TaskList = ({ tasks, onToggleTask, onDeleteTask }) => {
  if (!tasks.length) {
    return (
      <div className="rounded-2xl border border-dashed border-brand-300 bg-brand-50 p-6 text-brand-700">
        По текущим фильтрам задач нет.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onDelete={onDeleteTask} onToggle={onToggleTask} />
      ))}
    </div>
  );
};

export default TaskList;
