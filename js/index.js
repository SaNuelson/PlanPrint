let plx = new Parallax(document.getElementById('root'), {
    pointerEvents: true
});

function delay(t, v) {
    return new Promise(function(resolve) {
        setTimeout(resolve.bind(null, v), t)
    });
}


$(() => {
    let imgsrcs = [
        "img/thumbnails/Canon_iPF.JPG",
        "img/thumbnails/estefold2300.JPG",
        "img/thumbnails/OCEplotwave450.JPG",
        "img/thumbnails/P1100477.JPG",
        "img/thumbnails/P1110173a.JPG",
        "img/thumbnails/P1110174a.JPG",
        "img/thumbnails/P1110178a.JPG",
        "img/thumbnails/P1110181a.JPG",
        "img/thumbnails/P1110182a.JPG",
        "img/thumbnails/P1110186a.JPG",
        "img/thumbnails/P1110189a.JPG",
        "img/thumbnails/SharpMX3060.JPG",
        "img/thumbnails/sidlo.JPG",
        "img/thumbnails/Synergix_scanner.JPG",
        "img/thumbnails/Xerox6204.JPG",
        "img/thumbnails/Xerox6204printer.JPG"
    ];
    for (let imgsrc of imgsrcs) {
        $('#imagelayer').append(
            $('<div class="sector sectorimage"></div>').append(
                $('<img />')
                .attr('src', imgsrc)
                .addClass('img-fluid')
            )
            .css({
                left: 'calc((100vw - 250px) * ' + Math.random() + ')',
                'animation-delay': Math.random() * 100 + 's'
            })
        );
    }

    $('#imagelayer').on('click', '.sectorimage', function(e) {
        $('#popup-wrapper').toggle();
        $('#popup-img').attr('src', e.target.src);
    })

    $('#popup-btn').on('click', function(e) {
        $('#popup-wrapper').toggle();
    })


    $('#footer-button').on('click', function() {
        $('.footer')
            .toggleClass('hidden');

        $('i', $('#footer-button'))
            .toggleClass('fa-chevron-up')
            .toggleClass('fa-chevron-down');
    });

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

let pageCheck = 'none';
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
        $('#subpage-wrapper').hide(fadeTime);
        $('#loadscreen')
            .addClass('reverse')
            .fadeIn(fadeTime);
        setTimeout(() => {
            $('#main').remove();
            $('#subpage').remove();
            $('#loadscreen').fadeOut(fadeTime);
            $('#root').fadeIn(fadeTime);
            $('.sector.selected').removeClass('selected');
        }, transitionTime);
    } else {
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