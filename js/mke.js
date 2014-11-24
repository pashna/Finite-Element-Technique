var CANVAS = 'canvas';
var SCALE=50;

function Drawer() {

	var canvas = document.getElementById(CANVAS);
	var ctx = canvas.getContext("2d");


	this.drawLine = function(x1, y1, x2, y2) {
		var deltaX = canvas.width/2;
		var deltaY = canvas.height/2;

		ctx.beginPath();
		ctx.moveTo(x1*SCALE+deltaX, deltaY-y1*SCALE);
		ctx.lineTo(x2*SCALE+deltaX, deltaY-y2*SCALE);
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

	this.writeX = function(min, max) {

		var deltaX = canvas.width/(max-min);
		var curX = 0;

		ctx.font="10px Georgia";
		while(min <= max) {

			ctx.beginPath();

			ctx.moveTo(curX, canvas.height/2 - LENGTH_OF_CELL/2);
			ctx.lineTo(curX, canvas.height/2 + LENGTH_OF_CELL/2);

			ctx.stroke();

			ctx.fillText(min.toFixed(1), curX, canvas.height/2 - 2*(LENGTH_OF_CELL/2));

			min += 1;
			curX += deltaX;
		}
	}

	this.writeY = function(min, max) {

		var deltaY = canvas.height / (max - min);
		var curY = 0;

		ctx.font = "10px Georgia";
		while (min <= max) {

			ctx.beginPath();

			ctx.moveTo(canvas.width/2 - LENGTH_OF_CELL / 2, curY);
			ctx.lineTo(canvas.width/2 + LENGTH_OF_CELL / 2, curY);

			ctx.stroke();

			ctx.fillText(min.toFixed(1), canvas.width/2 - 10 * (LENGTH_OF_CELL/2), curY);

			min += 1;
			curY += deltaY;
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

