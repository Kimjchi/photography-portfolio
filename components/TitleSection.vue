<script setup lang="ts">
import { useRuntimeConfig } from "nuxt/app";

const runtimeConfig = useRuntimeConfig();
defineProps({
  setReady: Function,
});
</script>

<template>
  <div
    class="h-screen w-screen flex flex-col justify-center items-end relative overflow-hidden title-section"
  >
    <h1 class="font-teko title z-10 text-pretty select-none text-right w-full pr-10">
      Jérémy<br/>Kim
    </h1>
    <NuxtImg
      :src="`${runtimeConfig.public.strapiUrl}/uploads/IMG_8235_77851dd4b2.JPG`"
      alt="logo"
      class="h-full w-full absolute top-0 left-0 object-cover"
      @load="() => setReady?.()"
    />
  </div>
</template>
