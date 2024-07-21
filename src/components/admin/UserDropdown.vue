<template>
  <div>
    <a
      class="text-blueGray-500 block"
      href="#pablo"
      ref="btnDropdownRef"
      v-on:click="toggleDropdown($event)"
    >
      <div class="items-center flex">
        <span
          class="w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full"
        >
          <img
            :alt="user.name"
            class="w-full rounded-full align-middle border-none shadow-lg"
            :src="`https://ui-avatars.com/api/?name=${user.name}&background=0D8ABC&color=fff`"
          />
        </span>
      </div>
    </a>
    <div
      ref="popoverDropdownRef"
      class="bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
      v-bind:class="{
        hidden: !dropdownPopoverShow,
        block: dropdownPopoverShow,
      }"
    >
      <a
        href="javascript:void(0);"
        class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
      >
        My Profile
      </a>
      <div class="h-0 my-2 border border-solid border-blueGray-100" />
      <a
        href="javascript:void(0);"
        @click="logout"
        class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
      >
        Logout
      </a>
    </div>
  </div>
</template>

<script setup>
import { createPopper } from "@popperjs/core";
import { ref } from "vue";
import { useRouter } from "vue-router";
import cookies from "js-cookie";

const router = useRouter();

const dropdownPopoverShow = ref(false);
const user = JSON.parse(cookies.get("user"));

const btnDropdownRef = ref(null);
const popoverDropdownRef = ref(null);

function toggleDropdown(event) {
  event.preventDefault();
  if (dropdownPopoverShow.value) {
    dropdownPopoverShow.value = false;
  } else {
    dropdownPopoverShow.value = true;

    createPopper(btnDropdownRef.value, popoverDropdownRef.value, {
      placement: "bottom-start",
    });
  }
}

function logout() {
  cookies.remove("token");
  cookies.remove("user");

  router.push({ name: "login" });
}
</script>
