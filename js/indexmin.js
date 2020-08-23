$(() => {
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
// fade between scenes
let fadeTime = 500;
// options[force] indicates if the change is guaranteed
function loadPage(pagename, options = {}) {

    console.log("Trying to load page ", pagename);

    if (!options["force"] && pageCheck === pagename)
        return false;

    console.log("Force unset or page differs from actual one");

    pageCheck = pagename;

    if (!pagename || pagename === "home") {
        $('.logo-wrapper').removeClass('left');
        $('#subpage-wrapper').hide(fadeTime);
        $('#main').remove();
        $('#root').fadeIn(fadeTime);
        $('.sector.selected').removeClass('selected');
    } else {
        $('.logo-wrapper').addClass('left');

        $('#' + pagename + '-sector')
            .addClass('selected');

        $('#root').fadeOut(fadeTime);
        $('#miniloader').show();
        $('<div/>').load('subpages/' + pagename + '.htm div#main', function() {
            $('a', this).each(function(idx, el) {
                // TODO: Fix this godawful workaround
                el.href = el.href.replace('/img', '/PlanPrint/img');
            });
            $('#miniloader').hide();
            $('#subpage-wrapper')
                .append($(this).children())
                .show(fadeTime);
        });
    }

    return true;
}