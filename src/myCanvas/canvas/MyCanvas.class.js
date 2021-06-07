import Diamond from '../shape/Diamond.class.js';
import Ellipse from '../shape/Ellipse.class.js';
import Blank from '../shape/Blank.class.js';
import Parallelogram from '../shape/Parallelogram.class.js';
import Rect from '../shape/Rect.class.js';
import Triangle from '../shape/Triangle.class.js';
import Text from '../shape/Text.class.js'
import Line from '../shape/Line.class.js';
class MyCanvas {
    constructor(canvasElem) {
        this.canvas = canvasElem;
        this.ctx = canvasElem.getContext("2d");
        this.displayList = []; // 用栈的形式存储绘图步骤
        this.currentSelected = new Set();
        this.color = '#000000'; // 默认画笔颜色
        this.window = window;
        this.document = document;
        this.shiftPressed = false;
        this.isDrawing = false; // 是否每帧都重绘
        this.status = 0;    // 所有绘图状态
        // 0: 默认状态
        // 1: mouseDown 鼠标按下
        // 2: mouseDown => selected 选中图元
        // 3: mouseDown => selected => mouseMove    选中图元并移动
        // 4: mouseDown => selected => mouseMove => mouseUp 选中图元移动后停止
        // 5: mouseDown => none 未选中图元
        // 6: mouseDown => none => mouseMove    拉伸选择框
        // 7: mouseDown => none => mouseMove => mouseUp     停止，选中多个图元
        //初始化一个选择框，默认不显示
        let selectFrame = new Blank();
        selectFrame.setColor('blue');
        selectFrame.ctx = this.ctx;
        this.displayList.push(selectFrame);

        // 检测 shift 按键状态
        let that = this;
        this.window.addEventListener('keydown', (e) => {
            if (e.key === 'Shift') {
                that.shiftPressed = true;
            }
        })
        this.window.addEventListener('keyup', (e) => {
            if (e.key === 'Shift') {
                that.shiftPressed = false;
            }
        })
        this.canvas.style.cursor = 'se-resize';
        this.canvasStack = [[]];

        function mouseDown(e) {
            let x = e.clientX;
            let y = e.clientY;
            this.status = 1;
            this.mouseDownX = x;
            this.mouseDownY = y;

            if (!this.resizeing) {
                let sig = false;
                if (this.currentSelected.size > 1) {
                    // 当前有多个正在选中，判断点击位置所在图元是否为选中图元
                    this.currentSelected.forEach((item) => {
                        if (item.catch(x, y)) {
                            if (this.shiftPressed) {
                                item.isSelected = false;
                                this.currentSelected.delete(item);
                                sig = true;
                                this.status = 0;
                            }
                            else {
                                sig = true;
                                this.status = 2;
                            }
                        }
                    })
                }
                // 当前点击位置所在图元不在选中列表里
                if (!sig) {
                    // 当前点击位置有图元
                    for (let i = this.displayList.length - 1; i > 0; i--) {
                        if (!sig && this.displayList[i].catch(x, y)) {
                            if (!this.shiftPressed) {
                                this.currentSelected.forEach((item) => {
                                    item.isSelected = false;
                                })
                                this.currentSelected.clear();
                            }
                            this.displayList[i].isSelected = true;
                            this.currentSelected.add(this.displayList[i]);
                            sig = true;
                            this.status = 2;
                        }
                    }
                    // 当前点击位置没有图元，应该显示拖拽选择框
                    if (!sig) {
                        if (this.shiftPressed) {
                            this.status = 0;
                        }
                        else {
                            this.status = 5;
                            this.displayList[0].isSelected = true;
                            this.displayList[0].setFrame(x, x, y, y);
                        }
                    }
                }
            }
            this.drawAll();
        }
        function mouseMove(e) {
            let x = e.clientX;
            let y = e.clientY;
            let sig = false;
            this.currentSelected.forEach((item) => {
                if (item.catchRightBottom(x, y)) {
                    sig = true;
                    this.canvas.style.cursor = 'se-resize';
                    this.resizeing = true;
                }
            })
            if (!sig) {
                this.canvas.style.cursor = 'auto';
                this.resizeing = false;
            }
            if (this.status === 2 || this.status === 3) {
                this.status = 3;
                this.currentSelected.forEach((item) => {
                    item.setFrameAdd(x - this.mouseDownX, x - this.mouseDownX, y - this.mouseDownY, y - this.mouseDownY);
                })
                this.mouseDownX = x;
                this.mouseDownY = y;
                this.drawAll();
            }
            else if (this.status === 5 || this.status === 6) {
                this.status = 6;
                let t = this.displayList[0];
                t.setFrame(t.left, x, t.top, y);
                this.drawAll();
            }
        }
        function mouseUp(e) {
            let x = e.clientX;
            let y = e.clientY;
            if (!this.resizeing) {
                if (this.status === 2 || this.status === 3) {
                    this.status = 0;
                    this.save();
                }
                else if (this.status === 5 || this.status === 6) {
                    this.status = 0;
                    this.currentSelected.clear();
                    for (let i = 1; i < this.displayList.length; i++) {
                        let item = this.displayList[i];
                        if (item.catchedByRect(Math.min(x, this.mouseDownX), Math.max(x, this.mouseDownX), Math.min(y, this.mouseDownY), Math.max(y, this.mouseDownY))) {
                            item.isSelected = true;
                            this.currentSelected.add(item);
                        }
                        else {
                            item.isSelected = false;
                        }
                    }
                    this.displayList[0].isSelected = false;
                }
            }
            this.drawAll();
        }
        let mouseDownFunc = mouseDown.bind(this);
        let mouseMoveFunc = mouseMove.bind(this);
        let mouseUpFunc = mouseUp.bind(this);
        // 绑定四种基本操作
        this.window.addEventListener('mousedown', mouseDownFunc);
        this.window.addEventListener('mousemove', mouseMoveFunc);
        this.window.addEventListener('mouseup', mouseUpFunc);
        this.window.addEventListener('mouseleave', mouseUpFunc);
    }
    save() {
        console.log('save', this.canvasStack.length);
        let list = [];
        this.displayList.forEach((item) => {
            list.push(item.clone(item));
        })
        this.canvasStack.push(list);
    }
    restore() {
        if (this.canvasStack.length >= 2) {
            console.log('restore to', this.canvasStack.length - 2);
            let list = this.canvasStack[this.canvasStack.length - 2];
            this.displayList = [];
            list.forEach((item) => {
                this.displayList.push(item.clone(item));
            })
            this.canvasStack.pop();
            this.currentSelected.clear();
            this.drawAll();
        }
    }
    setColor(color) {
        this.color = color;
    }
    createRect(left, right, top, bottom) {
        let rect = new Rect(left, right, top, bottom);
        rect.ctx = this.ctx;
        rect.setColor(this.color);
        this.displayList.push(rect);
        this.save();
    }
    createDiamond(left, right, top, bottom) {
        let diamond = new Diamond(left, right, top, bottom);
        diamond.ctx = this.ctx;
        diamond.setColor(this.color);
        this.displayList.push(diamond);
        this.save();
    }
    createEllipse(left, right, top, bottom) {
        let ellipse = new Ellipse(left, right, top, bottom);
        ellipse.ctx = this.ctx;
        ellipse.setColor(this.color);
        this.displayList.push(ellipse);
        this.save();
    }
    createParallelogram(left, right, top, bottom) {
        let parallelogram = new Parallelogram(left, right, top, bottom);
        parallelogram.ctx = this.ctx;
        parallelogram.setColor(this.color);
        this.displayList.push(parallelogram);
        this.save();
    }
    createTriangle(left, right, top, bottom) {
        let triangle = new Triangle(left, right, top, bottom);
        triangle.ctx = this.ctx;
        triangle.setColor(this.color);
        this.displayList.push(triangle);
        this.save();
    }
    createText(left, right, top, bottom, str) {
        let text = new Text(left, right, top, bottom);
        text.setText(str);
        text.ctx = this.ctx;
        text.setColor(this.color);
        this.displayList.push(text);
        this.save();
    }
    createLine(left, right, top, bottom, bool) {
        let line = new Line(left, right, top, bottom);
        line.setDirection(bool);
        line.ctx = this.ctx;
        line.setColor(this.color);
        this.displayList.push(line);
        this.save();
    }
    // 回退一步
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
        this.status = 1;
        this.mouseDownX = x;
        this.mouseDownY = y;

        if (!this.resizeing) {
            let sig = false;
            if (this.currentSelected.size > 1) {
                // 当前有多个正在选中，判断点击位置所在图元是否为选中图元
                this.currentSelected.forEach((item) => {
                    if (item.catch(x, y)) {
                        if (this.shiftPressed) {
                            item.isSelected = false;
                            this.currentSelected.delete(item);
                            sig = true;
                            this.status = 0;
                        }
                        else {
                            sig = true;
                            this.status = 2;
                        }
                    }
                })
            }
            // 当前点击位置所在图元不在选中列表里
            if (!sig) {
                // 当前点击位置有图元
                for (let i = this.displayList.length - 1; i > 0; i--) {
                    if (!sig && this.displayList[i].catch(x, y)) {
                        if (!this.shiftPressed) {
                            this.currentSelected.forEach((item) => {
                                item.isSelected = false;
                            })
                            this.currentSelected.clear();
                        }
                        this.displayList[i].isSelected = true;
                        this.currentSelected.add(this.displayList[i]);
                        sig = true;
                        this.status = 2;
                    }
                }
                // 当前点击位置没有图元，应该显示拖拽选择框
                if (!sig) {
                    if (this.shiftPressed) {
                        this.status = 0;
                    }
                    else {
                        this.status = 5;
                        this.displayList[0].isSelected = true;
                        this.displayList[0].setFrame(x, x, y, y);
                    }
                }
            }
        }
        this.drawAll();
    }
    mouseMove(x, y) {
        let sig = false;
        this.currentSelected.forEach((item) => {
            if (item.catchRightBottom(x, y)) {
                sig = true;
                this.canvas.style.cursor = 'se-resize';
                this.resizeing = true;
            }
        })
        if (!sig) {
            this.canvas.style.cursor = 'auto';
            this.resizeing = false;
        }
        if (this.status === 2 || this.status === 3) {
            this.status = 3;
            this.currentSelected.forEach((item) => {
                item.setFrameAdd(x - this.mouseDownX, x - this.mouseDownX, y - this.mouseDownY, y - this.mouseDownY);
            })
            this.mouseDownX = x;
            this.mouseDownY = y;
            this.drawAll();
        }
        else if (this.status === 5 || this.status === 6) {
            this.status = 6;
            let t = this.displayList[0];
            t.setFrame(t.left, x, t.top, y);
            this.drawAll();
        }
    }
    mouseUp(x, y) {
        if (!this.resizeing) {
            if (this.status === 2 || this.status === 3) {
                this.status = 0;
                this.save();
            }
            else if (this.status === 5 || this.status === 6) {
                this.status = 0;
                this.currentSelected.clear();
                for (let i = 1; i < this.displayList.length; i++) {
                    let item = this.displayList[i];
                    if (item.catchedByRect(Math.min(x, this.mouseDownX), Math.max(x, this.mouseDownX), Math.min(y, this.mouseDownY), Math.max(y, this.mouseDownY))) {
                        item.isSelected = true;
                        this.currentSelected.add(item);
                    }
                    else {
                        item.isSelected = false;
                    }
                }
                this.displayList[0].isSelected = false;
            }
        }
        this.drawAll();
    }
    mouseLeave(x, y) {
        this.mouseUp(x, y);
    }
}

export default MyCanvas;