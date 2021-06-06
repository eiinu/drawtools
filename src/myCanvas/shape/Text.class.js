import ShapeObject from './ShapeObject.class.js'
class Text extends ShapeObject {
    constructor(left, right, top, bottom) {
        super(left, right, top, bottom);
        this.shape = 'text';
        this.text = '默认文字';
        this.color = 'black';
    }
    setText(str) {
        this.text = str;
    }
    draw() {
        super.draw();
        this.ctx.font = (this.bottom - this.top) + 'px STHeiTi, SimHei';
        let measure = this.ctx.measureText(this.text);
        this.right = Math.ceil(this.left + measure.width);
        this.ctx.fillText(this.text, this.left, this.bottom - measure.actualBoundingBoxDescent, this.right - this.left);
    }
    clone(obj) {
        let res = new Text(obj.left, obj.right, obj.top, obj.bottom);
        res.text = obj.text;
        res.ctx = obj.ctx;
        res.fill = obj.fill;
        res.color = obj.color;
        return res;
    }
}
export default Text;