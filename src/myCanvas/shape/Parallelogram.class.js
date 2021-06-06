import ShapeObject from './ShapeObject.class.js'
class Parallelogram extends ShapeObject {
    constructor(left, right, top, bottom) {
        super(left, right, top, bottom);
        this.shape = 'parallelogram';
    }
    draw() {
        super.draw();
        let r = (this.right - this.left) / 4;
        this.ctx.beginPath();
        this.ctx.moveTo(this.left + r, this.top);
        this.ctx.lineTo(this.left, this.bottom);
        this.ctx.lineTo(this.right - r, this.bottom);
        this.ctx.lineTo(this.right, this.top);
        this.ctx.closePath();
        if (this.fill) {
            this.ctx.fill();
        } else {
            this.ctx.stroke();
        }
    }
    clone(obj) {
        let res = new Parallelogram(obj.left, obj.right, obj.top, obj.bottom);
        res.ctx = obj.ctx;
        res.fill = obj.fill;
        res.color = obj.color;
        return res;
    }
}
export default Parallelogram;