<script setup>
import AdminLayout from "../../../layouts/Admin.vue";
import { useVideosStore } from "../../../stores/videosStore";
import { storeToRefs } from "pinia";

import { onMounted, reactive } from "vue";
import { useRoute } from "vue-router";

import LiteYouTubeEmbed from "vue-lite-youtube-embed";
import "vue-lite-youtube-embed/style.css";

const store = useVideosStore();
const { loading } = storeToRefs(store);
const { show } = store;

const route = useRoute();
const id = route.params.id;
const video = reactive({
  name: "",
  videoId: "",
});

const fetchVideo = async () => {
  const { success, message, data } = await show(id);

  if (!success) {
    console.log(message);
    return;
  }

  video.name = data.name;
  video.videoId = data.video_id;
};

onMounted(() => {
  fetchVideo();
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
            <div class="flex flex-wrap flex-col items-center">
              <div class="relative w-full px-4 max-w-full flex-grow flex-1">
                <h3 class="font-semibold text-lg">Videos</h3>
              </div>
              <div class="relative w-full px-4 max-w-full flex-grow flex-1">
                <h3 class="font-normal text-lg">
                  {{ video.name }}
                </h3>
              </div>
            </div>
          </div>

          <div class="block w-full overflow-x-auto py-5 px-10">
            <LiteYouTubeEmbed
              :playlist="false"
              poster="maxresdefault"
              :id="video.videoId"
              :title="video.name"
            />
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>
