<script setup>
import { reactive } from "vue";
import api from "../../services/api";
import cookies from "js-cookie";
import { ref } from "vue";

import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

import AuthLayout from "../../layouts/Auth.vue";

import { useRouter } from "vue-router";

const user = reactive({
  email: "",
  password: "",
});

const router = useRouter();
const errors = ref([]);

const login = async () => {
  try {
    const { data } = await api.post("/api/login", {
      email: user.email,
      password: user.password,
    });

    if (!data.success) {
      throw new Error(data.message);
    }

    cookies.set("token", data.data.token);
    cookies.set("user", JSON.stringify(data.data.user));

    router.push({ name: "dashboard.index" });
  } catch (error) {
    if (Array.isArray(error.response.data.message)) {
      errors.value = error.response.data.message;
    } else {
      toast.error(error.response.data.message, {
        theme: "colored",
      });
    }
  }
};
</script>

<template>
  <AuthLayout>
    <div
      class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0"
    >
      <div class="flex-auto px-4 lg:px-10 py-10 pt-10">
        <div
          v-if="errors.length > 0"
          class="flex items-center bg-red-500 text-white text-sm font-bold px-4 py-3 m-3 rounded"
          role="alert"
        >
          <ul class="list-none">
            <li v-for="(error, index) in errors" :key="index">
              {{ error.message }}
            </li>
          </ul>
        </div>
        <form @submit.prevent="login">
          <div class="relative w-full mb-3">
            <label
              class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              Email
            </label>
            <input
              type="email"
              class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              placeholder="Email"
              v-model="user.email"
            />
          </div>

          <div class="relative w-full mb-3">
            <label
              class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              Password
            </label>
            <input
              type="password"
              class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              placeholder="Password"
              v-model="user.password"
            />
          </div>
          <div>
            <label class="inline-flex items-center cursor-pointer">
              <input
                id="customCheckLogin"
                type="checkbox"
                class="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
              />
              <span class="ml-2 text-sm font-semibold text-blueGray-600">
                Remember me
              </span>
            </label>
          </div>

          <div class="text-center mt-6">
            <button
              class="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
              type="submit"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
    <div class="flex flex-wrap mt-6 relative">
      <div class="w-1/2 text-right">
        <router-link :to="{ name: 'register' }" class="text-blueGray-200">
          <small>Create new account</small>
        </router-link>
      </div>
    </div>
  </AuthLayout>
</template>
