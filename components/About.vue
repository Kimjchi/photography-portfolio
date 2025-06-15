<script setup lang="ts">
import { useRuntimeConfig } from "nuxt/app";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const runtimeConfig = useRuntimeConfig();

gsap.registerPlugin(ScrollTrigger);

onMounted(() => {
  gsap.to(".line", {
    opacity: 100,
    duration: 2,
    width: "100%",
  });
});
</script>

<template>
  <div class="sm:h-screen flex flex-col">
  <div class="md:h-[75%] w-screen flex sm:flex-row flex-col justify-center items-center flex-grow" id="about">
    <div class="text-white flex flex-col sm:w-1/2 md:py-28 sm:py-5 py-10  px-16 space-y-5 h-full">
      <div>
        <h2 class="text-6xl font-teko">About me</h2>
        <div
          class="line opacity-0 border-t-2 border-white w-0 group-hover:w-10/12 group-hover:border-2 transition-all duration-500"
        ></div>
      </div>
      <div class="font-teko text-xl">
        I'm a French freelance developer located in Paris.<br /><br />

        In between work, I and trying to work of different creative projects
        such as photography. I would like to be a more creative person but I'm
        lazy as hell (which makes me a good programmer).<br /><br />

        Thanks for reading this. Please reach out if you wanna talk!
        <div class="flex space-x-4 my-5 text-green-500">
          <NuxtLink to="https://www.instagram.com/kimjchi/" target="_blank">
            <i class="ph-fill ph-instagram-logo cursor-pointer opacity-80 hover:opacity-100 text-5xl"></i>
          </NuxtLink>
          <NuxtLink to="https://www.linkedin.com/in/jérémy-v-kim" target="_blank">
            <i class="ph-fill ph-linkedin-logo cursor-pointer opacity-80 hover:opacity-100 text-5xl"></i>
          </NuxtLink>
          <NuxtLink to="https://github.com/Kimjchi" target="_blank">
            <i class="ph-fill ph-github-logo cursor-pointer opacity-80 hover:opacity-100 text-5xl"></i>
          </NuxtLink>
        </div>
        Check out my other websites while you are at it:
        <div class="flex flex-col space-y-2 mt-5">
          <NuxtLink
            href="https://portfolio.jeremykim.fr/"
            target="_blank"
            class="text-green-500 flex"
            ><i class="ph ph-binary text-4xl mr-2"></i> Developer portfolio</NuxtLink
          >
          <NuxtLink
            href="https://www.obangsaek.fr/"
            target="_blank"
            class="text-green-500 flex"
            ><i class="ph ph-pen-nib text-4xl mr-2"></i> A blog I made for a
            friend</NuxtLink
          >
          <NuxtLink
            href="http://gallery.jeremykim.fr/drawings"
            target="_blank"
            class="text-green-500 flex"
            ><i class="ph ph-palette text-4xl mr-2"></i> A place where I put my
            drawings</NuxtLink
          >
        </div>
      </div>
    </div>
    <div class="sm:w-1/2 px-10 py-16 mb-2 sm:mb-0 overflow-hidden h-full">
      <NuxtImg
        :src="`${runtimeConfig.public.strapiUrl}/uploads/Photo_de_Google_06d13f87b2.jpg`"
        alt="profile"
        class="rounded-lg object-cover h-full"
      />
      <div class="text-white font-teko mt-1 ml-3">Ciao</div>
    </div>
  </div>
  <div class="text-white font-teko text-center my-5 md:mb-3">
    Copyright © 2024 All rights reserved.
  </div>
</div>
</template>
