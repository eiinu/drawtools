<template>
  <canvas id="myCanvas" width="800" height="600"></canvas>
</template>
<script>
export default {
  name: "MyCanvas",
  data() {
    return {
      data: [],
    };
  },
  mounted() {
    let canvas = document.getElementById("myCanvas");
    let ctx = canvas.getContext("2d");
    let displayList = [
      {
        x: 0,
        y: 0,
        width: 100,
        height: 100,
        speed: {
          x: 2,
          y: 2,
        },
        draw() {
          ctx.beginPath();
          if (this.x >= 700) {
            this.speed.x = -2;
          } else if (this.x <= 0) {
            this.speed.x = 2;
          }
          if (this.y >= 500) {
            this.speed.y = -2;
          } else if (this.y <= 0) {
            this.speed.y = 2;
          }
          this.x += this.speed.x;
          this.y += this.speed.y;
          ctx.rect(this.x, this.y, this.width, this.height);
          ctx.stroke();
        },
      },
      {
        x: 100,
        y: 100,
        width: 100,
        height: 100,
        speed: {
          x: 2,
          y: 2,
        },
        draw() {
          ctx.beginPath();
          if (this.x >= 700) {
            this.speed.x = -2;
          } else if (this.x <= 0) {
            this.speed.x = 2;
          }
          if (this.y >= 500) {
            this.speed.y = -2;
          } else if (this.y <= 0) {
            this.speed.y = 2;
          }
          this.x += this.speed.x;
          this.y += this.speed.y;
          ctx.ellipse(
            (this.x + this.width) / 2,
            (this.y + this.height) / 2,
            this.width / 2,
            this.height / 2,
            0,
            0,
            2 * Math.PI
          );
          ctx.stroke();
        },
      },
    ];
    function drawAll() {
      ctx.clearRect(0, 0, 800, 600);
      displayList.forEach((item) => {
        item.draw();
      });
      window.requestAnimationFrame(drawAll);
    }
    window.requestAnimationFrame(drawAll);
  },
};
</script>
<style lang="less" scoped>
canvas {
  width: 800px;
  height: 600px;
  border: 1px solid red;
}
</style>