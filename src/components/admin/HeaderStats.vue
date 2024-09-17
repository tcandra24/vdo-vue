<script setup>
import CardStats from "./CardStats.vue";
import { useAppStore } from "../../stores/appStore";
import { storeToRefs } from "pinia";

const store = useAppStore();
const { countVideo, countCategory, countUser } = storeToRefs(store);
</script>

<template>
  <div class="relative bg-emerald-600 md:pt-32 pb-32 pt-12">
    <div class="px-4 md:px-10 mx-auto w-full">
      <div>
        <div class="flex flex-wrap">
          <div class="w-full lg:w-6/12 xl:w-4/12 px-4">
            <CardStats
              statSubtitle="Videos"
              :statTitle="countVideo"
              statArrow=""
              statPercent=""
              statPercentColor=""
              statDescripiron=""
              statIconName="far fa-chart-bar"
              statIconColor="bg-red-500"
            />
          </div>
          <div class="w-full lg:w-6/12 xl:w-4/12 px-4">
            <CardStats
              statSubtitle="Category"
              :statTitle="countCategory"
              statArrow=""
              statPercent=""
              statPercentColor=""
              statDescripiron=""
              statIconName="fas fa-chart-pie"
              statIconColor="bg-orange-500"
            />
          </div>
          <div class="w-full lg:w-6/12 xl:w-4/12 px-4">
            <CardStats
              statSubtitle="User"
              :statTitle="countUser"
              statArrow=""
              statPercent=""
              statPercentColor=""
              statDescripiron=""
              statIconName="fas fa-users"
              statIconColor="bg-pink-500"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
