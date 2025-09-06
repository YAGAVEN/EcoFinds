import axios from "axios";

const API_URL = "http://127.0.0.1:8000"; // FastAPI URL

export const getCart = async () => {
  const res = await axios.get(`${API_URL}/cart/`, { withCredentials: true });
  return res.data;
};

export const addToCart = async (productId) => {
  const res = await axios.post(`${API_URL}/cart/add/${productId}`, {}, { withCredentials: true });
  return res.data;
};

export const removeFromCart = async (productId) => {
  const res = await axios.post(`${API_URL}/cart/remove/${productId}`, {}, { withCredentials: true });
  return res.data;
};
