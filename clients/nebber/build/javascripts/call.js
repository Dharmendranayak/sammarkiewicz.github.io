
$('#m-link--scrollTo').smoothScroll({
  easing: 'swing',
  speed: 1200
});

$('#m-box--panel-1').parallax("bottom", 0.1, true);
$('#m-box--panel-2').parallax("bottom", 0.4, true);

skrollr.init({
  forceHeight: false,
  easing: 'sqrt'
});

$('.m-box--message').innerfade({
  speed: 'slow',
  timeout: 4000,
  type: 'random',
  containerheight: '50px'
});

