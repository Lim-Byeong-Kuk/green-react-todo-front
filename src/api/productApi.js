import axios from "axios";
import jwtAxios from "../utils/jwtUtil";

export const API_SERVER_HOST = "http://localhost:8080";
const prefix = `${API_SERVER_HOST}/api/products`;

export const getList = async ({ page, size }) => {
  const res = await jwtAxios.get(`${prefix}/list`, {
    params: { page: page, size: size },
  });
  console.log("backend로 부터 온 데이터", res);
  return res;
};

export const postAdd = async (product) => {
  console.log(product);
  const header = { headers: { "Content-Type": "multipart/form-data" } };
  const res = await jwtAxios.post(`${prefix}/`, product, header);
  console.log("basckend 로 부터 온 데이터 ", res);
  return res.data;
};

export const getOne = async (pno) => {
  const res = await jwtAxios.get(`${prefix}/${pno}`);
  return res.data;
};

export const putProduct = async (pno, product) => {
  const header = { headers: { "Content-Type": "multipart/form-data" } };
  const res = await jwtAxios.put(`${prefix}/${pno}`, product, header);
  return res.data;
};

export const deleteProduct = async (pno) => {
  const res = await jwtAxios.delete(`${prefix}/${pno}`);
  return res.data;
};
