<template>
  <div
    class="flex flex-col items-center w-full justify-center px-4 py-6 sm:px-6"
  >
    <h1
      class="text-lg sm:text-xl md:text-2xl font-bold text-black mb-2 text-center"
    >
      {{ props.heading }}
    </h1>
    <p class="text-sm sm:text-base text-gray-700 mb-4 text-center max-w-2xl">
      {{ props.description }}
    </p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  heading: string;
  description: string;
}>();
</script>
