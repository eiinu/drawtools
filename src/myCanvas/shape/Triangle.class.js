class Triangle extends ShapeObject {
    constructor(left, right, top, bottom) {
        super(left, right, top, bottom);
        this.shape = 'triangle';
    }
    draw() {
        this.ctx.beginPath();
        this.ctx.moveTo(this.left, this.bottom);
        this.ctx.lineTo((this.left + this.right) / 2, this.top);
        this.ctx.lineTo(this.right, this.bottom)
        this.ctx.closePath();
        this.ctx.stroke();
    }
}