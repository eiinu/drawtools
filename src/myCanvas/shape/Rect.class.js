import ShapeObject from './ShapeObject.class.js'
class Rect extends ShapeObject {
    constructor(left, right, top, bottom) {
        super(left, right, top, bottom);
        this.shape = 'rect';
    }
    draw() {
        super.draw();
        if (this.fill) {
            this.ctx.fillRect(this.left, this.top, this.right - this.left, this.bottom - this.top);
        }
        else {
            this.ctx.strokeRect(this.left, this.top, this.right - this.left, this.bottom - this.top);
        }
    }
    clone(obj) {
        let res = new Rect(obj.left, obj.right, obj.top, obj.bottom);
        res.ctx = obj.ctx;
        res.fill = obj.fill;
        res.color = obj.color;
        return res;
    }
}
export default Rect;