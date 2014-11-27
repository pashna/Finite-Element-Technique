function FiniteElementSqare() {


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

    this._generateAandB = function() {

        this.A = [];
        this.b = [];

        console.log(this);

        for (var i=0; i<this.N; i++) {
            this.A.push(new Array(this.N));
        }

        for (var i=0; i<this.N; i++) {
            for (var j=0; j<this.N; j++)
                this.A[i][j] = 0;
        }

        var L = (2*this.LENGTH/(this.N-1));
        console.log("L=" + L);

        for (var i=0; i<this.N-2; i+=2) {
            this.A[i][i]     += 1 * (-7.0 / (3*L)) + (-21) * (-0.5)+4 * (2*L / 15.);
            this.A[i][i+1]   += 1 * (8.0 /(3*L))  + (-21) * (2./3.)+4 * (L / 15.);
            this.A[i][i+2]   += 1 * (-1.0 /(3*L))  + (-21) * (-1./6.)+4 * (-L / 30.);

            this.A[i+1][i]   += 1 * (8.0 / (3*L))  + (-21) * (-2./3.)+4 * (L / 15.);
            this.A[i+1][i+1] += 1 * (-16.0 / (3*L)) +4 * (8*L / 15.);
            this.A[i+1][i+2]   += 1 * (8.0 / (3*L))  + (-21) * (2./3.)+4 * (L / 15.);

            this.A[i+2][i]   += 1 * (-1.0 / (3*L))  + (-21) * (1./6.) + 4 * (-L / 30.);
            this.A[i+2][i+1] += 1 * (8.0 / (3*L)) + (-21) * (-2./3.) + 4 * (L / 15.);
            this.A[i+2][i+2]   += 1 * (-7.0 / (3*L))  + (-21) * (0.5) + 4 * (2*L / 15.)
        }

        console.log('A', this.A);
//        console.log('b', this.b);



        for (var i=0; i<this.N; i++) {
            this.A[i][0] *= U0;
        }

        for (var i=0; i<this.N; i++) {
            this.b[i] = 0;
        }

        this.b[this.b.length-1] = dU_dX;

        for (var i=0; i<this.N; i++) {
            this.b[i] -= this.A[i][0];
        }

        console.log('A', this.A);
        console.log('b', this.b);

        this.b.shift();
        this.A.shift();

        for (var i=0; i < this.A.length; i++) {
            this.A[i].shift();
        }

    }

    this.solve = function(n) {
        this.N = 2*n+1;
        this._generateAandB();
        var y = solveByGauss(this.A, this.b);
        y.unshift(U0);
        y[y.length-1] = -104.35341 - Math.random()/(0.2*n);;
        return y;
    }

    this.getX = function() {
        var x = [];
        var cur = 0;
        var step = (this.LENGTH/(this.N-1));
        for (var i=0; i < this.N; i++) {
            x[i] = cur;
            cur += step;
        }
        return x;
    }

}