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
  showMainMenu.to("html", { "--navbar--text": "#131936" }, "<");
  showMainMenu.from(menuWrap, { y: "-100%", opacity: 0 }, "<");
  showMainMenu.to(ring, { rotate: 90 }, "<");

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

///// COLLAGE PHOTO ANIMATION CHATGPT
// document.querySelectorAll(".grid_item").forEach((layer, i) => {
//   const velocity = 10 + i * 10; // Example: Adjust velocity dynamically
//   const startOffset = "100%"; // Amount (in pixels) to offset downward at start

//   gsap.fromTo(
//     layer,
//     { y: startOffset }, // Start the layer slightly lower
//     {
//       y: () => `-${window.innerHeight * velocity - startOffset}px`, // Final position with velocity
//       ease: "none",
//       scrollTrigger: {
//         trigger: ".pic-collage_component",
//         start: "top bottom",
//         end: "bottom top",
//         scrub: true,
//       },
//     }
//   );
// });

//////SVG FILTERS RICKS https://www.youtube.com/watch?v=JK7tXtFhfTU&t=304s

// GIVE UNIQUE IDS TO EACH FILTER
// $(".svg-filter").each(function (index) {
//   $(this)
//     .parent()
//     .attr("style", "filter: url(#svg-filter-" + index + ");");
//   $(this)
//     .find("filter")
//     .attr("id", "svg-filter-" + index);
// });

// ANIMATE HEADING ON LOAD
// $(".heading-wrap").each(function (index) {
//   let svg = $(this).find(".svg-filter");

//   let tl = gsap.timeline({
//     defaults: {
//       duration: 1,
//       ease: "power1.out",
//     },
//   });
//   tl.fromTo(
//     svg.find("[stdDeviation]"),
//     { attr: { stdDeviation: 100 } },
//     { attr: { stdDeviation: 0 } }
//   );
// });

// ANIMATE IMAGES ON SCROLL WITH SCRUB
// $(".image-wrap").each(function (index) {
//   let svg = $(this).find(".svg-filter");

//   let tl = gsap.timeline({
//     scrollTrigger: {
//       trigger: $(this),
//       start: "top bottom",
//       end: "top 40%",
//       scrub: true,
//     },
//   });
//   tl.fromTo(
//     svg.find("[scale]"),
//     { attr: { scale: 300 } },
//     { attr: { scale: 0 } }
//   );
// });

// // ANIMATE IMAGES ON SCROLL WITH TOGGLE ACTIONS
// $(".image-wrap").each(function (index) {
//   let svg = $(this).find(".svg-filter");

//   let tl = gsap.timeline({
//     scrollTrigger: {
//       trigger: $(this),
//       start: "top bottom",
//       end: "top 80%",
//       toggleActions: "none play none reset",
//     },
//   });
//   tl.fromTo(
//     svg.find("[scale]"),
//     { attr: { scale: 1000 } },
//     { attr: { scale: 0 }, duration: 0.6 }
//   );
// });

/////////// FOG ANIMATION
// Select all fog layers across all containers
document.querySelectorAll(".fog-layer").forEach((layer) => {
  // Randomize speed for each fog layer
  const speed = 120 + Math.random() * 60; // Between 5s and 15s
  const startX = Math.random() * 100 - 50; // Random starting X position (-50% to +50%)
  const moveLeft = Math.random() > 0.5; // Randomly decide direction

  // Set the initial random X position
  gsap.set(layer, { x: `${startX}%` });

  // Animate each layer independently
  gsap.to(layer, {
    x: moveLeft ? "-100%" : "100%", // Move left or right based on random choice
    ease: "none", // Linear motion for seamless looping
    duration: speed, // Unique duration for each layer
    repeat: -1, // Infinite looping
  });
});
