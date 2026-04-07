import { LogOut, Menu, Search } from "lucide-react";

const AppHeader = ({ user, onLogout, search, onSearchChange }) => {
  const initials = `${user?.firstName?.[0] || "U"}${user?.lastName?.[0] || "S"}`.toUpperCase();

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white shadow-sm">
      <div className="mx-auto flex w-full max-w-[1400px] items-center gap-4 px-4 py-3 md:px-8">
        <button className="rounded-md p-2 text-brand-500 hover:bg-brand-50" type="button" aria-label="menu">
          <Menu size={30} />
        </button>
        <h1 className="text-4 font-extrabold text-brand-500 md:text-5">SimpleTasks</h1>

        <div className="relative ml-auto hidden w-full max-w-2xl md:block">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500" size={22} />
          <input
            className="w-full rounded-full bg-[#dff2f3] px-6 py-3 pr-12 text-lg outline-none ring-brand-200 transition focus:ring-2"
            placeholder="Поиск"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
          />
        </div>

        <button className="btn-soft hidden md:inline-flex" onClick={onLogout} type="button">
          <LogOut size={18} />
          Выйти
        </button>

        <div className="grid h-14 w-14 place-items-center rounded-full bg-[#a7ece8] text-xl font-bold text-slate-800">
          {initials}
        </div>
      </div>
      <div className="px-4 pb-3 md:hidden">
        <div className="relative">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500" size={22} />
          <input
            className="w-full rounded-full bg-[#dff2f3] px-6 py-3 pr-12 text-base outline-none ring-brand-200 transition focus:ring-2"
            placeholder="Поиск"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
          />
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
