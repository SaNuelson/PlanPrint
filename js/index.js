let plx = new Parallax(document.getElementById('root'), {
    pointerEvents: true
});

function delay(t, v) {
    return new Promise(function(resolve) {
        setTimeout(resolve.bind(null, v), t)
    });
}


$(() => {

    $('#popup-btn').on('click', function(e) {
        $('#popup-wrapper').toggle();
    })

    // check for dynamic link on load
    if (window.location.hash && !loadPage(window.location.hash.replace('#', '')))
        return;

    // check for dynamic link on history change
    window.onpopstate = function(e) {
        console.log("popstate");
        loadPage(window.location.hash.replace('#', ''));
    }

    // replace static links
    $('a[data-link]').each((_, el) => {
        console.log("replacing");
        $(el).attr('href', '#' + $(el).attr('data-link'));
    });

    $('body').on('click', 'a[data-link]', function(e) {
        loadPage(e.target.getAttribute("data-link"), { force: true });
    })
})

let pageCheck = 'home';
const fadeTime = 500;
const transitionTime = 1500;
// options[force] indicates if the change is guaranteed
function loadPage(pagename, options = {}) {

    console.log("Trying to load page ", pagename);

    if (!options["force"] && pageCheck === pagename)
        return false;

    console.log("Force unset or page differs from actual one");

    pageCheck = pagename;

    if (!pagename || pagename === "home") {

        plx.enable();
        $('.logo-wrapper').removeClass('left');

        $('#subpage-wrapper').hide(fadeTime);
        $('#loadscreen')
            .addClass('reverse')
            .fadeIn(fadeTime);
        setTimeout(() => {
            $('#main').remove();
            $('#loadscreen').fadeOut(fadeTime);
            $('#root').fadeIn(fadeTime);
            $('.sector.selected').removeClass('selected');
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

        setTimeout(() => {
            $('<div/>').load('subpages/' + pagename + '.htm div#main', function() {
                console.log(this);
                $('#subpage-wrapper')
                    .append($(this).children())
                    .show(fadeTime);
            });
            $('#loadscreen').fadeOut(fadeTime);
        }, transitionTime);
    }

    return true;
}