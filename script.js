//alert("it works");

/////////// MENU ANIMATIONS
window.addEventListener("DOMContentLoaded", (event) => {
  let navButton = $(".nav_btn");
  let menuWrap = $(".menu_wrap");
  let lines = $(".nav_btn_line");
  let ring = $(".btn-ring_finger");

  let showMainMenu = gsap.timeline({
    paused: true,
    defaults: { duration: 1.3, ease: "power3.inOut" },
    onReverseComplete: () => {
      navButton.attr("aria-label", "Open Main Menu");
    },
    onComplete: () => {
      menuWrap.find("button").first().focus();
      navButton.attr("aria-label", "Close Main Menu");
    },
  });
  showMainMenu.set(menuWrap, { display: "block" });
  showMainMenu.from(menuWrap, { y: "-100%", opacity: 0 }, "<");
  showMainMenu.to(ring, { rotate: 90 }, "<");
  // change navbar color only on mobile
  if (window.matchMedia("(max-width: 767px)").matches) {
    showMainMenu.to(
      "html",
      { "--elements-color--navbar-top-elements": "#d4d0cc" },
      "<"
    );
  }

  navButton.on("click", function () {
    if (showMainMenu.progress() === 0) {
      showMainMenu.play();
    } else {
      showMainMenu.reverse();
      navButton.attr("aria-label", "Open Main Menu");
    }
  });

  menuBackground.on("click", function () {
    showMainMenu.reverse();
  });
  $(document).on("keydown", function (e) {
    if (e.key === "Escape") showMainMenu.reverse();
  });
});

/////////GRID IMAGES PARALLAX
gsap.registerPlugin(ScrollTrigger);

// ScrollTrigger.defaults({
//   markers: false,
// });

// Grid Image Move 1
$(".grid_item:nth-child(3n+1)").each(function (index) {
  let triggerElement = $(this);
  let targetElement = $(this);

  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: triggerElement,
      // trigger element - viewport
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
    },
  });
  tl.to(targetElement, {
    y: "-30%",
    duration: 1,
  });
});

// Grid Image Move 2
$(".grid_item:nth-child(3n+2)").each(function (index) {
  let triggerElement = $(this);
  let targetElement = $(this);

  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: triggerElement,
      // trigger element - viewport
      start: "top bottom",
      end: "bottom top",
      scrub: 2,
    },
  });
  tl.to(targetElement, {
    y: "-50%",
    duration: 1,
  });
});

// Grid Image Move 3
$(".grid_item:nth-child(3n+3)").each(function (index) {
  let triggerElement = $(this);
  let targetElement = $(this);

  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: triggerElement,
      // trigger element - viewport
      start: "top bottom",
      end: "bottom top",
      scrub: 1.5,
    },
  });
  tl.to(targetElement, {
    y: "-70%",
    duration: 1,
  });
});

////// Collections page, hover funcionality

$(document).ready(function () {
  // Activate the first item on page load
  function activateFirstItem() {
    const $firstNameItem = $(".collections-names_item").first();
    const $firstImgItem = $(".collections-img_item").first();
    const $firstCoverImg = $(".collection-cover-img").first();

    $firstNameItem.addClass("active");
    $firstImgItem.addClass("active");
    $firstCoverImg.addClass("active");

    //gsap.to($firstNameItem, { opacity: 1 });
    gsap.to($firstNameItem.find(".collection-name_line"), { width: "2rem" });
    //gsap.to($firstImgItem.find(".collection-img"), { scale: 1.1 });
    //gsap.to($firstImgItem.find(".collection-img"), { opacity: 1 });
  }

  activateFirstItem();

  // Hover functionality
  $(".collections-names_item").hover(
    function () {
      const $this = $(this);
      const order = $this.attr("order");

      // Remove active states
      $(".collections-names_item").removeClass("active");
      $(".collections-img_item").removeClass("active");
      $(".collection-cover-img").removeClass("active");
      //gsap.to(".collections-names_item", { opacity: 0.6 });
      gsap.to(".collection-name_line", { width: "0" });
      //gsap.to(".collection-img", { scale: 1 });
      //gsap.to(".collection-cover-img", {opacity: 0})

      // Add active states to hovered items
      $this.addClass("active");
      const $matchingImg = $(`.collections-img_item[order="${order}"]`);
      $matchingImg.addClass("active");
      const $matchingCoverImg = $(`.collection-cover-img[order="${order}"]`);
      $matchingCoverImg.addClass("active");

      // Animate the hover effects
      //gsap.to($this, { opacity: 1 });
      gsap.to($this.find(".collection-name_line"), { width: "2rem" });
    },
    function () {
      // Optionally handle hover-out logic
    }
  );
});

/////// SWIPER
//Slider product page
$(".product-gallery_component").each(function (index) {
  const swiper = new Swiper($(this).find(".swiper")[0], {
    slidesPerView: 1.15,
    spaceBetween: 6,
    speed: 500,
    centerInsufficientSlides: true,
    grabCursor: true,
    //loop: true,
    watchOverflow: true,
    // autoplay: {
    //   delay: 6000,
    //   disableOnInteraction: false,
    // },
    breakpoints: {
      // when it gets bigger than 478px
      478: {
        slidesPerView: 1,
        spaceBetween: 6,
      },
      // when it gets bigger than 991px
      768: {
        loop: true,
        slidesPerView: 2,
        spaceBetween: 6,
      },
      // when it gets bigger than 991px
      991: {
        slidesPerView: 3,
        spaceBetween: 6,
      },
    },
    // pagination: {
    //   el: $(this).find(".swiper-bullet-wrapper")[0],
    //   bulletActiveClass: "is-active",
    //   bulletClass: "swiper-bullet",
    //   bulletElement: "div",
    //   clickable: true,
    // },
    // navigation: {
    //   nextEl: $(this).find(".swiper-next")[0],
    //   prevEl: $(this).find(".swiper-prev")[0],
    //   disabledClass: "is-disabled",
    // },
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const topEl = document.querySelector(".is-top-swiper");
  const bottomEl = document.querySelector(".is-bottom-swiper");

  if (!topEl || !bottomEl) {
    console.warn("Swiper elements not found!");
    return;
  }

  // Bottom Swiper
  const bottomSwiper = new Swiper(bottomEl, {
    slidesPerView: 1,
    speed: 500,
    centerSlides: true,
    loop: true,
    //loopAdditionalSlides: 2,
    //watchOverflow: true,
    breakpoints: {
      768: {
        //slidesPerView: "auto",
        slidesPerView: "auto",
        //slideToClickedSlide: true,
        //centerSlides: true,
        //loopAdditionalSlides: 2,
        loop: false,
      },
    },
  });

  // Collection slide element animations. CSS on collections page
  document.querySelectorAll("[collection-animate]").forEach((group) => {
    Array.from(group.children).forEach((el, i) => {
      el.style.setProperty("--delay", `${i * 0.05}s`);
    });
  });

  // Top Swiper
  const topSwiper = new Swiper(topEl, {
    slidesPerView: 1,
    speed: 500,
    //centerInsufficientSlides: true,
    slideToClickedSlide: false,
    loop: true,
    //watchOverflow: true,
    navigation: {
      nextEl: ".swiper-next",
      prevEl: ".swiper-prev",
    },
    breakpoints: {
      768: {
        //slidesPerView: "auto",
        speed: 1200,
        slidesPerView: 1,
        // slidesPerGroup: 3,
        slideToClickedSlide: true,
        centerSlides: true,
        //loopAdditionalSlides: 2,
        loop: false,
      },
    },
  });

  // document
  //   .querySelectorAll(".is-top-swiper.swiper-slide")
  //   .forEach((slide, index) => {
  //     slide.addEventListener("click", () => {
  //       topSwiper.slideToLoop(index);
  //     });
  //   });

  // Link sliders
  topSwiper.controller.control = bottomSwiper;
  bottomSwiper.controller.control = topSwiper;

  // Add hover & click behavior
  // document
  //   .querySelectorAll(".is-top-swiper .swiper-slide")
  //   .forEach((slide, index) => {
  //     const goToSlide = () => {
  //       console.log("Trying to go to slide:", index);
  //       if (topSwiper.params.loop && window.innerWidth < 768) {
  //         topSwiper.slideToLoop(index);
  //       } else {
  //         topSwiper.slideTo(index);
  //       }
  //     };

  //     if (window.innerWidth >= 768) {
  //       slide.addEventListener("mouseenter", goToSlide);
  //     }

  //     slide.addEventListener("click", goToSlide);
  //   });
});
