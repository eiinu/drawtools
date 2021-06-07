import ShapeObject from './ShapeObject.class.js'
class Line extends ShapeObject {
    constructor(left, right, top, bottom) {
        super(left, right, top, bottom);
        this.shape = 'Line';
        this.direction = true;
    }
    setDirection(bool) {
        this.direction = bool;
    }
    draw() {
        super.draw();
        this.ctx.beginPath();
        if (this.direction) {
            this.ctx.moveTo(this.left, this.bottom);
            this.ctx.lineTo(this.right, this.top);
            this.ctx.stroke();
        }
        else {
            this.ctx.moveTo(this.left, this.top);
            this.ctx.lineTo(this.right, this.bottom);
            this.ctx.stroke();
        }
    }
    clone(obj) {
        let res = new Line(obj.left, obj.right, obj.top, obj.bottom);
        res.direction = obj.direction;
        res.ctx = obj.ctx;
        res.fill = obj.fill;
        res.color = obj.color;
        return res;
    }
    toJson() {
        let obj = super.toJson();
        obj.direction = this.direction;
        return obj;
    }
}
export default Line;