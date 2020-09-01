'use strict';

const plx = new Parallax(document.getElementById('root'), {
    pointerEvents: true
});

$(function() {

    if (document.requestFullscreen)
        document.requestFullscreen();

    // check for dynamic link on load
    if (window.location.hash && window.location.hash !== '#')
        quickLoadPage();

    // check for dynamic link on history change
    window.onpopstate = function() { loadPage() };
});

// fade between scenes
const fadeTime = 500;
// total transition time
const transitionTime = 1500;

function loadPage() {
    let pagename = window.location.hash.replace('#', '');
    if (!pagename) {
        $('.logo-wrapper').removeClass('left');
        $('#loadscreen')
            .addClass('reverse')
            .fadeIn(fadeTime);
        $('#subpage-wrapper').hide(fadeTime);
        setTimeout(function() {
            $('#loadscreen').fadeOut(fadeTime);
            $('#root').fadeIn(fadeTime);
            $('.sector.selected').removeClass('selected');
            plx.enable();
        }, transitionTime);
    } else {
        plx.disable();
        $('.logo-wrapper').addClass('left');
        $('#' + pagename + '-sector')
            .addClass('selected');
        $('#root').fadeOut(fadeTime);
        $('#loadscreen')
            .removeClass('reverse')
            .fadeIn(fadeTime);
        setTimeout(function() {
            $('#subpage-wrapper').fadeIn(fadeTime);
            $('#loadscreen').fadeOut(fadeTime);
        }, transitionTime);
    }
}

function quickLoadPage() {
    plx.disable();
    $('.logo-wrapper').addClass('left');
    $('#root').hide();
    $('#subpage-wrapper').show();
}