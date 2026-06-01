import axiosClient from "./axiosClient";

export const getCustomers = async () => {
  const response = await axiosClient.get(
    "/customers"
  );

  return response.data;
};

export const createCustomer = async (
  customerData
) => {
  const response = await axiosClient.post(
    "/customers",
    customerData
  );

  return response.data;
};

export const updateCustomer = async (
  id,
  customerData
) => {
  const response = await axiosClient.put(
    `/customers/${id}`,
    customerData
  );

  return response.data;
};

export const deleteCustomer = async (
  id
) => {
  const response = await axiosClient.delete(
    `/customers/${id}`
  );

  return response.data;
};