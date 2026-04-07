import { CirclePlus } from "lucide-react";
import { useState } from "react";

const palette = ["#ff0000", "#22c55e", "#facc15", "#e11dcb", "#0ea5e9", "#4f46e5"];

const NewCategoryForm = ({ onSubmit, loading }) => {
  const [title, setTitle] = useState("");
  const [color, setColor] = useState(palette[4]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const ok = await onSubmit({ title, color });

    if (ok) {
      setTitle("");
      setColor(palette[4]);
    }
  };

  return (
    <form className="mt-8" onSubmit={handleSubmit}>
      <h3 className="mb-4 flex items-center gap-2 text-3xl font-extrabold text-brand-500">
        <CirclePlus size={32} />
        Новая категория
      </h3>

      <label className="mb-2 block font-bold text-sky-600">Название категории</label>
      <input
        className="input-base"
        placeholder="Например: домашние дела"
        required
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />

      <p className="mb-2 mt-4 font-bold text-sky-600">Цвет категории</p>
      <div className="mb-5 flex items-center gap-3">
        {palette.map((item) => (
          <button
            key={item}
            className={`h-4 w-4 rounded-full ring-2 ring-offset-2 transition ${
              color === item ? "ring-slate-600" : "ring-transparent"
            }`}
            onClick={() => setColor(item)}
            style={{ backgroundColor: item }}
            type="button"
          />
        ))}
      </div>

      <button className="btn-primary w-full max-w-sm" disabled={loading} type="submit">
        <CirclePlus size={20} />
        Добавить категорию
      </button>
    </form>
  );
};

export default NewCategoryForm;
