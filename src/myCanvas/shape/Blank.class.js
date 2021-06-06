import ShapeObject from './ShapeObject.class.js'
class Blank extends ShapeObject {
    constructor(left, right, top, bottom) {
        super(left, right, top, bottom);
        this.shape = 'blank';
    }
    clone(obj) {
        let res = new Blank(obj.left, obj.right, obj.top, obj.bottom);
        res.ctx = obj.ctx;
        res.fill = obj.fill;
        res.color = obj.color;
        return res;
    }
}
export default Blank;