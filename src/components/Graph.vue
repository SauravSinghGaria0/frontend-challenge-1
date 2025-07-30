<template>
  <div
    class="w-full mx-auto px-4 sm:px-6"
    :class="[props.graphWidth || 'max-w-xl']"
  >
    <!-- Graph Canvas -->
    <div
      ref="wrapperRef"
      data-testid="graph-wrapper"
      class="relative border rounded-lg shadow h-60 mb-4"
      :class="[isWarning ? 'bg-red-200' : 'bg-lime-50']"
    >
      <canvas ref="canvasRef" class="w-full h-full"> </canvas>

      <!-- Warning Span -->
      <span
        v-if="isWarning"
        class="absolute bottom-2 left-2 text-red-600 italic font-semibold text-xs sm:text-sm"
      >
        * The value is below {{ warningThreshold }}%
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from "vue";

const props = defineProps<{
  graphWidth?: string;
  sliderValue?: number;
  warningThreshold?: number;
}>();

const peakPercent = ref(50);

const warningThreshold = computed(() =>
  typeof props.warningThreshold === "number" ? props.warningThreshold : 10
);

const canvasRef = ref<HTMLCanvasElement | null>(null);
const wrapperRef = ref<HTMLDivElement | null>(null);

const isWarning = computed(() => peakPercent.value < warningThreshold.value);

// Draw the arch graph
const drawGraph = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  peakPercent: number
) => {
  ctx.clearRect(0, 0, width, height);

  if (peakPercent < warningThreshold.value) {
    peakPercent = warningThreshold.value;
  }

  const peakX = (peakPercent / 100) * (width - 25);
  const peakY = height * 0.1;
  const baseY = height * 0.85;

  const aLeft = (baseY - peakY) / (peakX ** 2 || 1);
  const aRight = (baseY - peakY) / ((width - peakX) ** 2 || 1);

  ctx.beginPath();
  ctx.lineWidth = 5;
  ctx.strokeStyle = isWarning.value ? "red" : "#77B255";

  for (let x = 0; x <= width; x++) {
    const dx = x - peakX;
    const y = (x <= peakX ? aLeft : aRight) * dx * dx + peakY;
    x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  }

  ctx.stroke();
};

// Resize-aware draw
const drawArchGraph = () => {
  if (!canvasRef.value || !wrapperRef.value) return;
  const canvas = canvasRef.value;
  const wrapper = wrapperRef.value;

  const width = wrapper.clientWidth;
  const height = wrapper.clientHeight;

  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  drawGraph(ctx, width, height, peakPercent.value);
};

onMounted(() => {
  nextTick(() => {
    drawArchGraph();
    // Optional: auto-redraw on resize
    window.addEventListener("resize", drawArchGraph);
  });
});

// Watch for sliderValue change
watch(
  () => props.sliderValue,
  (newValue) => {
    if (newValue !== undefined) {
      peakPercent.value = newValue;
      drawArchGraph();
    }
  },
  { immediate: true }
);
</script>

<style scoped>
/* Optional: smooth canvas transition effect */
canvas {
  transition:
    width 0.3s ease,
    height 0.3s ease;
}
</style>
