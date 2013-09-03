$('.start').on('click',function (e) {
  e.preventDefault();

  var target = this.hash,
  $target = $(target);

  var $body = $('html, body')
  var $pause = $('.pause')
  var $resume = $('.resume')
  var $back = $('.back')

  $body.stop().animate({
      'scrollTop': $target.offset().top
  }, 90000, 'swing', function () {
      window.location.hash = target;
  });

  $pause.on('click', function(){
    $body.pause();
    $(this).fadeOut();
    $resume.fadeIn();
    return false;
  });

  $resume.on('click', function(){
    $body.resume();
    $(this).fadeOut();
    $pause.fadeIn();
    return false;
  });

  $back.on('click', function(){
    location.relaod(true);
  });


});

// $('.info').on('mouseenter', function(){
//   var data = $(this).attr("data-info");
//   var infoReveal = $('<div id="infoReveal" />')

//   infoReveal.appendTo('#infoBar');
//   infoReveal.html(data);
//   $('#infoBar').stop().fadeIn();

// });

// $('.info').on('mouseleave', function(){
//   var data = $(this).attr("data-info");
//   $("#infoReveal").remove();
//   $('#infoBar').stop().fadeOut();
// })



$('.info').on('mouseenter', function(){
  var infoBoxContent = $(this).attr("data-info");
  var infoClass = $(this).attr('data-class');
  var infoBox = $('<div>').append(infoBoxContent).addClass('infoReveal');
  infoBox.appendTo('#infoBar');
  $("#infoBar").addClass(infoClass);
});
$('.info').on('mouseleave', function(){
  var infoClass = $(this).attr('data-class');
  $("#infoBar").removeClass(infoClass);
  $('.infoReveal').remove();
});


