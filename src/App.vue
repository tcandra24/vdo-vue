<script setup>
import { ToastifyContainer } from "vue3-toastify";

import { useAppStore } from "./stores/appStore";
import { onMounted } from "vue";

const store = useAppStore();
const { fetch } = store;

onMounted(() => {
  fetch();
});
</script>

<template>
  <div>
    <ToastifyContainer theme="colored" />
    <router-view></router-view>
  </div>
</template>
