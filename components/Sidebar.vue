<script setup lang="ts">
import {
  PhInstagramLogo,
  PhLinkedinLogo,
  PhGithubLogo,
} from "@phosphor-icons/vue";

defineProps({
  autoScrollActive: Boolean,
  setupAutoScroll: Function,
});
</script>

<template>
  <div
    class="fixed py-10 pr-16 pl-10 bg-black h-[calc(100%-10rem)] text-white z-10 left-10 rounded-sm opacity-70 hover:opacity-100"
  >
    <h2 class="font-teko text-4xl">My portfolio</h2>
    <div class="flex flex-col text-xl mt-5">
      <NuxtLink to="#videos" class="font-teko group transition duration-300">
        Videos
        <div
          class="border-t-2 border-white mr-5 w-0 group-hover:w-10/12 group-hover:border-2 transition-all duration-500"
        ></div>
      </NuxtLink>
      <NuxtLink to="#about" class="font-teko group transition duration-300">
        About & Contact
        <div
          class="border-t-2 border-white mr-5 w-0 group-hover:w-10/12 group-hover:border-2 transition-all duration-500"
        ></div>
      </NuxtLink>
    </div>
    <div class="flex space-x-4 my-5">
      <NuxtLink to="https://www.instagram.com/kimjchi/" target="_blank">
        <PhInstagramLogo
          :size="32"
          color="#e6e6e6"
          weight="fill"
          class="cursor-pointer opacity-80 hover:opacity-100"
        />
      </NuxtLink>
      <NuxtLink to="www.linkedin.com/in/jérémy-v-kim" target="_blank">
        <PhLinkedinLogo
          :size="32"
          color="#e6e6e6"
          weight="fill"
          class="cursor-pointer opacity-80 hover:opacity-100"
        />
      </NuxtLink>
      <NuxtLink to="https://github.com/Kimjchi" target="_blank">
        <PhGithubLogo
          :size="32"
          color="#e6e6e6"
          weight="fill"
          class="cursor-pointer opacity-80 hover:opacity-100"
        />
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
