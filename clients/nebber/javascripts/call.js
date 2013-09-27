// Initialize Skrollr

skrollr.init({
  forceHeight: false,
  easing: 'sqrt'
});

// Initialize smoothscroll

$('.m-list--main-nav a').smoothScroll({
  speed: 1000
});

$('.m-link--scrollTo').smoothScroll({
  speed: 1000
});


var loadBalloon = $('<div class="m-element--ballon-load" />')

$('#qLoverlay').append(loadBalloon)

window.addEventListener('DOMContentLoaded', function() {
  $("body").queryLoader2({
    backgroundColor: "#fff",
    barColor: "#222",
    barHeight: 2,
    completeAnimation: "fade",
    percentage: true
  });
});
