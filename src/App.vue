<script setup>
import { ToastifyContainer } from "vue3-toastify";
</script>

<template>
  <div>
    <ToastifyContainer theme="colored" />
    <router-view></router-view>
  </div>
</template>
