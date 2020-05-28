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

    <div class="description">
      <p>
        Above you will find two movies; which are actively ray traced withn a WebGL fragment shader. The tracer operates in two dimensions, shooting a ray at each pixel every single frame. WebGL is easily capable of performing this operation at 60FPS, as opposed to traditional CPU implementations. Our CPU-based <a href="https://github.com/cor/infogr-raytracer">C# version</a>, from which we originally ported the core logic, runs at a mere 5FPS. We've ported that shader to OpenGL, which supports a more modern shading language, in order to hit 60FPS.
      </p>
      <p>
        We wanted to run this project on the web, which is why we ported it to WebGL. However, due to WebGL's limited support for shaders, we wrote our own shader preprocessor in order to add variable-sized arrays to GLSL 1.0
      </p>
      <p>
        The movie consists of a set of static scenes, which are interpolated to generate fluid motion.
      </p>
    </div>
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
  $highlight-color: #806f69;

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
    color: inherit;
    text-decoration: none;
    font-weight: bold;
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

      &:hover {
        border-color: $highlight-color;
      }
    }
  }

  .tablink-container {
    display: flex;
    width: 800px + 2 * $border-width;
    margin: 0 auto;
  }

  canvas {
    border: solid $highlight-color;
    border-width: 0 $border-width $border-width $border-width;
  }

  .description {
    width: 800px;
    text-align: left;
    margin: 0 auto;
    font-weight: bold;

    a {
      color: inherit;
      font-weight: bolder;
    }
  }

</style>
