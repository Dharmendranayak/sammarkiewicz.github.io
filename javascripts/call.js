/*var navTop = $('#header').offset().top;
$(window).scroll(function () {
    var navY = $(this).scrollTop();
    if (navY >= navTop) {
        $('#header').addClass('locked')
    } else {
        $('#header').removeClass('locked')
    }
});*/


$("#main").waypoint(function(event, direction){
  if (direction == "down") {
    $("#header-scroll").stop().fadeIn();
  }
  else if (direction == "up") {
    $("#header-scroll").stop().fadeOut();
  }
});


$('.flexslider').flexslider({
  controlNav: false,
  slideshow: false
});

$('.m-box-more-about').on('click', function(){
  $(this).find('div').fadeToggle();
});

var $title = $('.m-box-more-about h4');
$title.click(function(){
  $(this).toggleClass('selected');
});

$('.m-link--open-bio').on('click', function(){
  $('.m-content-for-bio--wrap').slideDown();
  return false;
});

$('.m-link--open-bio-scroll').on('click', function(){
  $('.m-content-for-bio--wrap').slideDown();
});

$('.l-button--close').on('click', function(){
  $('.m-content-for-bio--wrap').slideUp();
  return false;
});

$(window).resize(function() {
  var width = $(window).width();
  var bio = $('.m-content-for-bio--wrap');
  var presentation = $('.m-box-presentation');
  if (width < 568) {
    bio.detach();
    bio.insertAfter('.m-box-presentation');
  }
  else {
    bio.prependTo('body');
  }
}).resize();


