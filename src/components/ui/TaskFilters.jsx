import { Check, Circle, Ellipsis, PlusCircle } from "lucide-react";

const TaskFilters = ({ status, onStatusChange }) => {
  const items = [
    { key: "all", label: "Все задачи", icon: Ellipsis, activeColor: "bg-[#b7e5ef] text-brand-700" },
    { key: "active", label: "Активные", icon: Circle, activeColor: "bg-[#bad8f5] text-blue-700" },
    { key: "completed", label: "Завершенные", icon: Check, activeColor: "bg-[#c9f0eb] text-emerald-700" },
  ];

  return (
    <div className="mb-5 flex flex-wrap items-center gap-3">
      {items.map((item) => {
        const Icon = item.icon;
        const active = status === item.key;
        return (
          <button
            key={item.key}
            className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 font-extrabold transition ${
              active ? item.activeColor : "bg-[#deecf0] text-brand-600 hover:bg-[#c9e6ee]"
            }`}
            onClick={() => onStatusChange(item.key)}
            type="button"
          >
            <Icon size={18} />
            {item.label}
          </button>
        );
      })}

      <span className="ml-auto inline-flex items-center gap-2 rounded-xl bg-brand-100 px-4 py-2 font-bold text-brand-700">
        <PlusCircle size={16} />
        Новая задача ниже
      </span>
    </div>
  );
};

export default TaskFilters;
