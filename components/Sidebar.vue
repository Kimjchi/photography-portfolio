<script setup lang="ts">

defineProps({
  autoScrollActive: Boolean,
  setupAutoScroll: Function,
  goToSection: Function,
  height: Number,
});
</script>

<template>
  <div
    class="hidden sm:block fixed py-10 pr-16 pl-10 bg-black text-white z-10 left-10 rounded-sm opacity-70 hover:opacity-100"
    :style="{height: height + 'px'}"
  >
    <h2
      class="font-teko text-4xl cursor-pointer"
      :onclick="() => goToSection?.(0)"
    >
      My portfolio
    </h2>
    <div class="flex flex-col text-xl mt-5">
      <NuxtLink to="#videos" class="font-teko group transition duration-300">
        Videos
        <div
          class="border-t-2 border-white mr-5 w-0 group-hover:w-10/12 group-hover:border-2 transition-all duration-500"
        ></div>
      </NuxtLink>
      <NuxtLink
        to="/"
        class="font-teko group transition duration-300"
        :onclick="() => goToSection?.('max')"
      >
        About
        <div
          class="border-t-2 border-white mr-5 w-0 group-hover:w-10/12 group-hover:border-2 transition-all duration-500"
        ></div>
      </NuxtLink>
    </div>
    <div class="flex space-x-4 my-5">
      <NuxtLink to="https://www.instagram.com/kimjchi/" target="_blank">
        <i class="ph-fill ph-instagram-logo cursor-pointer opacity-80 hover:opacity-100 text-4xl" style="color: #e6e6e6;"></i>
      </NuxtLink>
      <NuxtLink to="www.linkedin.com/in/jérémy-v-kim" target="_blank">
        <i class="ph-fill ph-linkedin-logo cursor-pointer opacity-80 hover:opacity-100 text-4xl" style="color: #e6e6e6;"></i>
      </NuxtLink>
      <NuxtLink to="https://github.com/Kimjchi" target="_blank">
        <i class="ph-fill ph-github-logo cursor-pointer opacity-80 hover:opacity-100 text-4xl" style="color: #e6e6e6;"></i>
      </NuxtLink>
    </div>
    <div
      v-if="autoScrollActive"
      :onclick="() => setupAutoScroll?.()"
      class="text-xl font-teko group transition duration-300 cursor-pointer"
    >
      Resume auto scroll
      <div
        class="border-t-2 border-white mr-5 w-0 group-hover:w-10/12 group-hover:border-2 transition-all duration-500"
      ></div>
    </div>
  </div>
</template>
