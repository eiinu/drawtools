class Rect extends ShapeObject {
    constructor(left, right, top, bottom) {
        super(left, right, top, bottom);
        this.shape = 'rect';
    }
    draw() {
        if (this.fillStyle) {
            this.ctx.fillRect(this.left, this.top, this.right - this.left, this.bottom - this.top);
        }
        else {
            this.ctx.strokeRect(this.left, this.top, this.right - this.left, this.bottom - this.top);
        }
    }
}