<template>
  <div class="home">
    <h1>INFOGR Raytracer WebGL</h1>
    <h2><a href="https://github.com/cor">cor</a> & <a href="https://github.com/kaiserkarel">kaiserkarel</a></h2>
    <div class="tablink-container">
      <router-link
        class="tablink"
        v-for="(movie, index) in movies" :key="movie.id"
        :to="{name: 'Movie', params: {id: index}}"
      >{{movie.id}}</router-link>
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

  watch: {
    $route (to, from) {
      this.playMovie(this.movies[this.id || 0])
    }
  },

  props: {
    id: Number
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
  $highlight-color: #DFCFBE;

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
    border-radius: 16px 16px 0 0;
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
    border-width: $border-width;

    &.router-link-active {
      border-color: $highlight-color;
      border-bottom-color: $gray;
    }
    &:not(.router-link-active) {
      border-bottom-color: $highlight-color;
    }
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
    border: solid $highlight-color;
    border-width: 0 $border-width $border-width $border-width;
  }

</style>
