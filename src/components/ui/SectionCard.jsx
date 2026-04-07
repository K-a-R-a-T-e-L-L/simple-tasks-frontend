import { createElement } from "react";

const SectionCard = ({ title, icon, children }) => {
  return (
    <section className="panel p-5 md:p-9">
      <div className="mb-6 flex items-center gap-3 text-brand-500">
        {createElement(icon, { size: 34 })}
        <h2 className="text-3xl font-extrabold">{title}</h2>
      </div>
      {children}
    </section>
  );
};

export default SectionCard;
