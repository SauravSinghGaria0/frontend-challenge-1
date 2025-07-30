<template>
  <Header :heading="props.heading" :description="props.description" />
  <Graph
    :graphWidth="props.graphWidth"
    :warningThreshold="props.warningThreshold"
    :sliderValue="peakPercent"
  />
  <Slider
    :graphWidth="props.graphWidth"
    :warningThreshold="props.warningThreshold"
    @update:sliderValue="sliderValue"
  />
</template>

<script lang="ts" setup>
import Header from "../components/Header.vue";
import Slider from "../components/Slider.vue";
import Graph from "../components/Graph.vue";
import { ref } from "vue";
const props = defineProps<{
  heading: string;
  description: string;
  graphWidth?: string;
  warningThreshold?: number;
}>();

const peakPercent = ref(50); // Start at center
const sliderValue = (value: number) => {
  peakPercent.value = value;
};
</script>

<style scoped></style>
