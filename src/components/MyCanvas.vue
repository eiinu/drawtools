<template>
  <canvas
    id="Canvas"
    width="800"
    height="600"
    @mousedown="canvasDown($event)"
    @mousemove="canvasMove($event)"
    @mouseup="canvasUp($event)"
    @mouseleave="canvasLeave($event)"
    @keydown="shiftDown($event)"
    @keypress="shiftUp($event)"
  ></canvas>
</template>
<script>
import MyCanvas from "../myCanvas/canvas/MyCanvas.class.js";
export default {
  name: "MyCanvas",
  data() {
    return {
      data: [],
      myCanvas: null,
    };
  },
  mounted() {
    let canvas = document.getElementById("Canvas");
    let myCanvas = new MyCanvas(canvas);
    window.myCanvas = myCanvas;
    this.myCanvas = myCanvas;
    this.myCanvas.setColor("red");
    myCanvas.createRect(0, 100, 0, 100);
    this.myCanvas.setColor("green");
    myCanvas.createEllipse(200, 300, 200, 300);
    this.myCanvas.setColor("blue");
    myCanvas.createParallelogram(400, 500, 400, 500);
    myCanvas.createText(200, 300, 400, 500, "测试");
    myCanvas.createLine(400, 500, 200, 300, false);
    myCanvas.createLine(400, 500, 200, 300, true);
    myCanvas.drawAll();
  },
  methods: {
    canvasDown(event) {
      this.myCanvas.mouseDown(event.clientX, event.clientY);
    },
    canvasMove(event) {
      this.myCanvas.mouseMove(event.clientX, event.clientY);
    },
    canvasUp(event) {
      this.myCanvas.mouseUp(event.clientX, event.clientY);
    },
    canvasLeave(event) {
      this.myCanvas.mouseLeave(event.clientX, event.clientY);
    },
    shiftDown(event) {
      console.log(event);
    },
    shiftUp(event) {
      console.log(event);
    },
  },
};
</script>
<style lang="less" scoped>
canvas {
  width: 800px;
  height: 600px;
  border: 1px solid red;
}
.canvas-container {
  width: 800px;
  height: 600px;
  overflow: hidden;
}
</style>