import api from "utils/utils.js";

export const getAllMenuItems = async () => {
  try {
    const response = await api.post("/catalog", {});
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getItemById = async (id) => {
  try {
    const response = await api.get(`/catalog/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
