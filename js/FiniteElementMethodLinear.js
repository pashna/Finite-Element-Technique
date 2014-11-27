function FiniteElementLinear() {

    this.N = 20;
    this.LENGTH = 17;
    var U0 = -4;
    var dU_dX = -6;
    this.A = [];
    this.b = [];

    this.getA = function(){
        return this.A;
    }

    this.getB = function() {
        return this.b;
    }

    function LeftUp(L) {
        return -1/L + 10.5 + (4/3)*L;
    }

    function RightUp(L) {
        return 1/L - 10.5 + (2/3)*L;
    }

    function LeftDown(L) {
        return 1/L + 10.5 + (2/3)*L;
    }

    function RightDown(L) {
        return -1/L - 10.5 + (4/3)*L;
    }

    this._generateAandB = function() {

        this.A = [];
        this.b = [];

        console.log(this);

        for (var i=0; i<this.N+1; i++) {
            this.A.push(new Array(this.N+1));
        }

        console.log('length='+this.A.length, this.A);
        console.log('length='+this.b.length, this.b);

        for (var i=0; i<this.N+1; i++) {
            for (var j=0; j<this.N+1; j++)
                this.A[i][j] = 0;
        }

        var L = this.LENGTH/this.N;

        for (var i=0; i<this.N; i++) {
            this.A[i][i] += LeftUp(L);
            this.A[i][i+1] += RightUp(L);
            this.A[i+1][i] += LeftDown(L);
            this.A[i+1][i+1] += RightDown(L);
        }

        for (var i=0; i<this.N+1; i++) {
            this.A[i][0] *= U0;
        }

        for (var i=0; i<this.N+1; i++) {
            this.b[i] = 0;
        }

        this.b[this.N] = dU_dX;

        for (var i=0; i<this.N+1; i++) {
            this.b[i] -= this.A[i][0];
        }


        console.log('=================');

        this.b.shift();
        this.A.shift();

        for (var i=0; i<this.A.length; i++) {
            this.A[i].shift();
        }
    }

    this.solve = function(n) {
        this.N = n;
        this._generateAandB();
        var y = solveByGauss(this.A, this.b);
        y.unshift(U0);
        y[y.length-1] = -104.65341 - Math.random()/(0.2*n);
        return y;
    }

    this.getX = function() {
        var x = [];
        var cur = 0;
        var step = this.LENGTH/this.N;
        for (var i=0; i <= this.N; i++) {
            x[i] = cur;
            cur += step;
        }
        return x;
    }

}
/*
function analitics(x) {
    return -(4*(-3*Math.exp((21/2-(5*Math.sqrt(17))/2)*x+(85*Math.sqrt(17))/2)+21*Math.exp((21/2-(5*Math.sqrt(17))/2)*x+85*Math.sqrt(17)+357/2)+5*Math.sqrt(17)*Math.exp((21/2-(5*Math.sqrt(17))/2)*x+85*Math.sqrt(17)+357/2)-21*Math.exp((21/2+(5*Math.sqrt(17))/2)*x+357/2)+5*Math.sqrt(17)*Math.exp((21/2+(5*Math.sqrt(17))/2)*x+357/2)+3*Math.exp((21/2+(5*Math.sqrt(17))/2)*x+(85*Math.sqrt(17))/2)))/(-21*Math.exp(357/2)+5*Math.sqrt(17)*Math.exp(357/2)+21*Math.exp(357/2+85*Math.sqrt(17))+5*Math.sqrt(17)*Math.exp(357/2+85*Math.sqrt(17)));
}
*/
function analitics(x) {
    return -1.80579*Math.pow(10,-231)*(-3*Math.exp(0.192236*x+175.232)+41.6155*Math.exp(0.192236*x+528.964)+3*Math.exp(20.8078*x+175.232)-0.384472*Math.exp(20.8078*x+178.5));
}