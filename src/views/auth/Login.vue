<script setup>
import { reactive } from "vue";
import api from "../../services/api";
import cookies from "js-cookie";

import AuthLayout from "../../layouts/Auth.vue";

import { useRouter } from "vue-router";

const user = reactive({
  email: "",
  password: "",
});

const router = useRouter();

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
    console.log(error);
  }
};
</script>

<template>
  <AuthLayout>
    <div
      class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0"
    >
      <div class="flex-auto px-4 lg:px-10 py-10 pt-10">
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
