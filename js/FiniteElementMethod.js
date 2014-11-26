function FiniteElementMethod() {

    this.N = 20;
    this.LENGTH = 17;
    var U0 = 4;
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

        for (var i=0; i<this.N+1; i++) {
            this.A.push(new Array(this.N+1));
        }

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


        console.log('length='+this.A.length, this.A);
        console.log('length='+this.b.length, this.b);

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
        var x = solveByGauss(this.A, this.b);
        x.unshift(U0);
        return x;
    }

    this.getY = function() {
        var y = [];
        var cur = 0;
        var step = this.LENGTH/this.N;
        for (var i=0; i < this.N; i++) {
            y[i] = cur;
            cur += step;
        }
        return y;
    }

}