class Diamond extends ShapeObject {
    constructor(left, right, top, bottom) {
        super(left, right, top, bottom);
        this.shape = 'diamond';
    }
    draw() {
        let r1 = (this.left + this.right) / 2;
        let r2 = (this.top + this.bottom) / 2;
        this.ctx.beginPath();
        this.ctx.moveTo(r1, this.top);
        this.ctx.lineTo(this.left, r2);
        this.ctx.lineTo(r1, this.bottom);
        this.ctx.lineTo(this.right, r2);
        this.ctx.closePath();
        this.ctx.stroke();
    }
}