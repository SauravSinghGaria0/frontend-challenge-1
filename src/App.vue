<script setup lang="ts">
import HomePage from "./views/HomePage.vue";
const heading = "Slider-Peak Graph";
const description = "Slide to shift the peak position left or right.";
const graphWidth = "w-xl";
</script>

<template>
  <HomePage
    :description="description"
    :graph-width="graphWidth"
    :heading="heading"
    :warning-threshold="12"
  />
</template>

<style>
html,
body {
  @reference "./style.css";
  @apply bg-slate-50;
}
</style>
