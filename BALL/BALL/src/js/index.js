let mCircle = {
    x: 260,
    y: 30,
    r: 30
};

const period = 2000; //in ms
const period1 = 3000; //in ms
let that;
class MoveBall {
    constructor() {
        this.canvas = document.getElementById('stage');
        this.stage = this.canvas.getContext('2d');
        this.gradient = {};
        that = this;
    }

    init() {
        this.addEvent();
        this.setBackground();
        this.drawBall();
        this.continue = true;
        this.centerX = this.canvas.width / 2;
        this.centerY = this.canvas.height / 1;
        this.amplitude = this.centerY - mCircle.r;
        setTimeout(function() {
            var startTime = (new Date()).getTime();
            that.animate(startTime);
        },1000);
    }

    addEvent() {
        this.canvas.addEventListener('mousedown', this.onMouseDown, false);
        this.canvas.addEventListener('mousemove', this.onMouseMove, false);
    }

    onMouseDown(evt) {
        that.continue = !that.continue;
        if (that.continue) that.animate(that.startTime);
    }

    onMouseMove(evt) {
        mCircle.x = evt.clientX;
    }

    setBackground() {
        this.gradient = this.stage.createLinearGradient(0, 0, this.canvas.width, this.canvas.height);
        this.gradient.addColorStop(0, 'white');
        this.gradient.addColorStop(0, 'skyblue');
        this.gradient.addColorStop(1, 'green');
        this.stage.fillStyle = this.gradient;
        this.stage.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.stage.save();
    }

    drawBall() {
        this.stage.moveTo(mCircle.x, mCircle.y);
        this.stage.beginPath();
        this.stage.arc(mCircle.x, mCircle.y, mCircle.r, 0, Math.PI * 2, true);
        this.stage.closePath();
        this.stage.fillStyle = '#000000';
        this.stage.fill();
    }

    animateBall() {
        this.stage.restore();
        this.stage.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.stage.save();
        this.drawBall();
    }

    animate(startTime) {
        if (!that.continue) return;
        // update
        let time = (new Date()).getTime() - that.startTime || startTime;
       
        let nextY = that.amplitude * Math.sin(time * 2 * Math.PI / period1) + that.centerY;

        mCircle.y = nextY;
        that.animateBall();
        that.startTime = startTime;
        // request new frame
        requestAnimFrame(() => that.animate(startTime));
    }

}


window.requestAnimFrame = ((callback) => {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

let moveBall = new MoveBall();
moveBall.init();