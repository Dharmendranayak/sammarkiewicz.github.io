// Initialize Skrollr

skrollr.init({
  forceHeight: false,
  easing: 'sqrt'
});

// Initialize smoothscroll

$('.m-list--main-nav a').smoothScroll({
  speed: 1000
});

window.addEventListener('DOMContentLoaded', function() {
  $("body").queryLoader2({
    backgroundColor: "#fff",
    barColor: "#222",
    barHeight: 2,
    completeAnimation: "fade",
    percentage: true
  });
});
