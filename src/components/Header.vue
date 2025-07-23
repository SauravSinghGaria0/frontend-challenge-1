<template>
  <div class="flex flex-col items-center w-full justify-center p-6">
    <h1 class="text-xl font-bold text-black mb-2">{{ props.heading }}</h1>
    <p class="text-gray-700 mb-4">
      {{ props.description }}
    </p>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{ heading: string; description: string }>();
</script>
<style scoped></style>
