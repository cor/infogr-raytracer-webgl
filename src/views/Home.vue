<template>
  <div class="home">
    <h1>INFOGR Raytracer WebGL</h1>
    <h2><a href="https://github.com/cor">cor</a> & <a href="https://github.com/kaiserkarel">kaiserkarel</a></h2>
    <div class="tablink-container">
      <button class="tablink" v-for="movie in movies" :key="movie.id" v-on:click="playMovie(movie)">{{movie.id}}</button>
    </div>
    <canvas id="glCanvas" width="800" height="800"></canvas>
  </div>
</template>

<script>
import Raytracer from '../raytracer'

import rectangleMovie from '../raytracer/movies/rectangle-movie.js'
import circleMovie from '../raytracer/movies/circle-movie.js'

export default {
  name: 'Home',
  data () {
    return {
      frameId: null,
      startTime: 0,
      raytracer: null,
      movies: [circleMovie(), rectangleMovie()]
    }
  },
  methods: {
    playMovie (movie) {
      if (this.frameId !== null) {
        cancelAnimationFrame(this.frameId)
      }

      this.startTime = null

      const canvas = document.querySelector('#glCanvas')
      const gl = canvas.getContext('webgl')

      // Notify users of browsers that do not support WebGL
      if (gl === null) {
        alert('Unable to initialize WebGL. Your browser or machine may not support it.')
      }

      this.raytracer = new Raytracer(gl, movie.shaderSourceVars)

      const render = (now) => {
        now *= 0.001 // convert to seconds
        if (this.startTime === null) {
          this.startTime = now
        }

        const time = 0.0001 + now - this.startTime
        this.raytracer.drawScene(movie.currentScene(time))
        this.frameId = requestAnimationFrame(render)
      }
      this.frameId = requestAnimationFrame(render)
    }
  }
}
</script>

<style lang="scss">

  $gray: #111;
  $dark-gray: #222;
  $border-width: 4px;

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

  /* Style tab links */
  .tablink {
    background-color: $gray;
    color: white;
    float: left;
    border: none;
    outline: none;
    cursor: pointer;
    padding: 14px 16px;
    font-size: 17px;
    /*width: 400px;*/
    flex: 1;

    border: solid $dark-gray;
    border-width: $border-width $border-width 0 $border-width;
  }

  .tablink-container {
    display: flex;
    width: 800px + 2 * $border-width;
    margin: 0 auto;
  }
  .tablink:hover {
    background-color: #777;
  }

  canvas {
    border: solid $dark-gray;
    border-width: 0 $border-width $border-width $border-width;
  }
</style>
