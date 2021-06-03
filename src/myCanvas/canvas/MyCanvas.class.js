import Diamond from '../shape/Diamond.class.js';
import Ellipse from '../shape/Ellipse.class.js';
import Parallelogram from '../shape/Parallelogram.class.js';
import Rect from '../shape/Rect.class.js';
import Triangle from '../shape/Triangle.class.js';
class MyCanvas {
    constructor(canvasContext) {
        this.ctx = canvasContext;
        this.displayList = []; // 用栈的形式存储绘图步骤
        this.color = '#000000'; // 默认画笔颜色
        this.window = window;
        this.document = document;
        this.isDrawing = false;
    }
    setColor(color) {
        this.color = color;
    }
    createRect(left, right, top, bottom) {
        let rect = new Rect(left, right, top, bottom);
        rect.ctx = this.ctx;
        rect.setColor(this.color);
        this.displayList.push(rect);
    }
    createDiamond(left, right, top, bottom) {
        let diamond = new Diamond(left, right, top, bottom);
        diamond.ctx = this.ctx;
        diamond.setColor(this.color);
        this.displayList.push(diamond);
    }
    createEllipse(left, right, top, bottom) {
        let ellipse = new Ellipse(left, right, top, bottom);
        ellipse.ctx = this.ctx;
        ellipse.setColor(this.color);
        this.displayList.push(ellipse);
    }
    createParallelogram(left, right, top, bottom) {
        let parallelogram = new Parallelogram(left, right, top, bottom);
        parallelogram.ctx = this.ctx;
        parallelogram.setColor(this.color);
        this.displayList.push(parallelogram);
    }
    createTriangle(left, right, top, bottom) {
        let triangle = new Triangle(left, right, top, bottom);
        triangle.ctx = this.ctx;
        triangle.setColor(this.color);
        this.displayList.push(triangle);
    }
    // 回退一步
    undo() {
        if (this.displayList.length > 0) {
            this.displayList.pop();
            return true;
        }
        else {
            return false;
        }
    }
    printAll() {
        this.displayList.forEach((item) => {
            console.log(item.shape);
        })
    }
    // 重绘一次
    drawAll() {
        this.ctx.clearRect(0, 0, 800, 600);
        this.displayList.forEach((item) => {
            item.draw();
        });
    }
    // 当 isDrawing 为 true 时每一帧重绘一次
    drawAnimation() {
        if (this.isDrawing) {
            console.log(Date.now());
            this.ctx.clearRect(0, 0, 800, 600);
            this.displayList.forEach((item) => {
                item.draw();
            });
            let drawFunc = this.drawAnimation.bind(this);
            window.requestAnimationFrame(drawFunc);
        }

    }
    // 开启每一帧重绘一次
    beginDraw() {
        this.isDrawing = true;
        let drawFunc = this.drawdrawAnimation.bind(this);
        this.animationFrameId = this.window.requestAnimationFrame(drawFunc);
    }
    // 结束每一帧重绘一次，即画面不刷新。
    endDraw() {
        this.isDrawing = false;
    }
    // 点击事件
    mouseDown(x, y) {
        this.mousePressed = true;
        this.mouseDownX = x;
        this.mouseDownY = y;
        for (let i = 0; i < this.displayList.length; i++) {
            if (this.displayList[i].catch(x, y)) {
                this.displayList[i].isSelected = true;
                this.currentSelected = this.displayList[i];
                this.left = this.currentSelected.left;
                this.right = this.currentSelected.right;
                this.top = this.currentSelected.top;
                this.bottom = this.currentSelected.bottom;
            }
            else {
                this.displayList[i].isSelected = false;
            }
        }
    }
    mouseMove(x, y) {
        if (this.mousePressed && this.currentSelected) {
            this.currentSelected.setRect(this.left + x - this.mouseDownX, this.right + x - this.mouseDownX, this.top + y - this.mouseDownY, this.bottom + y - this.mouseDownY);
        }
    }
    mouseUp() {
        this.mousePressed = false;
        this.currentSelected = null;
    }

}

export default MyCanvas;