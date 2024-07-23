<script setup>
import { onMounted } from "vue";
import AdminLayout from "../../../layouts/Admin.vue";
import { useUsersStore } from "../../../stores/usersStore";
import { storeToRefs } from "pinia";

const store = useUsersStore();
const { users, loading } = storeToRefs(store);
const { fetch } = store;

onMounted(() => {
  fetch();
});
</script>

<template>
  <AdminLayout>
    <div class="flex flex-wrap mt-4">
      <div class="w-full mb-12 px-4">
        <div
          class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white"
        >
          <div class="rounded-t mb-0 px-4 py-3 border-0">
            <div class="flex flex-wrap items-center">
              <div class="relative w-full px-4 max-w-full flex-grow flex-1">
                <h3 class="font-semibold text-lg">Users</h3>
              </div>
            </div>
          </div>
          <div class="block w-full overflow-x-auto">
            <table class="items-center w-full bg-transparent border-collapse">
              <thead>
                <tr>
                  <th
                    class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                    :class="[
                      color === 'light'
                        ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                        : 'bg-emerald-600 text-white border-emerald-500',
                    ]"
                  >
                    Name
                  </th>
                  <th
                    class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                    :class="[
                      color === 'light'
                        ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                        : 'bg-emerald-600 text-white border-emerald-500',
                    ]"
                  >
                    Email
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="loading">
                  <td colspan="2">
                    <div
                      class="flex items-center bg-emerald-500 text-white text-sm font-bold px-4 py-3 m-3 rounded justify-center"
                      role="alert"
                    >
                      <p>Loading</p>
                    </div>
                  </td>
                </tr>
                <template v-if="!loading && users.length > 0">
                  <tr v-for="(user, index) in users" :key="index">
                    <td
                      class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                    >
                      {{ user.name }}
                    </td>
                    <td
                      class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                    >
                      {{ user.email }}
                    </td>
                  </tr>
                </template>
                <template>
                  <tr>
                    <td>
                      <div
                        class="flex items-center bg-emerald-500 text-white text-sm font-bold px-4 py-3 m-3 rounded justify-center"
                        role="alert"
                      >
                        <p>User is Empty</p>
                      </div>
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>
