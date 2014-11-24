var CANVAS = 'canvas';
var SCALE_X = 20;
var SCALE_Y = 20;

function Drawer() {

	var canvas = document.getElementById(CANVAS);
	var ctx = canvas.getContext("2d");


	this.drawLine = function(x1, y1, x2, y2) {
		var deltaX = canvas.width/2;
		var deltaY = canvas.height/2;

		ctx.beginPath();
		ctx.moveTo(x1*SCALE_X+deltaX, deltaY-y1*SCALE_Y);
		ctx.lineTo(x2*SCALE_X+deltaX, deltaY-y2*SCALE_Y);
		ctx.stroke();
	}

}

function Coordinator() {
	var LENGTH_OF_CELL = 6;

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

		ctx.font="10px Georgia";
		while(min <= max) {

			ctx.beginPath();

			ctx.moveTo(curX, canvas.height/2 - LENGTH_OF_CELL/2);
			ctx.lineTo(curX, canvas.height/2 + LENGTH_OF_CELL/2);

			ctx.stroke();
			ctx.fillText(min.toFixed(1), curX, canvas.height/2 - 8);

			min += 1;
			curX += SCALE_X;
		}
	}

	this.writeY = function(min, max) {

		var max = (canvas.height/2)/SCALE_Y;
		var min = -max;
		var curY = 0;

		ctx.font = "10px Georgia";
		while (min <= max) {

			ctx.beginPath();

			ctx.moveTo(canvas.width/2 - LENGTH_OF_CELL / 2, curY);
			ctx.lineTo(canvas.width/2 + LENGTH_OF_CELL / 2, curY);

			ctx.stroke();

			ctx.fillText(min.toFixed(1), canvas.width/2 + 8, curY);

			min += 1;
			curY += SCALE_Y;
		}
	}
}

var i=-12;
var x = [];
var y = [];
while(i<12) {
	x.push(i);
	y.push(Math.cos(i));
	i += 0.05;
}

var drawer = new Drawer();
var coordinator = new Coordinator();
coordinator.createCoordinates();
coordinator.writeX(-12, 12, Math.PI/2);
coordinator.writeY(-15, 15);

for (var i=1; i<x.length; i++) {
	drawer.drawLine(x[i-1], y[i-1], x[i], y[i]);
}

