<template>
  <canvas
    id="Canvas"
    width="800"
    height="600"
    @mousedown="canvasClicked($event)"
    @mousemove="canvasMove($event)"
    @mouseup="canvasUp($event)"
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
    let ctx = canvas.getContext("2d");
    let myCanvas = new MyCanvas(ctx);
    this.myCanvas = myCanvas;
    myCanvas.createRect(0, 100, 0, 100);
    myCanvas.createEllipse(200, 300, 200, 300);
    myCanvas.createParallelogram(400, 500, 400, 500);
    myCanvas.displayList.forEach((item) => {
      item.fill = true;
    });
    myCanvas.displayList[0].setColor("red");
    myCanvas.displayList[1].setColor("green");
    myCanvas.displayList[2].setColor("blue");
    myCanvas.drawAll();
  },
  methods: {
    canvasClicked(event) {
      this.myCanvas.mouseDown(event.clientX, event.clientY);
      this.myCanvas.drawAll();
    },
    canvasMove(event) {
      this.myCanvas.mouseMove(event.clientX, event.clientY);
      this.myCanvas.drawAll();
    },
    canvasUp(event) {
      this.myCanvas.mouseUp(event.clientX, event.clientY);
      this.myCanvas.drawAll();
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