var APP = APP || {};

APP.wedding = (function () {

    var time = new Date().getTime(),
        futureWeddingDate = new Date("2014-07-10T15:00:00").getTime(),
        weddingDate = Math.floor(futureWeddingDate/1000),
        interval,
        canvas,
        context;


    function init() {

        //$("#countdown").html(weddingDate);
        if ($('#countdown').length) {
            //alert("init");
            setTime();
            setUpCountdown();
        }

        if ($('.saveTheDate').length) {
            
            setUpContext();

            firstCloud = {
                startX : 80,
                startY : 60,
                curves : [{
                    desc : "curve 1",
                    ctrl1X : 60,
                    ctrl1Y : 20,
                    ctrl2X : 10,
                    ctrl2Y : 160,
                    endX : 80,
                    endY : 180
                },{
                    desc : "curve 2",
                    ctrl1X : 40,
                    ctrl1Y : 220, 
                    ctrl2X : 250, 
                    ctrl2Y : 240, 
                    endX : 260, 
                    endY : 180
                },{
                    desc : "curve 3",
                    ctrl1X : 320, 
                    ctrl1Y : 220, 
                    ctrl2X : 420, 
                    ctrl2Y : 220, 
                    endX : 420, 
                    endY : 180
                },{
                    desc : "curve 4",
                    ctrl1X : 460, 
                    ctrl1Y : 200, 
                    ctrl2X : 520, 
                    ctrl2Y : 120, 
                    endX : 420, 
                    endY : 100
                },{
                    desc : "curve 5",
                    ctrl1X : 430, 
                    ctrl1Y : 40, 
                    ctrl2X : 370,  
                    ctrl2Y : 30, 
                    endX : 340, 
                    endY : 50
                },{
                    desc : "curve 6",
                    ctrl1X : 320, 
                    ctrl1Y : 5, 
                    ctrl2X : 250,   
                    ctrl2Y : 20, 
                    endX : 250, 
                    endY : 50
                },{
                    desc : "curve 7",
                    ctrl1X : 200,  
                    ctrl1Y : 5, 
                    ctrl2X : 90,    
                    ctrl2Y : 30, 
                    endX : 80, 
                    endY : 60
                }]
            };
            
            drawCloud(firstCloud, false);

            secondCloud = {
                startX : 420,
                startY : 220,
                curves : [{
                    desc : "curve 1",
                    ctrl1X : 380,
                    ctrl1Y : 230,
                    ctrl2X : 410,
                    ctrl2Y : 235,
                    endX : 430,
                    endY : 230
                },{
                    desc : "curve 2",
                    ctrl1X : 420,
                    ctrl1Y : 230, 
                    ctrl2X : 440, 
                    ctrl2Y : 240, 
                    endX : 410, 
                    endY : 220
                },{
                    desc : "curve 2",
                    ctrl1X : 440,
                    ctrl1Y : 240, 
                    ctrl2X : 400, 
                    ctrl2Y : 170, 
                    endX : 420, 
                    endY : 230
                },{
                    desc : "curve 2",
                    ctrl1X : 400,
                    ctrl1Y : 220, 
                    ctrl2X : 450, 
                    ctrl2Y : 140, 
                    endX : 420, 
                    endY : 220
                }]
            };
            
            drawCloud(secondCloud, false);
            // context.font = "30px LibreBaskerville-Regular";
            // context.fillText("our nuptial hour", 80, 90);
            // context.fillText("draws on apace . . .", 90, 140);

        }
    }

    function setUpContext(){
        canvas = document.getElementById('cloudCanvas');
        context = canvas.getContext('2d');
    }

    function setTime(){

		var date_now_float = new Date().getTime(),
			date_now = Math.floor(date_now_float / 1000),
			delta = weddingDate - date_now,
			days = Math.floor(delta / 86400),
			hours = Math.floor(delta / 3600) % 24,
			minutes = Math.floor(delta / 60) % 60,
			seconds = delta % 60,
			html;

		html = days + " days " + hours + " hours " + minutes + " minutes " + seconds + " seconds";

		//$("#countdown").html(html);
		$("#daysTo").html(days);
		$("#hoursTo").html(hours);
		$("#minsTo").html(minutes);
		$("#secsTo").html(seconds);

	}

    function setUpCountdown(){
        interval = setInterval(setTime, 1000);
    }

    function drawCloud(cords, showCords){
        
        var i;

        // draw cloud
        context.beginPath();

        if(showCords){
            addPoint({
                x : cords.startX,
                y : cords.startY,
                radius : 2, 
            });
            
            for(i = 0; i < cords.curves.length; i++){
                addPoint({
                    x : cords.curves[i].ctrl1X,
                    y : cords.curves[i].ctrl1Y,
                    radius : 2, 
                });
                addPoint({
                    x : cords.curves[i].ctrl2X,
                    y : cords.curves[i].ctrl2Y,
                    radius : 2, 
                });
                addPoint({
                    x : cords.curves[i].endX,
                    y : cords.curves[i].endY,
                    radius : 2, 
                });
            }
        }
      
        context.moveTo(cords.startX, cords.startY);

        for(i = 0; i < cords.curves.length; i++){

            console.log(cords.curves[i]);
            
            context.bezierCurveTo(
                cords.curves[i].ctrl1X, 
                cords.curves[i].ctrl1Y, 
                cords.curves[i].ctrl2X, 
                cords.curves[i].ctrl2Y, 
                cords.curves[i].endX, 
                cords.curves[i].endY
            );
        }

        context.closePath();
        context.lineWidth = 1;
        // context.fillStyle = '#8ED6FF';
        // context.fill();
        context.strokeStyle = '#000';
        context.stroke();

        // save canvas image as data url (png format by default)
        //var dataURL = canvas.toDataURL();

        // set canvasImg image src to dataURL
        // so it can be saved as an image
        //document.getElementById('cloudCanvas').src = dataURL;
    }

    function addPoint(coords){

        context.beginPath();
        context.arc(coords.x, coords.y, coords.radius, 0, 2*Math.PI);
        context.stroke();

        //context.fillStyle = "#ff0000";
        //context.fill();

        context.fillStyle = "#000000";
        context.font = "10px Arial";
        context.fillText("(" + coords.x + ", " + coords.y + ")", coords.x, coords.y);

        context.fill();
        
    }

    return {
        'init'	: init
    };
}());

APP.wedding.init();