var APP = APP || {};
APP.timeline = (function () {

    var test,
        canvas,
        paper,
        width,
        colors = {
            red : "#FF0000",
            yellow : "#FFFF00",
            spearmint : "#47D1FF",
            blue: "#0000FF"
        },
        startDate,
        yInterval,
        xInterval;


    function init(settings) {

        var canvasWidth = settings.width,
            canvasHeight = settings.height,
            divide, paddingGraphPaper, 
            range;
        
        startDate = getStartDate(settings.labels);
        
        getCanvas();
        //_setUpScroll();

        //set up paper
        paper = new Raphael(canvas, canvasWidth, canvasHeight);
        
        // the divide between labels and graph
        divide = canvasWidth * 0.15;

        // inner margin left and right
        innerMarginX = (canvasWidth * 0.75) * 0.08;

        // inner margin top and botton
        innerMarginY = (canvasHeight * 0.75) * 0.08;

        // x position for the start of the inner graph
        innerGraphX1 = innerMarginX + divide;

        // y position for the start of the inner graph
        innerGraphY1 = innerMarginY;

        // x position for the end of the inner graph
        innerGraphX2 = canvasWidth - innerMarginX;

        // y position for the end of the inner graph
        innerGraphY2 = canvasHeight - innerMarginY;

        // height of the graph
        innerHeight = innerGraphY2 - innerGraphY1;

        // length of the graph
        innerLength = innerGraphX2 - innerGraphX1;

        // get the intervals for both axises
        yInterval = innerHeight/settings.labels.length;
        xInterval = getXInterval(innerGraphX1, innerGraphX2, settings.labels);

        // add the labels for both the axises
        addYLabels(settings.labels, yInterval, 100);
        addXLabels(innerGraphX1, innerGraphX2, innerGraphY2, xInterval, settings.labels);

        // draw a line for each of the labels
        y = innerGraphY1 + (yInterval/2);

        for(var i = 0; i < settings.labels.length; i++){

            var c = paper.path("M" + innerGraphX1 + " " + y + "h" + innerLength);

            addGraphBlock(innerGraphX1, y, settings.labels[i]);

            y += yInterval;
        }
    }

    function getCanvas(){
        canvas = document.getElementById("timeline-canvas");
    }

    function fillBackground(width){
        var r = paper.rect(0, 0, width, 400);
        r.attr(
            {
                fill: colors.spearmint
            }
        );
    }

    function drawPoint(x, y, r, color){
        var circle = paper.circle(x, y, r);
        // Sets the fill attribute of the circle to red (#f00)
        circle.attr("fill", color);
    }

    function drawRectangle(x1, y1, width, height, color){

        var r = paper.rect(x1, y1, width, height);
        r.attr(
            {
                fill: color
            }
        );
    }

    function graphBackground(divide, width){
        var r = paper.rect(divide, 0, width, 400);
        r.attr(
            {
                fill: colors.red
            }
        );
    }

    function testDraw(type) {
        switch(type)
        {
            case "circle":
                // Creates circle at x = 50, y = 40, with radius 10
                var circle = paper.circle(50, 40, 10);
                // Sets the fill attribute of the circle to red (#f00)
                circle.attr("fill", "#f00");

                // Sets the stroke attribute of the circle to white
                circle.attr("stroke", "#fff");
            break;
            case "path":
                var c = paper.path("M10 10h200");
                //c = paper.path("M10 50h200");
                // draw a diagonal line:
                // move to 10,10, line to 90,90    
            break;
            case "rectangle":
                //Paper.rect(x, y, width, height, [r])

                var r = paper.rect(0, 0, 100, 400);
                r.attr({fill: "red"});
            break;
            case "text":
                var t = paper.text(50, 50, "Raphaël\nkicks\nbutt!");
            break;
            default:
                console.log("testDraw");
        }
    }

    function drawXAxis(type, range) {
        var i, 
            x = 120, 
            y, 
            svgStr;

        //console.log(svgStr);

        for (i = 1; i < yInterval + 1; i++){
            //x = (i * yInterval);
            y = 25 * i;
            svgStr = "M" + x + " " + y + "h" + length;

            //console.log(svgStr);
            var c = paper.path(svgStr);    
        }
    }

    function getXInterval(x1, x2, labels){
        var l = x2 - x1,
            startYear = startDate.getFullYear(),
            startMonth = 0,
            endDate = getEndDate(),
            endYear = endDate.getFullYear(),
            endMonth = endDate.getMonth();

        noOfMonths = (((endYear - startYear) * 12) + (endMonth + 1));
        xInterval = l/noOfMonths;

        return xInterval;
    }

    function drawXBackground(yInterval, length) {
        var i, 
            x = 120, 
            y, 
            svgStr;

        //console.log(svgStr);

        for (i = 1; i < yInterval + 1; i++){
            //x = (i * yInterval);
            y = 25 * i;
            svgStr = "M" + x + " " + y + "h" + length;

            //console.log(svgStr);
            var c = paper.path(svgStr);    
        }
    }

    function addYLabels(labels, yInterval, xMargin) {

        var i,
            x = xMargin,
            y;

        for (i = 1; i < (labels.length + 1); i++){
            
            y = yInterval * i;    
                        
            var t = paper.text(x, y, labels[i - 1].title);

        }
        
    }

    function addXLabels(x1, x2, y, xInterval, labels) {

        var l = x2 - x1,
            c = paper.path("M" + x1 + " " + y + "h" + l),
            rangeLength = labels.length,
            i, t, dashLength,
            year = startDate.getFullYear();

        console.log(startDate.getFullYear());
        
        labelLoc = x1;
        labelOffset = y + 14;
        for(i = 0; i <= noOfMonths; i++) {

            mod = i % 12;

            if(mod === 0){
                dashLength = 8;

                // add a text label
                t = paper.text(labelLoc, labelOffset, year);
                year++;
            } else {
                dashLength = 5;
            }

            dash = paper.path("M" + labelLoc + " " + y + "v" + dashLength);

            labelLoc += xInterval;

        }
        
    }

    function getEndDate() {

        return new Date();
    }

    function getStartDate(labels) {

        var startDate, 
            current,
            i, l = labels.length;

        for(i = 0; i < l; i++){

            current = getDateObj(labels[i].start);

            if((typeof startDate == 'undefined') || (current.getTime() < startDate.getTime())){
                startDate = current;
            }
        }

        return startDate;
    }

    function getDateObj(dateStr){

        var dateArr = dateStr.split("/"),
            day = parseInt(dateArr[0]),
            month = parseInt(dateArr[1]),
            year = parseInt(dateArr[2]),
            dateObj = new Date(year, (month - 1), day);

        return dateObj;
    }

    function addGraphBlock(x1, y, block){

        var blockStartDate = getDateObj(block.start),
            blockEndDate = block.end == "now" ? new Date() : getDateObj(block.end),
            blockNoOfYear = blockStartDate.getFullYear() - startDate.getFullYear(),
            blockMonth = blockStartDate.getMonth() + 1,
            blockNoOfMonths = (blockNoOfYear * 12) + blockMonth,
            blockEndNoOfYear = blockEndDate.getFullYear() - startDate.getFullYear(),
            blockEndMonth = blockEndDate.getMonth() + 1,
            blockEndNoOfMonths = (blockEndNoOfYear * 12) + blockEndMonth,
            blockX1 = x1 + (xInterval * blockNoOfMonths),
            blockX2 = x1 + (xInterval * blockEndNoOfMonths),
            blockY1 = y - (yInterval/2) + 6,
            blockY2 = y + (yInterval/2) - 6,
            blockWidth = blockX2 - blockX1,
            blockHeight = blockY2 - blockY1;

        

        drawPoint(blockX1, blockY1, 2, "blue");
        drawPoint(blockX1, blockY2, 2, "blue");
        drawPoint(blockX2, blockY1, 2, "blue");
        drawPoint(blockX2, blockY2, 2, "blue");

        //console.log(blockEndNoOfYear);
        //console.log(blockEndMonth);
        
        drawRectangle(blockX1, blockY1, blockWidth, blockHeight, "red");
    }

    return {
        'init'	: init
    };
}());