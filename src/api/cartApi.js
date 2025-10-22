import jwtAxios from "../utils/jwtUtil";
import { API_SERVER_HOST } from "./todoApi";

const prefix = `${API_SERVER_HOST}/api/cart`;

export const getCartItems = async () => {
  const res = await jwtAxios.get(`${prefix}/items`);
  console.log("cartItems 데이터", res.data);
  return res.data;
};

export const postChangeCart = async (cartItem) => {
  const res = await jwtAxios.post(`${prefix}/change`, cartItem);
  return res.data;
};
