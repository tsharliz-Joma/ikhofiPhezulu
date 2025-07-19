import api from "@/utils/utils";

export const getAllMenuItems = async () => {
  try {
    const response = await api.post("/api/catalog", {});
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getItemById = async (id) => {
  try {
    const response = await api.get(`/api/catalog/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
