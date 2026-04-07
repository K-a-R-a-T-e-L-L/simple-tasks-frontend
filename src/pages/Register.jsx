import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import AuthLayout from "../components/layout/AuthLayout";
import useAuthStore from "../store/useAuthStore";

const Register = () => {
  const navigate = useNavigate();
  const { token, register, loading, error, clearError } = useAuthStore();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    login: "",
    password: "",
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
    const ok = await register(form);
    if (ok) {
      navigate("/");
    }
  };

  return (
    <AuthLayout
      title="Регистрация"
      subtitle="Создайте аккаунт для работы с задачами"
      linkText="Уже есть аккаунт? Войти"
      linkTo="/login"
    >
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          className="input-base"
          name="firstName"
          onChange={handleChange}
          placeholder="Имя"
          required
          value={form.firstName}
        />
        <input
          className="input-base"
          name="lastName"
          onChange={handleChange}
          placeholder="Фамилия"
          required
          value={form.lastName}
        />
        <input className="input-base" name="login" onChange={handleChange} placeholder="Логин" required value={form.login} />
        <input
          className="input-base"
          minLength={6}
          name="password"
          onChange={handleChange}
          placeholder="Пароль (минимум 6 символов)"
          required
          type="password"
          value={form.password}
        />

        {error && <p className="text-sm font-bold text-rose-600">{error}</p>}

        <button className="btn-primary w-full" disabled={loading} type="submit">
          Зарегистрироваться
        </button>
      </form>
    </AuthLayout>
  );
};

export default Register;
