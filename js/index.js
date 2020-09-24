function delay(t, v) {
    return new Promise(function(resolve) {
        setTimeout(resolve.bind(null, v), t);
    });
}

var plx = new Parallax(document.getElementById('root'), {
    pointerEvents: true
});

$(function(){

    // check for phone as those most likely can't handle animations
    (function(a, b) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) window.location = b ;})(navigator.userAgent || navigator.vendor || window.opera, 'indexmin.html');

    // check for dynamic link on load
    if (window.location.hash && !loadPage(window.location.hash.replace('#', '')), false)
        return;

    // check for dynamic link on history change
    window.onpopstate = function() {
        console.log("popstate");
        loadPage(window.location.hash.replace('#', ''), false);
    };

    // replace static links
    $('a[data-link]').each(function(_, el){
        console.log("replacing");
        $(el).attr('href', '#' + $(el).attr('data-link'));
    });

    $('body').on('click', 'a[data-link]', function(e) {
        loadPage(e.target.getAttribute("data-link"), true);
    });
});

var pageCheck = 'home';
// fade between scenes
var fadeTime = 250;
// total transition time
var transitionTime = 1500;
// options[force] indicates if the change is guaranteed
function loadPage(pagename, force) {

    console.log("Trying to load page ", pagename);

    if (!force && pageCheck === pagename)
        return false;

    console.log("Force unset or page differs from actual one");

    pageCheck = pagename;

    if (!pagename || pagename === "home") {

        $('.logo-wrapper').removeClass('left');

        $('#loadscreen')
            .addClass('reverse')
            .fadeIn(fadeTime);
        $('#subpage-wrapper').hide(fadeTime);
        setTimeout(function(){
            $('#main').remove();
            $('#loadscreen').fadeOut(fadeTime);
            $('#root').fadeIn(fadeTime);
            $('.sector.selected').removeClass('selected');
            plx.enable();
        }, transitionTime);
    } else {
        var totalCheck = new Date().getTime();

        plx.disable();
        $('.logo-wrapper').addClass('left');

        $('#' + pagename + '-sector')
            .addClass('selected');

        $('#root').fadeOut(fadeTime);
        $('#loadscreen')
            .removeClass('reverse')
            .fadeIn(fadeTime);

        var result;
        var loadEnd = false;
        var timerEnd = false;
        var callback = function() {
            if (!loadEnd || !timerEnd)
                return;

            var check = new Date().getTime();

            $('a.img-link', result).each(function(idx, el) {
                // TODO: Fix this godawful workaround
                el.href = el.href.replace('/img', '/PlanPrint/img');
            });
            $('img', result).each(function(idx, el) {
                el.src = el.src.replace('/img', '/PlanPrint/img');
            });
            $('#subpage-wrapper')
                .append($(result).children())
                .show(fadeTime);
            $('#loadscreen').fadeOut(fadeTime);

            console.log("Subpage morph end, total ms - ", (new Date().getTime() - check));
            console.log("Subpage tranistion end, total sum of all incl. internals in ms - ", (new Date().getTime() - totalCheck));
        }

        // for debug purposes
        var checkTime = new Date().getTime();
        result = $('<div/>').load('subpages/' + pagename + '.htm div#main', function() {
            console.log("Subpage load end, total ms - ", (new Date().getTime() - checkTime));
            loadEnd = true;
            callback();
        });

        setTimeout(function() {
            console.log("Subpage timer end, total ms - ", transitionTime);
            timerEnd = true;
            callback();
        }, transitionTime);

    }

    return true;
}