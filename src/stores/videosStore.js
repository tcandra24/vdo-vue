import { defineStore } from "pinia";
import { ref } from "vue";
import api from "../services/api";

import cookies from "js-cookie";

export const useVideosStore = defineStore("videos", () => {
  const videos = ref([]);
  const loading = ref(false);

  const fetch = async () => {
    try {
      const token = cookies.get("token");

      if (!token) return new Error("Token Not Found");

      loading.value = true;
      api.defaults.headers.common["Authorization"] = token;

      const { data } = await api.get("/api/videos");

      if (!data.success) {
        throw new Error(data.message);
      }

      loading.value = false;

      videos.value = data.videos;
    } catch (error) {
      loading.value = false;
    }
  };

  const post = async ({ name, video_id, category_id }) => {
    try {
      const token = cookies.get("token");

      loading.value = true;
      api.defaults.headers.common["Authorization"] = token;

      const { data } = await api.post("/api/videos", {
        name,
        video_id,
        category_id,
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
      const { data } = await api.delete(`/api/videos/${id}`);

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
      const { data } = await api.get(`/api/videos/${id}`);

      return data;
    } catch (error) {
      return error;
    } finally {
      loading.value = false;
    }
  };

  const update = async (id, { name, video_id, category_id }) => {
    try {
      const token = cookies.get("token");

      loading.value = true;
      api.defaults.headers.common["Authorization"] = token;

      const { data } = await api.put(`/api/videos/${id}`, {
        name,
        video_id,
        category_id,
      });

      return data;
    } catch (error) {
      return error;
    } finally {
      loading.value = false;
    }
  };

  return {
    videos,
    loading,
    fetch,
    post,
    destroy,
    show,
    update,
  };
});
