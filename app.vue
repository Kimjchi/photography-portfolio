<script setup lang="ts">
import {gsap} from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { ref } from 'vue'


const runtimeConfig = useRuntimeConfig();

interface Formats {
  thumbnail: {
    url: string;
  };
  small: {
    url: string;
  };
  medium: {
    url: string;
  };
  large: {
    url: string;
  };
}

interface Photo {
  id: number;
  attributes: {
    title: string;
    description: string;
    photo: {
      data: {
        id: number;
        attributes: {
          formats: Formats;
          url: string;
        };
      };
    };
  };
}

interface PhotoResponse {
  data: Photo[];
}

const { data, status } = await useFetch<PhotoResponse>( 
  '/api/photos',   
);

gsap.registerPlugin(ScrollTrigger);
let imageLoaded = 0; 
let photosWidth = 0;
let numberOfSquares = ref(10)

function setupAnimation() { 
  ScrollTrigger.killAll();
  let sections = gsap.utils.toArray<Element>(".photo");
    let wrapper = gsap.utils.toArray<Element>(".wrapper");

    photosWidth = sections.reduce((acc, section, i) => {
      return acc + section.clientWidth + 16 ;
    }, 0 ) ;

    gsap.to([...sections, ...wrapper], {
    x: "-=" + ( photosWidth - window.innerWidth) ,
    ease: "none", // <-- IMPORTANT!
    scrollTrigger: {
      trigger: ".negative",
      pin: true,
      pinSpacing: true,
      scrub: 0.5,
      //snap: directionalSnap(1 / (sections.length - 1)),
      end: "+=" + photosWidth ,
    }
  });
  
}

function onImgLoad () {
  imageLoaded++
  if (data.value?.data.length === imageLoaded) {
    setupAnimation();
  }
  numberOfSquares.value = Math.floor((photosWidth / 24) / 2);
}

onMounted(() => {
  window.addEventListener("resize", setupAnimation);
})

onUnmounted(() => {
  window.removeEventListener("resize", setupAnimation);
})


</script>


<template>
  <div class="h-screen w-screen bg-black negative">
    <div
      v-if="status === 'success'"
      class="h-full overflow-x-hidden overflow-y-clip whitespace-nowrap"
    >
      <div class="h-20 relative">
        <div class="absolute bottom-0 space-x-10 wrapper">
          <div
          v-for="index in numberOfSquares"
          :key="'topSquare-' + index"
          class="h-9 bg-white inline-block w-6"
          ></div>
        </div>
      </div>
      <div
        v-for="photo in data?.data"
        :key="photo.id"
        class="inline-block photo h-[calc(100%-10rem)] mx-2"
      >
        <NuxtImg
          :src="
            runtimeConfig.public.strapiUrl +
            photo.attributes.photo.data.attributes.url
          "
          alt="photo"
          class="h-full"
          @load="onImgLoad"
          loading="lazy"
        />
      </div>
      <div class="h-20 relative">
        <div class="absolute top-0 space-x-10 wrapper">
          <div
          v-for="index in numberOfSquares"
          :key="'topSquare-' + index"
          class="h-9 bg-white inline-block w-6"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>
