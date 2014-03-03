var APP = APP || {};

APP.porfolio = (function () {

    var test;


    function init() {

        console.log("static-site");
        
        APP.timeline.init();
        //_setUpScroll();
    }

    function _setUpScroll() {

        var anchors = $('#mainNav').find('a'),
            i, l;

        $('#mainNav').find('a').each(function(){
            $(this).click(function(){
                var id = $(this).attr('href');
                console.log(id);
                $('html, body').scrollTo(id);
            });    
        });

    }

    return {
        'init'	: init
    };
}());

//
APP.porfolio.init();