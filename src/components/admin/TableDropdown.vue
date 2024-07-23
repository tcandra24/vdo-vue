<script setup>
import { createPopper } from "@popperjs/core";
import { ref } from "vue";

const props = defineProps({
  funcDelete: {
    type: Function,
  },
  param: {
    type: Number,
  },
  linkName: {
    type: String,
    default: "",
    required: false,
  },
});

const dropdownPopoverShow = ref(false);
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
</script>

<template>
  <div>
    <a
      class="text-blueGray-500 py-1 px-3"
      href="#"
      ref="btnDropdownRef"
      v-on:click="toggleDropdown($event)"
    >
      <i class="fas fa-ellipsis-v"></i>
    </a>
    <div
      ref="popoverDropdownRef"
      class="bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
      v-bind:class="{
        hidden: !dropdownPopoverShow,
        block: dropdownPopoverShow,
      }"
    >
      <router-link
        :to="{ name: linkName, params: { id: param } }"
        class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
      >
        Edit
      </router-link>
      <a
        @click="funcDelete(param)"
        href="javascript:void(0);"
        class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
      >
        Delete
      </a>
    </div>
  </div>
</template>
