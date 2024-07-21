<script setup>
import AdminLayout from "../../../layouts/Admin.vue";

import cookies from "js-cookie";
const user = JSON.parse(cookies.get("user"));
</script>

<template>
  <AdminLayout>
    <div class="flex flex-wrap mt-4">
      <div class="w-full mb-12 px-4">
        <div
          class="bg-white relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded"
        >
          <div class="block w-full overflow-x-auto p-10">
            <div
              class="flex items-center bg-blue-500 text-white text-sm font-bold px-4 py-3 rounded justify-center"
              role="alert"
            >
              <p>Welcome {{ user.name }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>
