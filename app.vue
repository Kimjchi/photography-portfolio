<script setup lang="ts">
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ref } from "vue";

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

const { data, status } = await useFetch<PhotoResponse>("/api/photos");

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

let imageLoaded = 0;
let photosWidth = 0;
let numberOfSquares = ref(20);
let autoScroll = ref<gsap.core.Tween>();

function setReady() {
  setTimeout(() => {
    gsap.to(".loader", {
      opacity: 0,
      duration: 1,
      onComplete: () => {
        gsap.set(".loader", { display: "none" });
      },
    });
  }, 500);
}

function setupAnimation() {
  ScrollTrigger.killAll();
  let sections = gsap.utils.toArray<Element>(".photo");
  let wrapper = gsap.utils.toArray<Element>(".wrapper");

  photosWidth = sections.reduce((acc, section, i) => {
    return acc + section.clientWidth + 16;
  }, 160);

  gsap.to([...sections, ...wrapper], {
    x: "-=" + (photosWidth - window.innerWidth),
    ease: "none", // <-- IMPORTANT!
    scrollTrigger: {
      trigger: ".negative",
      pin: true,
      pinSpacing: true,
      scrub: 0.5,
      //snap: directionalSnap(1 / (sections.length - 1)),
      end: "+=" + photosWidth,
    },
  });

  let observer = ScrollTrigger.normalizeScroll(true);
  let scrollTween: gsap.core.Tween | null = null;

  function goToSection(back = false) {
    scrollTween = gsap.to(window, {
      scrollTo: { y: back ? 0 : innerHeight, autoKill: false },
      onStart: () => {
        //observer.disable(); // for touch devices, as soon as we start forcing scroll it should stop any current touch-scrolling, so we just disable() and enable() the normalizeScroll observer
        //observer.enable();
      },
      duration: 1,
      onComplete: () => {
        scrollTween = null;
        if (!back) setupAutoScroll();
      },
      overwrite: true,
    });
  }
  ScrollTrigger.create({
    trigger: ".title-section",
    start: "top bottom",
    onToggle: (self) => {
      self.isActive && !scrollTween && goToSection(true);
    },
  });

  ScrollTrigger.create({
    trigger: ".photos-container",
    start: "top bottom",
    onToggle: (self) => {
      self.isActive && !scrollTween && goToSection();
    },
  });
}

function setupAutoScroll() {
  let moveDirection: string | number = "max";
  autoScroll.value?.kill();
  autoScroll.value = gsap.to(window, {
    duration: 50, // TODO Calculate duration based on the number of photos left in current scroll position and their width
    scrollTo: { y: moveDirection },
    ease: "none",
  });

  ScrollTrigger.observe({
    type: "wheel,scroll",
    onWheel: (self) => {
      autoScroll.value?.kill();
      self.kill();
    },
  });
}

function onImgLoad() {
  imageLoaded++;
  if (data.value?.data.length === imageLoaded) {
    setupAnimation();
  }
  numberOfSquares.value = Math.floor(photosWidth / 24 / 2);
}

onMounted(() => {
  window.addEventListener("resize", setupAnimation);
});

onUnmounted(() => {
  window.removeEventListener("resize", setupAnimation);
});
</script>

<template>
  <Loader class="loader" />
  <TittleSection :set-ready />
  <div class="h-screen w-screen negative">
    <div
      v-if="status === 'success'"
      class="h-full overflow-x-hidden overflow-y-clip whitespace-nowrap photos-container"
    >
      <div class="h-20 relative">
        <div class="absolute bottom-0 space-x-10 wrapper">
          <div
            v-for="index in numberOfSquares"
            :key="'topSquare-' + index"
            class="h-9 bg-white inline-block w-6 rounded-md"
          ></div>
        </div>
      </div>
      <div class="h-[calc(100%-10rem)] pl-40">
        <Sidebar
          :auto-scroll-active="autoScroll?.isActive()"
          :setup-auto-scroll
        />
        <div
          v-for="photo in data?.data"
          :key="photo.id"
          class="inline-block photo h-full mx-2"
        >
          <NuxtImg
            :src="
              runtimeConfig.public.strapiUrl +
              photo.attributes.photo.data.attributes.url
            "
            alt="photo"
            class="h-full rounded-sm"
            @load="onImgLoad"
            loading="lazy"
          />
        </div>
      </div>
      <div class="h-20 relative">
        <div class="absolute top-0 space-x-10 wrapper">
          <div
            v-for="index in numberOfSquares"
            :key="'topSquare-' + index"
            class="h-9 bg-white inline-block w-6 rounded-md"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>
