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
}
export default Ellipse;