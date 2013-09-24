// Initialize Skrollr

skrollr.init({
  forceHeight: false,
  easing: 'sqrt'
});

// Initialize smoothscroll

$('.m-list--main-nav a').smoothScroll({
  speed: 1000
});

$(document).scroll(function() {
    console.log($(document).scrollTop());
})
