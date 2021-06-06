<template>
  <div class="layout">
    <MyCanvas />
    <div class="tools">
      <div class="tool-category">
        <i
          :class="
            (toolStatus === 'select' ? 'tool-on' : 'tool-off') +
            ' el-icon-thumb'
          "
          @click="toolStatus = 'select'"
        ></i>
        <i
          :class="
            (toolStatus === 'draw' ? 'tool-on' : 'tool-off') + ' el-icon-edit'
          "
          @click="toolStatus = 'draw'"
        ></i>
      </div>
      <i class="tool-card el-icon-back" hover="hover" @click="undo()"></i>
      <i class="tool-card"
        ><el-color-picker
          v-model="currentColor"
          @change="changeColor"
        ></el-color-picker
      ></i>
      <i
        class="tool-card el-icon-brush"
        hover="hover"
        @click="toolStatus = 'draw'"
      >
      </i>
      <i
        class="tool-card el-icon-news"
        hover="hover"
        @click="
          toolStatus = 'draw';
          showShapeSelector = !showShapeSelector;
        "
      >
        <div class="select-shape" v-if="showShapeSelector">
          <i class="shape">
            <svg
              class="svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 2v14H2V2h14zm0 15h1V1H1v16h15z"
                fill-rule="nonzero"
                fill-opacity="1"
                fill="#000"
                stroke="none"
              ></path>
            </svg> </i
          ><i class="shape"
            ><svg
              class="svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 17c4.418 0 8-3.582 8-8 0-4.418-3.582-8-8-8-4.418 0-8 3.582-8 8 0 4.418 3.582 8 8 8zm0-1c-3.866 0-7-3.134-7-7 0-3.866 3.134-7 7-7 3.866 0 7 3.134 7 7 0 3.866-3.134 7-7 7z"
                fill-rule="nonzero"
                fill-opacity="1"
                fill="#000"
                stroke="none"
              ></path></svg></i
          ><i class="shape"
            ><svg
              class="svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 1L0 17h18L9 1zM1.71 16L9 3.04 16.29 16H1.71z"
                fill-rule="evenodd"
                fill-opacity="1"
                fill="#000"
                stroke="none"
              ></path></svg></i
          ><i class="shape"
            ><svg
              class="svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.9 1.515L1.414 10 9.9 18.485 18.385 10 9.9 1.515zM0 10l9.9 9.9 9.899-9.9-9.9-9.9L0 10z"
                fill-rule="evenodd"
                fill-opacity="1"
                fill="#000"
                stroke="none"
              ></path></svg
          ></i>
          <i class="shape"
            ><svg
              class="svg"
              width="21"
              height="16"
              viewBox="0 0 21 16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.735 1L1.36 15h13.905L19.64 1H5.735zM5 0L0 16h16l5-16H5z"
                fill-rule="evenodd"
                fill-opacity="1"
                fill="#000"
                stroke="none"
              ></path></svg
          ></i>
        </div>
      </i>
      <i
        class="tool-card el-icon-copy-document"
        hover="hover"
        @click="toolStatus = 'select'"
      ></i>
      <i
        class="tool-card el-icon-printer"
        hover="hover"
        @click="toolStatus = 'select'"
      ></i>
    </div>
  </div>
</template>

<script>
import MyCanvas from "./MyCanvas.vue";
export default {
  name: "Layout",
  data() {
    return {
      data: [],
      toolStatus: "draw", // select/draw
      currentTool: "brush", // brush/
      currentColor: localStorage.brushColor
        ? localStorage.brushColor
        : "#000000",
      showShapeSelector: false,
    };
  },
  components: { MyCanvas },
  methods: {
    changeColor(newVal) {
      localStorage.brushColor = newVal;
    },
    undo() {
      window.myCanvas.restore();
    },
  },
};
</script>

<style lang="less">
.layout {
  width: 100%;
  height: 100%;
  position: relative;
  background: url("/bg.png") repeat;
  #canvas {
    width: 100%;
    height: 100%;
  }
  .tools {
    position: absolute;
    height: 60px;
    bottom: 10px;
    left: 50%;
    transform: translate(-50%, 0);
    background-color: #ffffff;
    border-radius: 14px;
    border: 1px solid var(--border-color);
    display: flex;
    justify-content: space-between;
    .tool-category {
      color: var(--font-color);
      border-right: 1px solid var(--border-color);
      height: 100%;
      width: 31px;
      text-align: center;
      display: flex;
      flex-direction: column;
      i {
        flex: 1;
        font-size: 20px;
        text-align: center;
        line-height: 30px;
        &:hover {
          cursor: pointer;
        }
        &:first-child {
          border-top-left-radius: 14px;
        }
        &:last-child {
          border-bottom-left-radius: 14px;
        }
        &.tool-on {
          background-color: var(--theme-color);
        }
      }
      hr {
        border: none;
        height: 1px;
        background-color: var(--border-color);
      }
    }
    .tool-card {
      color: var(--font-color);
      border-radius: 10px;
      background-color: var(--page-bg-color);
      width: 60px;
      text-align: center;
      line-height: 40px;
      font-size: 30px;
      margin: 10px;
      &[hover="hover"]:hover {
        background-color: var(--theme-color);
        cursor: pointer;
      }
    }
    .el-icon-news {
      position: relative;
      .select-shape {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translate(-50%, -150%);
        display: flex;
        border: 1px solid var(--border-color);
        background-color: #ffffff;
        border-radius: 14px;
        line-height: 30px;
        .shape {
          width: 30px;
          height: 30px;
          margin: 5px;
        }
      }
    }
  }
  .el-color-picker__trigger {
    width: 60px;
    height: 40px;
    border: none;
    padding: 0;
    .el-color-picker__color {
      border: none;
      .el-color-picker__color-inner {
        border-radius: 14px;
      }
    }
    .el-icon-arrow-down::before {
      content: "";
    }
  }
}
</style>
