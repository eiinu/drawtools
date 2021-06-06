import ShapeObject from './ShapeObject.class.js'
class Triangle extends ShapeObject {
    constructor(left, right, top, bottom) {
        super(left, right, top, bottom);
        this.shape = 'triangle';
    }
    draw() {
        super.draw();
        this.ctx.beginPath();
        this.ctx.moveTo(this.left, this.bottom);
        this.ctx.lineTo((this.left + this.right) / 2, this.top);
        this.ctx.lineTo(this.right, this.bottom)
        this.ctx.closePath();
        if (this.fill) {
            this.ctx.fill();
        } else {
            this.ctx.stroke();
        }
    }
    clone(obj) {
        let res = new Triangle(obj.left, obj.right, obj.top, obj.bottom);
        res.ctx = obj.ctx;
        res.fill = obj.fill;
        res.color = obj.color;
        return res;
    }
}
export default Triangle;