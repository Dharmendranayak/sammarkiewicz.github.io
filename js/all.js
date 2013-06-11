
skrollr.init({
  forceHeight: false
});
$('header a').smoothScroll({
  speed: 1300
});
// var infoBox = $('<div>').append(infoBoxContent).addClass('dialog');
// infoBox.addClass('dialog');
$('.icon').on('mouseenter', function(){
  var infoBoxContent = $(this).text();
  var infoBox = $('<div>').append(infoBoxContent).addClass('dialog');
  infoBox.appendTo('.m-box--container')
});
$('.icon').on('mouseleave', function(){
  $('.dialog').remove();
});
if (!cookieGet('tips')) {
   window.onload = function(){
    $('.tips').fadeIn().delay(15000).fadeOut();
  };
  cookieSet('tips', 1, 3600, '/');
}
$('#show-tips').on('click', function(){
  $('.tips').fadeIn().delay(15000).fadeOut();
  return false;
})
$('#close').on('click', function(){
  $('.tips').hide().stop();
  return false;
});
// Mousetrap.bind('up up down down left right left right e r enter', function() {

// });

$(document).konami({
  code: ['up', 'up', 'down', 'down', 'left', 'right', 'left', 'right', 'b', 'a', 'enter'],
  callback: function() {
    $('.clothes').hide();
    $('#body').addClass('bonus')
  }
});
