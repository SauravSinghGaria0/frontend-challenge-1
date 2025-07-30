<template>
  <!-- Slider -->
  <div
    class="relative mx-auto w-full px-4 sm:px-6"
    data-testid="slider-test"
    :class="[props.graphWidth || 'max-w-xl']"
  >
    <input
      v-model.number="peakPercent"
      type="range"
      min="0"
      max="100"
      class="w-full h-3 rounded-lg appearance-none slider"
      :style="sliderGradient"
      :class="[isWarning ? 'thumb-warning' : 'thumb-default']"
      @input="emitUpdatedValue"
    />
    <div class="relative mx-2">
      <div
        ref="sliderValueLabel"
        :style="{ left: `${peakPercent}%` }"
        class="absolute transform mt-1 -translate-x-1/2 text-white bg-black px-2 py-1 rounded text-xs sm:text-sm font-mono"
      >
        {{ peakPercent }}%
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, nextTick, computed } from "vue";

const emit = defineEmits(["update:sliderValue"]);

const peakPercent = ref(50); // Start at center
const warningThreshold = computed(() =>
  typeof props.warningThreshold === "number" ? props.warningThreshold : 10
);

const isWarning = computed(() => peakPercent.value < warningThreshold.value);

const props = defineProps<{
  graphWidth?: string;
  warningThreshold?: number;
}>();

const sliderGradient = computed(() => {
  const percent = peakPercent.value;

  if (isWarning.value) {
    return {
      background: `linear-gradient(
        to right,
        #ff6666 0%,
        #ffcccc ${percent}%,
        #8b0000 ${percent}%,
        #000000 100%
      )`,
    };
  } else {
    return {
      background: `linear-gradient(
        to right,
        #66bb6a 0%,
        #baffc9 ${percent}%,
        #2e7d32 ${percent}%,
        #000000 100%
      )`,
    };
  }
});

const emitUpdatedValue = () => {
  emit("update:sliderValue", peakPercent.value);
};

onMounted(() => {
  nextTick(() => {
    emit("update:sliderValue", peakPercent.value);
  });
});
watch(peakPercent, () =>
  nextTick(() => {
    emit("update:sliderValue", peakPercent.value);
  })
);
</script>

<style scoped>
.slider {
  border-radius: 10px;
  height: 10px;
  outline: none;
  appearance: none;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
}

/* Default thumb */
.thumb-default::-webkit-slider-thumb {
  appearance: none;
  width: 20px;
  height: 20px;
  background: #6ee35d;
  border-radius: 4px;
  box-shadow: 0 0 6px #6ee35d;
  cursor: pointer;
}
.thumb-default::-moz-range-thumb {
  width: 20px;
  height: 20px;
  background: #6ee35d;
  border: 3px solid #2d2d2d;
  border-radius: 4px;
  box-shadow: 0 0 6px #6ee35d;
  cursor: pointer;
}

/* Warning thumb */
.thumb-warning::-webkit-slider-thumb {
  appearance: none;
  width: 20px;
  height: 20px;
  background: #ff5555;
  border-radius: 4px;
  box-shadow: 0 0 6px #ff5555;
  cursor: pointer;
}
.thumb-warning::-moz-range-thumb {
  width: 20px;
  height: 20px;
  background: #ff5555;
  border: 3px solid #2d2d2d;
  border-radius: 4px;
  box-shadow: 0 0 6px #ff5555;
  cursor: pointer;
}
</style>
