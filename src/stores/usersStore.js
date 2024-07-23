import { defineStore } from "pinia";
import { ref } from "vue";
import api from "../services/api";

import cookies from "js-cookie";

export const useUsersStore = defineStore("users", () => {
  const users = ref([]);
  const loading = ref(false);

  const fetch = async () => {
    try {
      const token = cookies.get("token");

      if (!token) return new Error("Token Not Found");

      loading.value = true;
      api.defaults.headers.common["Authorization"] = token;

      const { data } = await api.get("/api/users");

      if (!data.success) {
        throw new Error(data.message);
      }

      loading.value = false;

      users.value = data.users;
    } catch (error) {
      loading.value = false;
      console.log(error);
    }
  };

  return {
    users,
    loading,
    fetch,
  };
});
