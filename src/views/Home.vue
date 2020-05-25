<template>
  <div class="home">
    <h1>INFOGR Raytracer WebGL</h1>
    <h2><a href="https://github.com/cor">cor</a> & <a href="https://github.com/kaiserkarel">kaiserkarel</a></h2>
    <canvas id="glCanvas" width="800" height="800"></canvas>
  </div>
</template>

<script>
import Raytracer from '../raytracer'

import movie0 from '../raytracer/movies/movie0.js'

export default {
  name: 'Home',
  data () {
    return {
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
    this.raytracer = new Raytracer(gl, this.movie.shaderSourceVars)

    this.playMovie()
  },
  methods: {
    playMovie () {
      let time = 0
      const render = (now) => {
        now *= 0.001 // convert to seconds
        time += now - time
        this.raytracer.drawScene(this.movie.currentScene(time))
        requestAnimationFrame(render)
      }
      requestAnimationFrame(render)
    }
  }
}
</script>

<style lang="scss">
  .home {
    text-align: center;
  }
  h1 {
    margin-bottom: 0;
  }
  h2 {
    margin: 0 8px 16px 8px;
    font-size: 20px;
    a {
      color: inherit;
      &:visited {
        color: inherit;
      }
    }
  }
</style>
