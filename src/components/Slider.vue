<template>
  <div class="flex flex-col items-center w-full justify-center p-6">
    <!-- Graph Canvas -->
    <div
      ref="wrapperRef"
      data-testid="graph-wrapper"
      class="border rounded-lg mb-4 relative shadow h-60"
      :class="[
        isWarning ? 'bg-red-200' : 'bg-lime-50',
        props.graphWidth ? props.graphWidth : 'w-lg',
      ]"
    >
      <canvas ref="canvasRef" class="w-full h-full"> </canvas>
      <!-- Warning Span -->
      <span
        v-if="isWarning"
        class="absolute bottom-2 left-2 text-red-600 italic font-semibold text-sm"
      >
        * The value is below {{ warningThreshold }}%
      </span>
    </div>

    <!-- Slider -->
    <div
      class="relative"
      data-testid="slider-test"
      :class="props.graphWidth ? props.graphWidth : 'w-lg'"
    >
      <input
        v-model.number="peakPercent"
        type="range"
        min="0"
        max="100"
        class="w-full h-3 rounded-lg appearance-none slider"
        :style="sliderGradient"
        :class="[isWarning ? 'thumb-warning' : 'thumb-default']"
        @input="updateLabelPosition"
        ref="sliderRef"
      />
      <div
        class="absolute top-full mt-1 text-white bg-black px-3 py-1 rounded text-sm font-mono"
        :style="{ left: labelLeft + 'px', transform: 'translateX(-50%)' }"
      >
        {{ peakPercent }}%
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, nextTick, computed } from "vue";

const peakPercent = ref(50); // Start at center
// Warning threshold is set to 10% by default
const warningThreshold = computed(() =>
  typeof props.warningThreshold === "number" ? props.warningThreshold : 10
);

const canvasRef = ref<HTMLCanvasElement | null>(null);
const wrapperRef = ref<HTMLDivElement | null>(null);
//show warning if peak percent is below or above the threshold
const isWarning = computed(() => peakPercent.value < warningThreshold.value);
const sliderRef = ref<HTMLInputElement | null>(null);
const labelLeft = ref(0);

// Update the label position based on the slider value
const updateLabelPosition = () => {
  const slider = sliderRef.value;
  if (!slider) return;

  const rect = slider.getBoundingClientRect();
  const width = rect.width;
  const percent = peakPercent.value / 100;
  labelLeft.value = percent * width;
};

const props = defineProps<{
  graphWidth?: string;
  warningThreshold?: number;
}>();

// Draw the arch graph based on the peak percent
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

  //Quadratic arch parameters
  // Peak is at 10% of the height, base is at 85% of the height
  // Peak X is calculated based on the peak percent
  const peakX = (peakPercent / 100) * (width - 25); // 20px padding on both sides
  const peakY = height * 0.1; // top peak
  const baseY = height * 0.85; // bottom ends

  const aLeft = (baseY - peakY) / (peakX ** 2 || 1);
  const aRight = (baseY - peakY) / ((width - peakX) ** 2 || 1);

  ctx.beginPath();
  ctx.lineWidth = 5;
  // Set stroke color based on warning state
  ctx.strokeStyle = isWarning.value ? "red" : "#77B255";

  // Draw arch
  for (let x = 0; x <= width; x++) {
    let y;
    if (x <= peakX) {
      const dx = x - peakX;
      y = aLeft * dx * dx + peakY;
    } else {
      const dx = x - peakX;
      y = aRight * dx * dx + peakY;
    }

    x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  }

  ctx.stroke();
};
// Draw the initial graph
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

// Computed property for slider gradient based on peak percent
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

onMounted(() => {
  nextTick(() => {
    updateLabelPosition();
    drawArchGraph();
    window.addEventListener("resize", () => {
      updateLabelPosition();
      drawArchGraph();
    });
  });
});
watch(peakPercent, () =>
  nextTick(() => {
    updateLabelPosition();
    drawArchGraph();
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

/* Background gradients */
.slider-default {
  background: linear-gradient(to right, #a8ff78, #000000); /* green */
}
.slider-warning {
  background: linear-gradient(to right, #ff7b7b, #8b0000); /* red */
}

/* Default (green) square thumb */
.thumb-default::-webkit-slider-thumb {
  appearance: none;
  width: 22px;
  height: 22px;
  background: #6ee35d;
  border-radius: 4px;
  box-shadow: 0 0 6px #6ee35d;
  cursor: pointer;
}
.thumb-default::-moz-range-thumb {
  width: 22px;
  height: 22px;
  background: #6ee35d;
  border: 3px solid #2d2d2d;
  border-radius: 4px;
  box-shadow: 0 0 6px #6ee35d;
  cursor: pointer;
}

/* Warning (red) square thumb */
.thumb-warning::-webkit-slider-thumb {
  appearance: none;
  width: 22px;
  height: 22px;
  background: #ff5555;
  border-radius: 4px;
  box-shadow: 0 0 6px #ff5555;
  cursor: pointer;
}
.thumb-warning::-moz-range-thumb {
  width: 22px;
  height: 22px;
  background: #ff5555;
  border: 3px solid #2d2d2d;
  border-radius: 4px;
  box-shadow: 0 0 6px #ff5555;
  cursor: pointer;
}
</style>
