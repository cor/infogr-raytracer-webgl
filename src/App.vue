<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
:root {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  /*color: #1c1c1c;*/
}

@media (prefers-color-scheme: dark) {
  :root {
    --primary-font-color: #aaa;
    --secondary-font-color: #777;
    color: #ccc;
    background-color: #000;
    --table-zebra-color: #333;
    --table-hover-color: #444;
    --hover-color: #333;
  }
}
</style>
