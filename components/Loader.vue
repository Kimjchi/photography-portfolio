<script setup lang="ts">
import { gsap } from "gsap";

onMounted(() => {
  gsap.to(".dot", {
    opacity: 100,
    repeat: -1,
    delay: (i) => i * 0.5,
  });
});
</script>

<template>
  <div
    class="fixed z-20 bg-black w-screen h-screen text-white font-teko text-9xl flex justify-center items-center text-center"
  >
    Loading<span class="dot opacity-0">.</span><span class="dot opacity-0">.</span><span class="dot opacity-0">.</span>
  </div>
</template>
