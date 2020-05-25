<template>
  <div class="home">
    <h1>INFOGR Raytracer WebGL</h1>
    <canvas id="glCanvas" width="600" height="600"></canvas>
<!--    <div class="gameObject-container">-->

<!--      <div class="gameObject" v-for="(light, index) in scene.lights" :key="index">-->
<!--        <h2>Light {{index + 1}}</h2>-->
<!--        <div class="gameObject__property">-->
<!--          X: <input type="number" step="0.1" v-model.number="light.position[0]">-->
<!--          Y: <input type="number" step="0.1" v-model.number="light.position[1]">-->
<!--        </div>-->

<!--        <div class="gameObject__property">-->
<!--          R: <input type="number" step="0.1" v-model.number="light.color[0]">-->
<!--          G: <input type="number" step="0.1" v-model.number="light.color[1]">-->
<!--          B: <input type="number" step="0.1" v-model.number="light.color[2]">-->
<!--        </div>-->
<!--      </div>-->

<!--      <button @click="addLight()">Add Light</button>-->
<!--    </div>-->
<!--    <div class="gameObject-container">-->
<!--      <div class="gameObject" v-for="(circle, index) in scene.circles" :key="index">-->
<!--        <h2>Circle {{index + 1}}</h2>-->
<!--        <div class="gameObject__property">-->
<!--          X: <input type="number" step="0.01" v-model.number="circle.position[0]">-->
<!--          Y: <input type="number" step="0.01" v-model.number="circle.position[1]">-->
<!--        </div>-->

<!--        <div class="gameObject__property">-->
<!--          R: <input type="number" step="0.01" v-model.number="circle.radius">-->
<!--        </div>-->
<!--      </div>-->

<!--      <button @click="addCircle()">Add Circle</button>-->
<!--    </div>-->
  </div>
</template>

<script>
import Raytracer from '../raytracer'
import Scene from '../raytracer/scene.js'
// import Movie from '../raytracer/movie.js'

import movie0 from '../raytracer/movies/movie0.js'

export default {
  name: 'Home',
  data () {
    return {
      scene: new Scene(),
      raytracer: null,
      movie: movie0()
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
    // TODO: Rewrite such that movie defines shader source vars
    this.raytracer = new Raytracer(gl, this.movie.scenes[0].shaderSourceVars())

    // Play the movie
    let time = 0
    const render = (now) => {
      now *= 0.001 // convert to seconds
      time += now - time
      this.raytracer.drawScene(this.movie.currentScene(time))
      requestAnimationFrame(render)
    }
    requestAnimationFrame(render)
  },
  methods: {
    addLight () {
      console.log('Recompiling shader')
      this.scene.addLight()
      this.raytracer.recompileShader(this.scene.shaderSourceVars())
    },
    addCircle () {
      console.log('Recompiling shader')
      this.scene.addCircle()
      this.raytracer.recompileShader(this.scene.shaderSourceVars())
    }
  },
  watch: {
    scene: {
      handler: function () {
        console.log('booh')
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

    button {
      display: inline-block;
      border: none;
      padding: 1rem 2rem;
      margin: 0;
      text-decoration: none;
      background: #333;
      color: #ffffff;
      font-family: sans-serif;
      font-size: 1rem;
      cursor: pointer;
      text-align: center;
    }
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
