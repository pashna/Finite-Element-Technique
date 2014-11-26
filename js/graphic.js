var CANVAS = 'canvas';
var SCALE_X = 50;
var SCALE_Y = 50;

var confirmSetting = document.getElementById('confirmSetting');
var solveBtn = document.getElementById('solveBtn');
var finiteElementMethod = new FiniteElementMethod();
var drawer = new Drawer();

confirmSetting.addEventListener('click',function() {
	var input_x = document.getElementById('scaleX').value;
	var input_y = document.getElementById('scaleY').value;

	if (+input_x) {
		SCALE_X = +input_x;
	} else {
		SCALE_X = 50;
		document.getElementById('scaleX').value = "ONLY NUMBER";
	}

	if (+input_y) {
		SCALE_Y = +input_y;
	} else {
		SCALE_X = 50;
		document.getElementById('scaleY').value = "ONLY NUMBER";
	}

	drawer.redraw();

} , false)

solveBtn.addEventListener('click', function () {
	var count = document.querySelector('input[type=radio]:checked').value;
	var y = finiteElementMethod.solve(+count);
	var x = finiteElementMethod.getX();

	console.log(x);
	console.log(y);
	drawer.draw(x,y);
	fillTable(x,y);

}, false);

function Drawer() {

	var canvas = document.getElementById(CANVAS);
	var ctx = canvas.getContext("2d");
	var coordinator = new Coordinator();

	this._drawLine = function(x1, y1, x2, y2) {
		var deltaX = canvas.width/2;
		var deltaY = canvas.height/2;

		ctx.beginPath();
		ctx.moveTo(x1*SCALE_X+deltaX, deltaY-y1*SCALE_Y);
		ctx.lineTo(x2*SCALE_X+deltaX, deltaY-y2*SCALE_Y);
		ctx.stroke();
	}

	this.redraw = function() {
		ctx.clearRect(0,0, 1000, 1000);
		coordinator.createCoordinates();
		coordinator.writeX();
		coordinator.writeY();
		for (var i=1; i<this.x.length; i++) {
			this._drawLine(this.x[i-1], this.y[i-1], this.x[i], this.y[i]);
		}
	}

	this.draw = function(x, y) {
		this.x = x;
		this.y = y;

		console.log(this);

		ctx.clearRect(0,0, 1000, 1000);
		var drawer = new Drawer();
		coordinator.createCoordinates();
		coordinator.writeX();
		coordinator.writeY();
		for (var i=1; i<x.length; i++) {
			this._drawLine(x[i-1], y[i-1], x[i], y[i]);
		}
	}

}

function Coordinator() {
	var LENGTH_OF_CELL = 6;
	var MIN_DISTANCE_BETWEEN_CELL = 10;
	var MIN_DISTANCE_BETWEEN_TEXT = 30;

	var canvas = document.getElementById(CANVAS);
	var ctx = canvas.getContext("2d");

	this.createCoordinates = function() {
		var width = canvas.width;
		var height = canvas.height;

		ctx.beginPath();

		ctx.moveTo(0, canvas.height/2);
		ctx.lineTo(canvas.width, canvas.height/2);
		ctx.moveTo(canvas.width/2, 0);
		ctx.lineTo(canvas.width/2, canvas.height);

		ctx.stroke();
	}

	this.writeX = function() {

		var max = (canvas.width/2)/SCALE_X;
		var min = -max;
		var curX = 0;
		var distanceText = 0;
		var distanceCell = 0;

		ctx.font="10px Georgia";
		while(min <= max) {

			if (distanceCell > MIN_DISTANCE_BETWEEN_CELL) {
				distanceCell = 0;
				ctx.beginPath();
				ctx.moveTo(curX, canvas.height/2 - LENGTH_OF_CELL/2);
				ctx.lineTo(curX, canvas.height/2 + LENGTH_OF_CELL/2);
				ctx.stroke();
				if (distanceText > MIN_DISTANCE_BETWEEN_TEXT) {
					distanceText = 0;
					ctx.fillText(min.toFixed(1), curX, canvas.height / 2 - 8);
				}
			}

			min += 1;
			curX += SCALE_X;
			distanceText += SCALE_X;
			distanceCell += SCALE_X;
		}
	}

	this.writeY = function() {

		var max = (canvas.height/2)/SCALE_Y;
		var min = -max;
		var curY = 0;
		var distanceText = 0;
		var distanceCell = 0;

		ctx.font = "10px Georgia";
		while (min <= max) {

			if (distanceCell > MIN_DISTANCE_BETWEEN_CELL) {
				ctx.beginPath();
				ctx.moveTo(canvas.width / 2 - LENGTH_OF_CELL / 2, curY);
				ctx.lineTo(canvas.width / 2 + LENGTH_OF_CELL / 2, curY);

				ctx.stroke();
				distanceCell = 0;
				if (distanceText > MIN_DISTANCE_BETWEEN_TEXT) {
					ctx.fillText(min.toFixed(1), canvas.width / 2 + 8, curY);
					distanceText = 0;
				}
			}
			min += 1;
			curY += SCALE_Y;
			distanceText += SCALE_Y;
			distanceCell += SCALE_Y;

			//console.log("curY="+curY, "min="+min, "max="+max);
		}
	}
}

function fillTable(x, y) {
	var table = document.getElementById("table");
	table.innerHTML = '<tr><td>X</td><td>Y</td><td>Аналит.</td><td>Погрешность</td></tr>'
	for (var i=0; i< x.length; i++) {
		var analitic_solves = analitics(x[i]);
		table.innerHTML += '<tr><td>'+ x[i] + '</td><td>' + y[i] + '</td><td>'+analitic_solves+'</td><td>'+Math.abs(analitic_solves-y[i])+'</td></tr>';
	}
}

function analitics(x) {
	return -(4*(-3*Math.exp((21/2-(5*Math.sqrt(17))/2)*x+(85*Math.sqrt(17))/2)+21*Math.exp((21/2-(5*Math.sqrt(17))/2)*x+85*Math.sqrt(17)+357/2)+5*Math.sqrt(17)*Math.exp((21/2-(5*Math.sqrt(17))/2)*x+85*Math.sqrt(17)+357/2)-21*Math.exp((21/2+(5*Math.sqrt(17))/2)*x+357/2)+5*Math.sqrt(17)*Math.exp((21/2+(5*Math.sqrt(17))/2)*x+357/2)+3*Math.exp((21/2+(5*Math.sqrt(17))/2)*x+(85*Math.sqrt(17))/2)))/(-21*Math.exp(357/2)+5*Math.sqrt(17)*Math.exp(357/2)+21*Math.exp(357/2+85*Math.sqrt(17))+5*Math.sqrt(17)*Math.exp(357/2+85*Math.sqrt(17)));
}

