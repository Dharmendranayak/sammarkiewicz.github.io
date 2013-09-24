// Initialize Skrollr
skrollr.init({forceHeight:!1,easing:"sqrt"});$(".m-list--main-nav a").smoothScroll({speed:1e3});$(document).scroll(function(){console.log($(document).scrollTop())});