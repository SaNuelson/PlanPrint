let plx = new Parallax(document.getElementById('root'), {
    pointerEvents: true,
    invertX: false,
    invertY: false
});

function delay(t, v) {
    return new Promise(function(resolve) {
        setTimeout(resolve.bind(null, v), t)
    });
}


$(() => {
    // check for dynamic link
    if (window.location.hash)
        return loadPageQuick(window.location.hash.replace('#', ''));

    // replace static linking
    $('a[data-link]').each((_, el) => {
        $(el).attr('href', '#' + $(el).attr('data-link'));
    })

    $('body').on('click', 'a', function(e) {
        loadPage(e.target.href.replace(/.*#/, ''));
    })
})

function loadPage(pagename) {
    console.log("Loading page ", pagename);

    if (pagename === 'main') {
        $('#loadscreen')
            .addClass('reverse')
            .fadeIn(250);
        delay(1000).then(() => {
            $('#subpage').remove();
            $('#loadscreen').fadeOut(250);
            $('#root').fadeIn(250);
        });

    } else {
        $('#' + pagename + '-sector').addClass('selected');
        $('#root').fadeOut(500);
        $('#loadscreen')
            .removeClass('reverse')
            .fadeIn(500);

        setTimeout(() => {
            $('<div/>').load('subpages/' + pagename + '.htm div#main', function() {
                console.log(this);
                $('body').append($(this).children());
            });
            $('#loadscreen').fadeOut(500);
        }, 2000);
    }
}

function loadPageQuick(pagename) {
    console.log("Quickloading page", pagename);
    $('#loadscreen').show();
    $('#root').hide();
    $('<div/>').load('subpages/' + pagename + '.htm div#main', function() {
        $('#loadscreen').hide();
        $('body').append($(this).children());
    });
}