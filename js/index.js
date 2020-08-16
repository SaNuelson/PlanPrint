let plx = new Parallax(document.getElementById('root'), {
    pointerEvents: true
});

function delay(t, v) {
    return new Promise(function(resolve) {
        setTimeout(resolve.bind(null, v), t)
    });
}


$(() => {
    {
        let imgsrcs = [
            "img/thumbnails/canon_ipf.jpg",
            "img/thumbnails/estefold2300.jpg",
            "img/thumbnails/oceplotwave450.jpg",
            "img/thumbnails/p1100477.jpg",
            "img/thumbnails/p1110173a.jpg",
            "img/thumbnails/p1110174a.jpg",
            "img/thumbnails/p1110178a.jpg",
            "img/thumbnails/p1110181a.jpg",
            "img/thumbnails/p1110182a.jpg",
            "img/thumbnails/p1110186a.jpg",
            "img/thumbnails/p1110189a.jpg",
            "img/thumbnails/sharpmx3060.jpg",
            "img/thumbnails/sidlo.jpg",
            "img/thumbnails/synergix_scanner.jpg",
            "img/thumbnails/xerox6204.jpg",
            "img/thumbnails/xerox6204printer.jpg"
        ];

        (function f(idx) {
            if (idx >= imgsrcs.length) idx = 0;
            let img = $('<div class="sector sectorimage"></div>').append(
                $('<img/>')
                .attr('src', imgsrcs[idx])
                .addClass('img-fluid')
            ).css({
                left: 'calc((100vw - 250px) * ' + Math.random() + ')'
            });
            $('#imagelayer').append(img);
            setTimeout(() => img.remove(), 15000);
            setTimeout(() => f(idx + 1), 4000);
        })(0);
    }

    $('#imagelayer').on('click', '.sectorimage', function(e) {
        $('#popup-wrapper').toggle();
        $('#popup-img').attr('src', e.target.src.replace('thumbnails', 'fullsize'));
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