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

/////////// FOG ANIMATION
// // Select all fog layers across all containers
// document.querySelectorAll(".fog-layer").forEach((layer) => {
//   // Randomize speed for each fog layer
//   const speed = 120 + Math.random() * 60; // Between 5s and 15s
//   const startX = Math.random() * 100 - 50; // Random starting X position (-50% to +50%)
//   const moveLeft = Math.random() > 0.5; // Randomly decide direction

//   // Set the initial random X position
//   gsap.set(layer, { x: `${startX}%` });

//   // Animate each layer independently
//   gsap.to(layer, {
//     x: moveLeft ? "-100%" : "100%", // Move left or right based on random choice
//     ease: "none", // Linear motion for seamless looping
//     duration: speed, // Unique duration for each layer
//     repeat: -1, // Infinite looping
//   });
// });

//////// COLLECTIONS TABS
// Function to activate the first item on page load
// function activateFirstItem() {
//   const imgItems = Array.from(
//     document.querySelectorAll(".collections-img_item")
//   );
//   const firstItem = imgItems.reduce((prev, current) => {
//     const prevOrder = parseInt(prev.getAttribute("order"), 10);
//     const currentOrder = parseInt(current.getAttribute("order"), 10);
//     return prevOrder < currentOrder ? prev : current;
//   });

//   if (firstItem) firstItem.classList.add("active");
// }

// // Add hover functionality for tabs
// document.querySelectorAll(".collections-names_item").forEach((nameItem) => {
//   nameItem.addEventListener("mouseenter", () => {
//     const order = nameItem.getAttribute("order");
//     const imgItems = document.querySelectorAll(".collections-img_item");

//     // Hide all images
//     imgItems.forEach((imgItem) => imgItem.classList.remove("active"));

//     // Show the corresponding image
//     const matchingImg = document.querySelector(
//       `.collections-img_item[order="${order}"]`
//     );
//     if (matchingImg) matchingImg.classList.add("active");
//   });
// });

// // Activate the first item on page load
// activateFirstItem();

$(document).ready(function () {
  // Activate the first item on page load
  function activateFirstItem() {
    const $firstNameItem = $(".collections-names_item").first();
    const $firstImgItem = $(".collections-img_item").first();

    $firstNameItem.addClass("active");
    $firstImgItem.addClass("active");

    gsap.to($firstNameItem, { opacity: 1 });
    gsap.to($firstNameItem.find(".collection-name_line"), { width: "2rem" });
    gsap.to($firstImgItem.find(".collection-img"), { scale: 1.1 });
    gsap.to($firstImgItem.find(".collection-img"), { opacity: 1 });
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
      gsap.to(".collections-names_item", { opacity: 0.6 });
      gsap.to(".collection-name_line", { width: "0" });
      gsap.to(".collection-img", { scale: 1 });

      // Add active states to hovered items
      $this.addClass("active");
      const $matchingImg = $(`.collections-img_item[order="${order}"]`);
      $matchingImg.addClass("active");

      // Animate the hover effects
      gsap.to($this, { opacity: 1 });
      gsap.to($this.find(".collection-name_line"), { width: "2rem" });
      gsap.to($matchingImg.find(".collection-img"), {
        opacity: 1,
        duration: 0.3,
      });
      gsap.to($matchingImg.find(".collection-img"), {
        scale: 1.1,
        duration: 2,
      });
    },
    function () {
      // Optionally handle hover-out logic
    }
  );
});
