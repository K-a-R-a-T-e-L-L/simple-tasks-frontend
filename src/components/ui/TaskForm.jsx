import { Save } from "lucide-react";
import { useState } from "react";

const TaskForm = ({ categories, onSubmit, loading }) => {
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const currentCategoryId = categoryId || String(categories[0]?.id || "");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const ok = await onSubmit({
      title,
      description,
      categoryId: Number(currentCategoryId),
      dueDate: dueDate || null,
    });

    if (ok) {
      setTitle("");
      setDescription("");
      setDueDate("");
    }
  };

  if (!categories.length) {
    return (
      <div className="rounded-xl border border-dashed border-brand-300 bg-brand-50 p-5 text-brand-700">
        Сначала создайте хотя бы одну категорию.
      </div>
    );
  }

  return (
    <form className="rounded-3xl bg-[#eaf6ee] p-5 md:p-8" onSubmit={handleSubmit}>
      <label className="mb-2 block font-bold text-sky-600">Название задачи</label>
      <input
        className="input-base"
        placeholder="Например: стать богом продуктивности"
        required
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />

      <label className="mb-2 mt-5 block font-bold text-sky-600">Категория</label>
      <select
        className="input-base"
        required
        value={currentCategoryId}
        onChange={(event) => setCategoryId(event.target.value)}
      >
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.title}
          </option>
        ))}
      </select>

      <label className="mb-2 mt-5 block font-bold text-sky-600">Описание</label>
      <textarea
        className="input-base min-h-32"
        placeholder="Описание деталей задачи"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />

      <label className="mb-2 mt-5 block font-bold text-sky-600">Срок (опционально)</label>
      <input className="input-base" type="date" value={dueDate} onChange={(event) => setDueDate(event.target.value)} />

      <button className="btn-primary mt-6 w-full max-w-sm" disabled={loading} type="submit">
        <Save size={20} />
        Сохранить задачу
      </button>
    </form>
  );
};

export default TaskForm;
