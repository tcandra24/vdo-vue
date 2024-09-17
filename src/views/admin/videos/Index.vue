<script setup>
import { onMounted } from "vue";
import TableDropdown from "../../../components/admin/TableDropdown.vue";
import AdminLayout from "../../../layouts/Admin.vue";
import { useVideosStore } from "../../../stores/videosStore";
import { storeToRefs } from "pinia";

import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

import { useAppStore } from "../../../stores/appStore";

const storeApp = useAppStore();
const { fetch: fetchApp } = storeApp;

const store = useVideosStore();
const { videos, loading } = storeToRefs(store);
const { fetch, destroy } = store;

const deleteVideo = async (id) => {
  const { success, message } = await destroy(id);

  if (!success) {
    console.log(message);
    return;
  }

  toast.success(message, {
    theme: "colored",
  });

  fetchApp();
  fetch();
};

const deleteConfirm = (id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      deleteVideo(id);
    }
  });
};

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
                <h3 class="font-semibold text-lg">Videos</h3>
              </div>
            </div>
          </div>

          <router-link class="px-4 py-3" :to="{ name: 'videos.create' }">
            <button
              class="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded"
            >
              Add Video
            </button>
          </router-link>
          <div class="block w-full overflow-x-auto p-3">
            <div
              v-if="loading"
              class="flex items-center bg-emerald-500 text-white text-sm font-bold px-4 py-3 m-3 rounded justify-center"
              role="alert"
            >
              <p>Loading</p>
            </div>

            <div
              v-if="!loading && videos.length === 0"
              class="flex items-center bg-emerald-500 text-white text-sm font-bold px-4 py-3 m-3 rounded justify-center"
              role="alert"
            >
              <p>Videos is Empty</p>
            </div>

            <div
              class="flex flex-wrap gap-4"
              v-if="!loading && videos.length > 0"
            >
              <div
                v-for="(video, index) in videos"
                :key="index"
                class="w-full md:w-6/12 lg:w-3/12"
              >
                <div class="bg-white rounded-lg shadow-md overflow-hidden">
                  <router-link
                    :to="{ name: 'videos.show', params: { id: video.id } }"
                  >
                    <img
                      class="w-full"
                      :src="`https://img.youtube.com/vi/${video.video_id}/mqdefault.jpg`"
                      :alt="video.name"
                    />
                  </router-link>
                  <div class="px-5 py-2">
                    <div class="font-bold text-xl mb-2">{{ video.name }}</div>
                  </div>
                  <div class="px-5 pt-1 pb-2 flex justify-between">
                    <span
                      class="bg-emerald-100 text-white text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-emerald-700 dark:text-green-300"
                    >
                      {{ video.category.name }}
                    </span>
                    <TableDropdown
                      :funcDelete="deleteConfirm"
                      :param="video.id"
                      :linkName="`videos.edit`"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>
