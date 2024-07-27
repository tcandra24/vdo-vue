<script setup>
import AdminLayout from "../../../layouts/Admin.vue";
import { useCategoriesStore } from "../../../stores/categoriesStore";
import { storeToRefs } from "pinia";

import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const store = useCategoriesStore();
const { loading } = storeToRefs(store);
const { show, update } = store;

const router = useRouter();
const route = useRoute();

const id = route.params.id;

const name = ref("");
const errors = ref([]);

const getCategory = async () => {
  const { success, message, data } = await show(id);

  if (!success) {
    console.log(message);
    return;
  }

  name.value = data.name;
};

const submit = async () => {
  const payload = {
    name: name.value,
  };

  const data = await update(id, payload);

  if (!data.success) {
    if (Array.isArray(data.response.data.message)) {
      errors.value = data.response.data.message;
    } else {
      toast.error(data.response.data.message, {
        theme: "colored",
      });
    }
    return;
  }

  toast.success(data.message, {
    theme: "colored",
    onClose: () => {
      router.push({ name: "categories.index" });
    },
  });
};

onMounted(() => {
  getCategory();
});
</script>

<template>
  <AdminLayout>
    <div class="flex flex-wrap">
      <div class="w-full px-4">
        <div
          class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0"
        >
          <div class="rounded-t bg-white mb-0 px-6 py-6">
            <div class="text-center flex justify-between">
              <h6 class="text-blueGray-700 text-xl font-bold">Category</h6>
            </div>
          </div>
          <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
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
            <form @submit.prevent="submit">
              <h6
                class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase"
              >
                Category Information
              </h6>
              <div class="flex flex-wrap">
                <div class="w-full lg:w-6/12 px-4">
                  <div class="relative w-full mb-3">
                    <label
                      class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      v-model="name"
                    />
                  </div>
                </div>
              </div>

              <div class="flex flex-wrap">
                <div class="w-full lg:w-12/12 px-4">
                  <div class="relative w-full mb-3">
                    <button
                      type="submit"
                      class="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded"
                      :disabled="loading"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>
