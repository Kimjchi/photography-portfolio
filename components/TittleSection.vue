<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();
defineProps({
  setReady: Function,
});
</script>

<template>
  <div
    class="h-screen w-screen flex justify-center items-start text-end relative overflow-hidden title-section"
  >
    <h1
      class="font-teko title z-10 pointer-events-auto cursor-default text-pretty select-none"
    >
      Jérémy Kim
    </h1>
    <NuxtImg
      :src="`${runtimeConfig.public.strapiUrl}/uploads/IMG_8235_74a38cece7.JPG`"
      alt="logo"
      class="absolute top-0 left-0"
      @load="() => setReady?.()"
    />
  </div>
</template>
