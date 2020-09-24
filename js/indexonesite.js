var plx = new Parallax(document.getElementById('root'), {
    pointerEvents: true
});

$(function() {

    if (document.requestFullscreen)
        document.requestFullscreen();

    // check for dynamic link on load
    if (window.location.hash && window.location.hash !== '#')
        quickLoadPage();

    // check for dynamic link on history change
    window.onpopstate = function() { loadPage(); };
});

// fade between scenes
var fadeTime = 500;
// total transition time
var transitionTime = 800;

function loadPage() {
    var pagename = window.location.hash.replace('#', '');
    if (!pagename) {
        $('.logo-wrapper').removeClass('left');
        $('#loadscreen')
            .addClass('reverse')
            .fadeIn(fadeTime);
        $('#subpage-wrapper').hide(fadeTime);
        setTimeout(function() {
            if(window.location.hash) return;
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
            if(!window.location.hash) return;
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