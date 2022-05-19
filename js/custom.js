AOS.init({
    once: true
});
$(window).scroll(function () {
    var scroll = $(window).scrollTop();
    if (scroll >= 100) {
        $("header").addClass("scroll");
    } else {
        $("header").removeClass("scroll");
    }
});
$(document).ready(function(){
    var url = window.location.pathname;
    var filename = url.substring(url.lastIndexOf('/')+1);
    if (filename == "") {
        filename = "index.php"
    }
    $(".nav-item .nav-link").removeClass("active");
    $(`.nav-item .nav-link[href="${filename}"]`).addClass("active")
})