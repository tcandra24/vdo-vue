<script setup>
import registerBg2 from "../assets/img/register_bg_2.png";
</script>

<template>
  <div>
    <!-- <navbar /> -->
    <main>
      <section class="relative w-full h-full py-40 min-h-screen">
        <div
          class="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
          :style="`background-image: url('${registerBg2}');`"
        ></div>
        <div class="container mx-auto px-4 h-full">
          <div class="flex content-center items-center justify-center h-full">
            <div class="w-full lg:w-4/12 px-4">
              <slot></slot>
            </div>
          </div>
        </div>
        <!-- <footer-small absolute /> -->
      </section>
    </main>
  </div>
</template>
