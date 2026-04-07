import { CalendarDays, Square, SquareCheckBig, Trash2 } from "lucide-react";

const formatDate = (dateString) => {
  if (!dateString) {
    return "Без срока";
  }

  const date = new Date(dateString);
  return new Intl.DateTimeFormat("ru-RU", { day: "2-digit", month: "2-digit", year: "numeric" }).format(date);
};

const TaskItem = ({ task, onToggle, onDelete }) => {
  const completed = task.status === "completed";

  return (
    <article className={`relative rounded-2xl border-l-4 bg-white p-5 shadow-card ${completed ? "border-emerald-400" : "border-blue-500"}`}>
      <div className="mb-3 flex flex-wrap items-center gap-3">
        <button className="text-violet-700" onClick={() => onToggle(task.id)} type="button">
          {completed ? <SquareCheckBig size={21} /> : <Square size={21} />}
        </button>

        <span className="rounded-full bg-sky-400 px-4 py-1 text-sm font-bold text-white">{task.category?.title || "Без категории"}</span>

        <span className="inline-flex items-center gap-2 text-sm font-bold text-slate-800">
          <CalendarDays className="text-sky-400" size={18} />
          {formatDate(task.dueDate)}
        </span>

        <button
          className="ml-auto inline-flex items-center gap-2 rounded-md bg-rose-100 px-4 py-2 font-bold text-rose-700 hover:bg-rose-200"
          onClick={() => onDelete(task.id)}
          type="button"
        >
          <Trash2 size={17} />
          Удалить
        </button>
      </div>

      <h3 className="text-2xl font-extrabold text-slate-900">{task.title}</h3>
      <p className="mt-3 text-lg text-slate-600">{task.description || "Без описания"}</p>
    </article>
  );
};

export default TaskItem;
