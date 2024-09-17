import { defineStore } from "pinia";
import { ref } from "vue";
import api from "../services/api";

import cookies from "js-cookie";

export const useAppStore = defineStore("appStore", () => {
  const countVideo = ref(0);
  const countCategory = ref(0);
  const countUser = ref(0);

  const fetch = async () => {
    try {
      const token = cookies.get("token");

      if (!token) return new Error("Token Not Found");

      api.defaults.headers.common["Authorization"] = token;

      const { data } = await api.get("/api/dashboard/total-data");

      if (!data.success) {
        throw new Error(data.message);
      }

      countVideo.value = data.total.video;
      countCategory.value = data.total.category;
      countUser.value = data.total.user;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    fetch,
    countVideo,
    countCategory,
    countUser,
  };
});
