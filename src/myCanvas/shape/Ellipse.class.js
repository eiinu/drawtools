import ShapeObject from './ShapeObject.class.js'
class Ellipse extends ShapeObject {
    constructor(left, right, top, bottom) {
        super(left, right, top, bottom);
        this.shape = 'ellipse';
    }
    draw() {
        super.draw();
        this.ctx.beginPath();
        if (this.shape === 'ellipse') {
            this.ctx.ellipse((this.left + this.right) / 2, (this.top + this.bottom) / 2, (this.right - this.left) / 2, (this.bottom - this.top) / 2, 0, 0, 2 * Math.PI);
        }
        else if (this.shape === 'round') {
            let r = Math.max(this.right - this.left, this.bottom - this.top);
            this.ctx.ellipse(this.left + r, this.top + r, r, r, 0, 0, 2 * Math.PI);
        }
        if (this.fill) {
            this.ctx.fill();
        } else {
            this.ctx.stroke();
        }
    }
    clone(obj) {
        let res = new Ellipse(obj.left, obj.right, obj.top, obj.bottom);
        res.shape = obj.shape;
        res.ctx = obj.ctx;
        res.fill = obj.fill;
        res.color = obj.color;
        return res;
    }
}
export default Ellipse;