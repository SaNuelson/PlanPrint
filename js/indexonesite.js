var modal = $('#modal');
var modalImg = $('#modal-img');
function loadPage() {
    var e = window.location.hash.replace("#", "");
    e ? (plx.disable(), $(".logo-wrapper").addClass("left"), $("#" + e + "-sector").addClass("selected"), $("#root").fadeOut(fadeTime), $("#loadscreen").removeClass("reverse").fadeIn(fadeTime), setTimeout(function() {
        window.location.hash && ($("#subpage-wrapper").fadeIn(fadeTime), $("#loadscreen").fadeOut(fadeTime))
    }, transitionTime)) : ($(".logo-wrapper").removeClass("left"), $("#loadscreen").addClass("reverse").fadeIn(fadeTime), $("#subpage-wrapper").hide(fadeTime), setTimeout(function() {
        window.location.hash || ($("#loadscreen").fadeOut(fadeTime), $("#root").fadeIn(fadeTime), $(".sector.selected").removeClass("selected"), plx.enable())
    }, transitionTime))
}

function quickLoadPage() {
    plx.disable(), $(".logo-wrapper").addClass("left"), $("#root").hide(), $("#subpage-wrapper").show()
}
var plx = new Parallax(document.getElementById("root"), {
    pointerEvents: !0
});
$(function() {
    $('#modal-close').on('click', function(){modal.hide()});
    $('.img-thumbnail').on('click',function(e){
        modal.fadeIn();
        modalImg.attr('src',e.target.src.replace('resize/','full/'));
    })
    document.requestFullscreen && document.requestFullscreen(), window.location.hash && "#" !== window.location.hash && quickLoadPage(), window.onpopstate = function(e) {
        modal.is(':visible') && modal.fadeOut(), loadPage();
    }
});
var fadeTime = 500,
    transitionTime = 800;