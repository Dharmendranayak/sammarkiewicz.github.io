$('nav').on('click', 'a', function(){
  $('.m-box--work-container').removeClass('hidePanel');
  $('.m-box--work-container').addClass('showPanel');
});

$('body').on('click', 'a#close', function(){
  $('.m-box--work-container').addClass('hidePanel');
  $('.m-box--work-container').removeClass('showPanel');
});
