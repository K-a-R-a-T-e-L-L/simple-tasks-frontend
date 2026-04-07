import { Link } from "react-router-dom";

const AuthLayout = ({ title, subtitle, children, linkText, linkTo }) => {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      <section className="panel w-full max-w-md p-8">
        <h1 className="text-3xl font-extrabold text-brand-600">SimpleTasks</h1>
        <h2 className="mt-4 text-2xl font-bold text-slate-900">{title}</h2>
        <p className="mt-2 text-sm text-slate-500">{subtitle}</p>
        <div className="mt-6">{children}</div>
        <Link className="mt-6 inline-block text-sm font-bold text-brand-600 hover:text-brand-700" to={linkTo}>
          {linkText}
        </Link>
      </section>
    </main>
  );
};

export default AuthLayout;
