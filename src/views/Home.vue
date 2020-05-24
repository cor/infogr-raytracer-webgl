<template>
  <div class="home">
    <h1>INFOGR Raytracer WebGL</h1>
    <canvas id="glCanvas" width="600" height="600"></canvas>
    <div class="gameObject-container">

      <div class="gameObject" v-for="(light, index) in scene.lights" :key="index">
        <h2>Light {{index + 1}}</h2>
        <div class="gameObject__property">
          X: <input type="number" step="0.01" v-model="light.position[0]">
          Y: <input type="number" step="0.01" v-model="light.position[1]">
        </div>

        <div class="gameObject__property">
          R: <input type="number" step="0.01" v-model="light.color[0]">
          G: <input type="number" step="0.01" v-model="light.color[1]">
          B: <input type="number" step="0.01" v-model="light.color[2]">
        </div>
      </div>
    </div>
    <div class="gameObject-container">
      <div class="gameObject" v-for="(circle, index) in scene.circles" :key="index">
        <h2>Circle {{index + 1}}</h2>
        <div class="gameObject__property">
          X: <input type="number" step="0.01" v-model="circle.position[0]">
          Y: <input type="number" step="0.01" v-model="circle.position[1]">
        </div>

        <div class="gameObject__property">
          R: <input type="number" step="0.01" v-model="circle.radius">
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
    this.raytracer = new Raytracer(gl, this.scene.shaderSourceVars())
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

  .gameObject-container {
    text-align: center;
    width: auto;
    display: flex;
    flex-direction: column;
  }
  .gameObject {
    display: inline-block;
    h2 {
      display: inline-block;
      margin-right: 64px;
    }
    &__property {
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
