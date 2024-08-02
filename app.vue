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
let photosHeight = 0;
let photoMaxHeight = Infinity;
let isSmallScreen = ref(false)
let numberOfSquares = ref(20);
let autoScroll = ref<gsap.core.Tween>();
let goToSection: (y?: number | "max") => void;

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
  isSmallScreen.value = window.innerWidth < 640;
  let padding = isSmallScreen.value ? 0 : 160;

  photosWidth = sections.reduce(
    (acc, section) => {
      return acc + section.clientWidth + 16;
    },
    padding - 8,
  );

  photosHeight = sections.reduce(
    (acc, section) => {
      return acc + section.clientHeight + 20;
    },
    padding,
  );

  photoMaxHeight = sections.map((section) => section.clientHeight).reduce((a, b) => Math.min(a, b), Infinity);
  numberOfSquares.value = isSmallScreen.value ? Math.floor(photosHeight / 64) : Math.floor(photosWidth / 64) // - 1;

  if (isSmallScreen.value) return;

  gsap.to([...sections, ...wrapper, ".end"], {
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

  goToSection = (y: number | "max" = window.innerHeight) => {
    scrollTween = gsap.to(window, {
      scrollTo: { y, autoKill: false },
      onStart: () => {
        //observer.disable(); // for touch devices, as soon as we start forcing scroll it should stop any current touch-scrolling, so we just disable() and enable() the normalizeScroll observer
        //observer.enable();
      },
      duration: 1,
      onComplete: () => {
        scrollTween = null;
        if (y != 0 && !autoScroll.value) {
          setupAutoScroll();
        }
      },
      overwrite: true,
    });
  };

  ScrollTrigger.create({
    trigger: ".title-section",
    start: "top bottom",
    onToggle: (self) => {
      self.isActive && !scrollTween && goToSection(0);
    },
  });

  ScrollTrigger.create({
    trigger: ".photos-container",
    start: "top bottom",
    onToggle: (self) => {
      self.isActive && !scrollTween && goToSection();
    },
  });

  ScrollTrigger.create({
    trigger: "#about",
    start: "top bottom",
    onToggle: (self) => {
      self.isActive && !scrollTween && goToSection("max");
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
  if (data.value?.data.length || 0 + 1 === imageLoaded) {
    setupAnimation();
  }
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
  <TitleSection :set-ready />
  <div class="sm:h-screen w-screen negative">
    <div
      v-if="status === 'success'"
      class="sm:h-screen w-screen overflow-x-hidden overflow-y-clip whitespace-nowrap photos-container flex sm:flex-col"
    >
      <div class="flex-grow sm:h-20 relative">
        <div class="sm:absolute sm:bottom-0 sm:space-x-10 space-y-10 wrapper flex flex-col sm:flex-row items-end ml-5 sm:ml-0">
          <div
            v-for="index in numberOfSquares"
            :key="'topSquare-' + index"
            class="sm:h-9 h-6 bg-white sm:inline-block sm:w-6 w-9 rounded-md"
          ></div>
          <!-- Don't forget to recalculate numberOfSquares <div
            class="h-full bg-white inline-block w-40"
            style="margin-left: 30px"
          ></div> -->
        </div>
      </div>
      <div class="sm:max-h-[calc(100%-10rem)] w-full sm:pl-40 relative">
        <Sidebar
          :auto-scroll-active="autoScroll?.isActive()"
          :setup-auto-scroll
          :go-to-section="goToSection"
          :height="photoMaxHeight"
        />
        <div
          v-for="photo in data?.data"
          :key="photo.id"
          class="sm:inline-block photo sm:mx-2 sm:my-0 my-5 max-h-full"          
        >
          <NuxtImg
            :src="
              runtimeConfig.public.strapiUrl +
              photo.attributes.photo.data.attributes.url
            "
            alt="photo"
            class="max-h-full rounded-sm w-auto"
            @load="onImgLoad"
            loading="lazy"
            :style="!isSmallScreen && {height: photoMaxHeight + 'px'}"
          />
        </div>
        <div class="sm:inline-block photo max-h-full sm:ml-2 sm:mt-0 mt-5">
          <NuxtImg
            :src="`${runtimeConfig.public.strapiUrl}/uploads/IMG_8138_bf429b1af1.JPG`"
            alt="photo"
            class="max-h-full rounded-sm w-auto"
            @load="onImgLoad"
            :style="!isSmallScreen && {height: photoMaxHeight + 'px'}"
            loading="lazy"
          />
        </div>
        <!-- <div class="inline-block bg-white w-10 end h-full relative -ml-3">
          <div class="h-screen absolute w-full"></div>
        </div> -->
      </div>
      <div class="flex-grow sm:h-20 relative">
        <div class="sm:absolute sm:top-0 sm:space-x-10 sm:space-y-0 space-y-10 wrapper flex flex-col sm:flex-row items-start mr-5 sm:mr-0">
          <div
            v-for="index in numberOfSquares"
            :key="'topSquare-' + index"
            class="sm:h-9 h-6 bg-white sm:inline-block sm:w-6 w-9 rounded-md"
          ></div>
          <!-- <div
            class="h-full bg-white inline-block w-40"
            style="margin-left: -5px"
          ></div> -->
        </div>
      </div>
    </div>
  </div>
  <About />
</template>
