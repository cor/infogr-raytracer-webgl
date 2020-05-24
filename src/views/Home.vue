<template>
  <div class="home">
    <h1>INFOGR Raytracer WebGL</h1>
    <canvas id="glCanvas" width="600" height="600"></canvas>
    <div class="light-container">
      <div class="light" v-for="(light, index) in scene.lights" :key="index">
        <h2>Light {{index + 1}}</h2>
        <div class="light__position">
          X: <input type="number" pattern="([0-9]{1,3}).([0-9]{1,3})" step="0.01" v-model="light.position[0]">
          Y: <input type="number" step="0.01" v-model="light.position[1]">
        </div>

        <div class="light__color">
          R: <input type="number" step="0.01" v-model="light.color[0]">
          G: <input type="number" step="0.01" v-model="light.color[1]">
          B: <input type="number" step="0.01" v-model="light.color[2]">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Raytracer from '../raytracer'
import Scene from '../raytracer/scene.js'

export default {
  name: 'Home',
  data () {
    return {
      scene: new Scene(),
      raytracer: null
    }
  },
  mounted () {
    // Get WebGL context
    const canvas = document.querySelector('#glCanvas')
    const gl = canvas.getContext('webgl')

    // Notify users of browsers that do not support WebGL
    if (gl === null) {
      alert('Unable to initialize WebGL. Your browser or machine may not support it.')
    }

    // Create raytracer
    this.raytracer = new Raytracer(gl)
    this.raytracer.drawScene(this.scene)
  },
  watch: {
    scene: {
      handler: function () {
        console.log('redrawing scene')
        this.raytracer.drawScene(this.scene)
      },
      deep: true
    }
  }
}
</script>

<style lang="scss">
  .home {
    text-align: center;
  }

  .light-container {
    text-align: center;
    width: auto;
    display: flex;
    flex-direction: column;
  }
  .light {
    display: inline-block;
    h2 {
      display: inline-block;
      margin-right: 64px;
    }
    div {
      display: inline-block;
      margin-right: 64px;

      &:last-child {
        margin-right: 0;
      }
    }
    font-weight: bold;

    input {
      background-color: #333;
      color: white;
      font-size: 16px;
      font-weight: bold;
      width: 50px;
      border: none;
      padding: 4px 8px;
      margin-right: 16px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
</style>
