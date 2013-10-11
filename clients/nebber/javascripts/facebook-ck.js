function fb_like() {
    url = location.href;
    title = document.title;
    window.open("http://www.facebook.com/sharer.php?u=" + encodeURIComponent(url) + "&t=" + encodeURIComponent(title), "sharer", "toolbar=0,status=0,width=626,height=436");
    return !1;
};