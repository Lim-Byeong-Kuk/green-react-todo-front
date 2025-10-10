import axios from "axios";

export const API_SERVER_HOST = `http://localhost:8080`;

export const prefix = `${API_SERVER_HOST}/api/score`;

export const scoreGetOne = async (sno) => {
  const res = await axios.get(`${prefix}/read/${sno}`);
  return res.data;
};

export const scoreGetList = async ({ page, size }) => {
  const res = await axios.get(`${prefix}/list`, { params: { page, size } });
  return res.data;
};
