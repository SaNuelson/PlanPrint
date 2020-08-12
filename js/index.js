let plx = new Parallax(document.getElementById('root'), {
    pointerEvents: true
});

function delay(t, v) {
    return new Promise(function(resolve) {
        setTimeout(resolve.bind(null, v), t)
    });
}


$(() => {
    $('body').on('click', 'a', function(e) {
        loadPage(e.target.href.replace(/.*#/, ''));
    })
})

function loadPage(pagename) {
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
        fetch('subpages/' + pagename + '.htm')
            .then(res => res.text()).then(text => {
                setTimeout(() => {
                    $('body').append($('<div id="subpage"></div>').html(text));
                    $('#loadscreen').fadeOut(500);
                }, 2000);
            })
            .catch(() => loadPage('subpage'));
    }
}