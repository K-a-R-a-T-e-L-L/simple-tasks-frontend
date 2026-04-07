import { FolderOpen, ListTodo, Trash2 } from "lucide-react";

const CategoryList = ({ categories, selectedCategoryId, onSelectCategory, onDeleteCategory }) => {
  const totalCount = categories.reduce((acc, category) => acc + Number(category.tasksCount || 0), 0);

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <button
          className={`flex w-full items-center justify-between rounded-lg px-4 py-2.5 text-left font-bold transition ${
            selectedCategoryId === "all" ? "bg-[#b7e5ef] text-brand-700" : "bg-[#d7edf2] text-brand-600 hover:bg-[#c9e6ee]"
          }`}
          onClick={() => onSelectCategory("all")}
          type="button"
        >
          <span className="flex items-center gap-2">
            <ListTodo size={18} />
            Все задачи
          </span>
          <span className="rounded-full bg-white px-2 py-0.5 text-xs text-slate-700">{totalCount}</span>
        </button>

        {categories.map((category) => (
          <div key={category.id} className="flex items-center gap-2">
            <button
              className={`flex flex-1 items-center justify-between rounded-lg px-4 py-2.5 text-left font-bold transition ${
                String(selectedCategoryId) === String(category.id)
                  ? "bg-[#b7e5ef] text-brand-700"
                  : "bg-[#d7edf2] text-brand-600 hover:bg-[#c9e6ee]"
              }`}
              onClick={() => onSelectCategory(String(category.id))}
              type="button"
            >
              <span className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: category.color }} />
                {category.title}
              </span>
              <span className="rounded-full bg-white px-2 py-0.5 text-xs text-slate-700">{category.tasksCount}</span>
            </button>
            <button
              className="rounded-md bg-rose-100 p-2 text-rose-500 hover:bg-rose-200"
              onClick={() => onDeleteCategory(category.id)}
              title="Удалить категорию"
              type="button"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>

      {categories.length === 0 && (
        <div className="rounded-xl border border-dashed border-brand-200 bg-brand-50 p-4 text-sm text-brand-700">
          <div className="mb-2 flex items-center gap-2 font-bold">
            <FolderOpen size={18} />
            Список категорий пуст
          </div>
          Создайте первую категорию ниже.
        </div>
      )}
    </div>
  );
};

export default CategoryList;
