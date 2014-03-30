APP.site = (function () {

    var test;

    function init() {

        var width = getWidth(),
            height = getHeight(),
            settings = {
                width: width,
                height: height,
                labels: [
                    {
                        title : "html",
                        start : "03/09/2001",
                        end   : "now"
                    },
                    {
                        title : "js",
                        start : "01/10/2009",
                        end   : "now"
                    },
                    {
                        title : "css",
                        start : "01/09/2009",
                        end   : "now"
                    }, 
                    {
                        title : "php",
                        start : "01/06/2009",
                        end   : "now"
                    },
                    {
                        title : "java",
                        start : "01/09/2009",
                        end   : "01/03/2011"
                    },
                    {
                        title : "version control",
                        start : "01/02/2010",
                        end   : "now"
                    },
                    {
                        title : "OSes",
                        start : "01/09/2006",
                        end   : "now"
                    }
                ]
            };

        //console.log("height: " + height);


        APP.timeline.init(settings);
        //_setUpScroll();


    }

    function getWidth(){
        return $("#timeline-canvas").width();
    }

    function getHeight(){
        return $("#timeline-canvas").height();
    }

    function _setUpScroll() {

        var anchors = $('#mainNav').find('a'),
            i, l;

        $('#mainNav').find('a').each(function(){
            $(this).click(function(){
                var id = $(this).attr('href');
                //console.log(id);
                $('html, body').scrollTo(id);
            });    
        });

    }

    return {
        'init'	: init
    };
}());

//
APP.site.init();