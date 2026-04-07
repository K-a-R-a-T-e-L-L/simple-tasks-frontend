import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import AuthLayout from "../components/layout/AuthLayout";
import useAuthStore from "../store/useAuthStore";

const Login = () => {
  const navigate = useNavigate();
  const { token, login, loading, error, clearError } = useAuthStore();

  const [form, setForm] = useState({
    login: "demo",
    password: "demo1234",
  });

  if (token) {
    return <Navigate to="/" replace />;
  }

  const handleChange = (event) => {
    clearError();
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const ok = await login(form);
    if (ok) {
      navigate("/");
    }
  };

  return (
    <AuthLayout
      title="Вход"
      subtitle="Войдите в аккаунт, чтобы управлять задачами"
      linkText="Нет аккаунта? Зарегистрироваться"
      linkTo="/register"
    >
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input className="input-base" name="login" onChange={handleChange} placeholder="Логин" required value={form.login} />
        <input
          className="input-base"
          name="password"
          onChange={handleChange}
          placeholder="Пароль"
          required
          type="password"
          value={form.password}
        />

        {error && <p className="text-sm font-bold text-rose-600">{error}</p>}

        <button className="btn-primary w-full" disabled={loading} type="submit">
          Войти
        </button>
      </form>
    </AuthLayout>
  );
};

export default Login;
