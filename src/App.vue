<template>
  <Layout />
</template>

<script>
import Layout from "./components/Layout.vue";

export default {
  name: "App",
  components: {
    Layout,
  },
};
</script>

<style lang="less">
:root {
  --card-bg-color: #ffffff;
  --page-bg-color: #f5f5f5;
  --font-color: #333333;
  --icon-color: #000;
  --border-color: #d9d9d9;
  --progress-bg-color: #ebeef5;
  --theme-color: #8a50f4;
}
html,
body {
  width: 100%;
  height: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
a {
  text-decoration: none;
}
li {
  list-style: none;
}
</style>
