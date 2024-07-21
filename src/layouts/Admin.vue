<script setup>
import Sidebar from "../components/admin/Sidebar.vue";
import NavbarAdmin from "../components/admin/NavbarAdmin.vue";
import HeaderStats from "../components/admin/HeaderStats.vue";
import FooterAdmin from "../components/admin/FooterAdmin.vue";
</script>

<template>
  <div>
    <Sidebar />
    <div class="relative md:ml-64 bg-blueGray-100">
      <NavbarAdmin />
      <HeaderStats />
      <div class="px-4 md:px-10 mx-auto w-full -m-24">
        <slot></slot>
        <FooterAdmin />
      </div>
    </div>
  </div>
</template>
