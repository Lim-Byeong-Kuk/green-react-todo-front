import axios from "axios";

export const API_SERVER_HOST = "http://localhost:8080";
const prefix = `${API_SERVER_HOST}/api/address`;

export const getList = async ({ page, size }) => {
  const res = await axios.get(`${prefix}/list`, {
    params: { page, size },
  });
  console.log("addressApi 호출 후 받은 데이터", res);
  return res;
};

export const postAdd = async (product) => {
  console.log(product);
  const header = { headers: { "Content-Type": "multipart/form-data" } };
  const res = await axios.post(`${prefix}/`, product, header);
  console.log("address 데이터 ", res);
  return res.data;
};
