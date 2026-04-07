import api from "./axios";

export const fetchTasksRequest = async (params) => {
  const { data } = await api.get("/tasks", { params });
  return data;
};

export const createTaskRequest = async (payload) => {
  const { data } = await api.post("/tasks", payload);
  return data;
};

export const deleteTaskRequest = async (id) => {
  await api.delete(`/tasks/${id}`);
};

export const toggleTaskStatusRequest = async (id) => {
  const { data } = await api.patch(`/tasks/${id}/toggle`);
  return data;
};
