import { defineStore } from "pinia";
import { ref } from "vue";
import api from "../services/api";

import cookies from "js-cookie";

export const useCategoriesStore = defineStore("categories", () => {
  const categories = ref([]);
  const loading = ref(false);

  const fetch = async () => {
    try {
      const token = cookies.get("token");

      if (!token) return new Error("Token Not Found");

      loading.value = true;
      api.defaults.headers.common["Authorization"] = token;

      const { data } = await api.get("/api/categories");

      if (!data.success) {
        throw new Error(data.message);
      }

      loading.value = false;

      categories.value = data.categories;
    } catch (error) {
      loading.value = false;
      console.log(error);
    }
  };

  const post = async ({ name }) => {
    try {
      const token = cookies.get("token");

      loading.value = true;
      api.defaults.headers.common["Authorization"] = token;

      const { data } = await api.post("/api/categories", {
        name,
      });

      return data;
    } catch (error) {
      return error;
    } finally {
      loading.value = false;
    }
  };

  const destroy = async (id) => {
    try {
      const token = cookies.get("token");

      loading.value = true;
      api.defaults.headers.common["Authorization"] = token;
      const { data } = await api.delete(`/api/categories/${id}`);

      return data;
    } catch (error) {
      return error;
    } finally {
      loading.value = false;
    }
  };

  const show = async (id) => {
    try {
      const token = cookies.get("token");

      loading.value = true;
      api.defaults.headers.common["Authorization"] = token;
      const { data } = await api.get(`/api/categories/${id}`);

      return data;
    } catch (error) {
      return error;
    } finally {
      loading.value = false;
    }
  };

  const update = async (id, { name }) => {
    try {
      const token = cookies.get("token");

      loading.value = true;
      api.defaults.headers.common["Authorization"] = token;

      const { data } = await api.put(`/api/categories/${id}`, {
        name,
      });

      return data;
    } catch (error) {
      return error;
    } finally {
      loading.value = false;
    }
  };

  return {
    categories,
    loading,
    fetch,
    post,
    destroy,
    show,
    update,
  };
});
