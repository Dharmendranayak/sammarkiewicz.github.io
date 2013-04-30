// Reading - Allow you to focus on content

var sections = $('[role="main"]').find('section')
var wholeSite = $('body').find('[role="banner"], nav, footer, article > aside')
sections.on('mouseenter', function() {
  $(this).addClass('reading');
  $(wholeSite).not('.reading').addClass('fader');
  $('aside.fader').fadeOut();
});
sections.on('mouseleave', function() {
  $(this).removeClass('reading');
  $(wholeSite).not('.reading').removeClass('fader');
  $('aside').fadeIn();
});

// Sticky nav

var navTop = $('nav').offset().top;
$(window).scroll(function () {
    var navY = $(this).scrollTop();
    if (navY >= navTop) {
        $('nav').addClass('locked')
    } else {
        $('nav').removeClass('locked')
    }
});

// Remove p around img for Tumblr

var imgSection = $('section').find('img')
imgSection.closest('p > *').unwrap();


// Back to top

$('.back-to-top').click(function () {
  $('body,html').animate({
    scrollTop: 0
  }, 800);
  return false;
});

// Find all YouTube videos
var $allVideos = $("iframe[src^='http://player.vimeo.com'], iframe[src^='http://www.youtube.com'], , iframe[src^='http://embed.ted.com']"),

    // The element that is fluid width
    $fluidEl = $(".text");

// Figure out and save aspect ratio for each video
$allVideos.each(function() {

  $(this)
    .data('aspectRatio', this.height / this.width)

    // and remove the hard coded width/height
    .removeAttr('height')
    .removeAttr('width');

});

// When the window is resized
$(window).resize(function() {

  var newWidth = $fluidEl.width();

  // Resize all videos according to their own aspect ratio
  $allVideos.each(function() {

    var $el = $(this);
    $el
      .width(newWidth)
      .height(newWidth * $el.data('aspectRatio'));

  });

// Kick off one resize to fix all videos on page load
}).resize();
