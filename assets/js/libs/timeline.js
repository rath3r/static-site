var APP = APP || {};
APP.timeline = (function () {

    var test,
        canvas,
        paper,
        width;


    function init() {

        var width = 600,
            height = 200,
            labels = ["html", "js", "css", "php", "java", "OS"];
        //console.log("timeline");
        
        getCanvas();
        //_setUpScroll();

        //paper = new Raphael(canvas, 500, 500);
        /*
         * position x
         * position y
         * width
         * height
         */
        paper = Raphael(10, 50, width, height);

        testDraw();

        drawAxis(labels.length, width - 140);

        addLabels(labels);
    }

    function getCanvas(){
        canvas = document.getElementById("timeline-canvas");
    }

    function testDraw() {
        // Creates canvas 320 × 200 at 10, 50
        //paper = Raphael(10, 50, 320, 200);

        // Creates circle at x = 50, y = 40, with radius 10
        //var circle = paper.circle(50, 40, 10);
        // Sets the fill attribute of the circle to red (#f00)
        //circle.attr("fill", "#f00");

        // Sets the stroke attribute of the circle to white
        //circle.attr("stroke", "#fff");

        //var c = paper.path("M10 10h200");
        //c = paper.path("M10 50h200");
        // draw a diagonal line:
        // move to 10,10, line to 90,90

        //var t = paper.text(50, 50, "Raphaël\nkicks\nbutt!");
    }

    function drawAxis(yInterval, length) {
        var i, 
            x = 120, 
            y, 
            svgStr;

        console.log(svgStr);

        for (i = 1; i < yInterval + 1; i++){
            //x = (i * yInterval);
            y = 25 * i;
            svgStr = "M" + x + " " + y + "h" + length;

            console.log(svgStr);
            var c = paper.path(svgStr);    
        }
    }

    function addLabels(labels) {

        var i,
            x = 50,
            y;

        for (i = 1; i < (labels.length + 1); i++){
            
            if(i === 0){
                y = 25;
            } else {
                y = 25 * i;    
            }
            
            var t = paper.text(x, y, labels[i - 1]);

        }
        
    }

    return {
        'init'	: init
    };
}());