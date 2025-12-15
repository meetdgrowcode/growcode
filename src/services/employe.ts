import API from "./api";

export type CreateEmployeePayload = {
  name: string;
  email: string;
  department: string;
  role: string;
};

export const createEmployee = async (payload: CreateEmployeePayload) => {
  const res = await API.post("/employee/add", payload);
  return res.data;
};

export const getEmployees = async () => {
  const res = await API.post("/employee");
  return res.data;
};
