import axiosClient from "./axiosClient";

export const getProducts = async () => {
  const response = await axiosClient.get("/products");
  return response.data;
};

export const createProduct = async (data) => {
  const response = await axiosClient.post(
    "/products",
    data
  );

  return response.data;
};

export const updateProduct = async (
  productId,
  data
) => {
  const response = await axiosClient.put(
    `/products/${productId}`,
    data
  );

  return response.data;
};

export const deleteProduct = async (
  productId
) => {
  const response = await axiosClient.delete(
    `/products/${productId}`
  );

  return response.data;
};