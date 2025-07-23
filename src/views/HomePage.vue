<template>
  <Header :heading="props.heading" :description="props.description" />
  <Slider
    :graphWidth="props.graphWidth"
    :warningThreshold="props.warningThreshold"
  />
</template>

<script lang="ts" setup>
import Header from "../components/Header.vue";
import Slider from "../components/Slider.vue";

const props = defineProps<{
  heading: string;
  description: string;
  graphWidth?: string;
  warningThreshold?: number;
}>();
</script>

<style scoped></style>
