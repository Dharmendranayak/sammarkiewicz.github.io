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
imgSection.unwrap('p');
