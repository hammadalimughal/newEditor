// AOS.init({
//     once: true
// });


// header scroll add scroll class
$(window).scroll(function () {
    var scroll = $(window).scrollTop();
    if (scroll >= 50) {
        $("header").addClass("scroll");
    } else {
        $("header").removeClass("scroll");
    }
});

// adding active class to navbar nav
$(document).ready(function () {
    var url = window.location.pathname;
    var filename = url.substring(url.lastIndexOf('/') + 1);
    if (filename == "") {
        filename = "index.php"
    }
    $(".nav-item .nav-link").removeClass("active");
    $(`.nav-item .nav-link[href="${filename}"]`).addClass("active")
})

// custom tabs work 
$(`.tabs-work .tabs-btn li a`).click(function () {
    $(this).parents("li").siblings().children().removeClass("active")
    $(this).addClass("active")
    $(this).parents(`.tabs-work`).find(`.tab-item`).removeClass("active-tab")
    $(this).parents(`.tabs-work`).find(`.tab-item.${$(this).data("filter")}`).addClass("active-tab")
})

// styling uploaded image on load 
function stylingFirstTab() {
    let desiredStyle = $(".frames-left li").first().children().data("style")
    $(".img-prv .uploaded-img").attr("style", desiredStyle)
}
stylingFirstTab()
// left tabs img work
$(".frames-left li a").click(function () {
    $(".frames-left li a").removeClass("active")
    $(this).addClass("active")
    let desiredSrc = $(this).children("img").attr("src")
    $(".img-prv .frame-img").attr("src", desiredSrc)
    $(".img-prv .uploaded-img").attr("style", $(this).data("style"))
})

// left tabs img work
$(".img-panel .frames-wrapper ul li a").click(function () {
    $(".img-panel .frames-wrapper ul li a").removeClass("active")
    $(this).addClass("active")
    let folderPath = "images/" + $(this).data("frameid").split("-").join("/")
    let imgPath;
    $(".frames-left li").each(function (ind, elem) {
        imgPath = folderPath + "/" + (ind + 1) + ".jpg"
        $(elem).find("img").attr("src", imgPath)
    })
    $(".frames-left li").first().children().click()
})

// steps work 
function nextStep() {
    let currentActive = $("section.active")
    if ($(currentActive).next().length != 0) {
        $(currentActive).removeClass("active")
        $(currentActive).next().addClass("active")
    }
}
function backStep() {
    let currentActive = $("section.active")
    if ($(currentActive).prev().length != 0) {
        $(currentActive).removeClass("active")
        $(currentActive).prev().addClass("active")
    }
}

// imgUpload Work
let img = $(".uploadedImg")
readURL = (input) => {
    // img = new Image
    for (var i = 0; i < input.files.length; i++) {
        if (input.files[i]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $(img).attr('src', e.target.result);
            }
            reader.readAsDataURL(input.files[i]);
        }
    }
}
let croppingImg = $('.cropImgWrapper img')
$("#uploadImg").change(function () {
    if (this.files) {
        readURL(this)
        setTimeout(() => {
            classic
            if ($(croppingImg).height() > $(croppingImg).width()) {
                console.log("vertical")
                $('.cropImgWrapper img').rcrop({
                    preserveAspectRatio: true,
                    minSize: [720, 1080],
                    width: 720,
                    height: 1080
                });
                nextStep()
            }
            else {
                console.log("horizontal")
                $('.cropImgWrapper img').rcrop({
                    preserveAspectRatio: true,
                    minSize: [1080, 720],
                    width: 1080,
                    height: 720
                });
                nextStep()
            }
            $(this).val("")
        }, 500);
    }
})

let cropImgSrc;
$(".crop-options li .continue").click(function () {
    classic
    cropImgSrc = $('.cropImgWrapper img').rcrop('getDataURL')
    nextStep()
    setTimeout(() => {
        $(".img-prv .uploaded-img").attr("src", cropImgSrc)
        $(".img-prv .uploaded-img").removeClass("d-none")
    }, 500);
})