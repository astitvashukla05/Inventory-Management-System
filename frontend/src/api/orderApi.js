import axiosClient from "./axiosClient";

export const getOrders = async () => {
  const response =
    await axiosClient.get(
      "/orders"
    );

  return response.data;
};

export const createOrder = async (
  orderData
) => {
  const response =
    await axiosClient.post(
      "/orders",
      orderData
    );

  return response.data;
};

export const deleteOrder = async (
  id
) => {
  const response =
    await axiosClient.delete(
      `/orders/${id}`
    );

  return response.data;
};