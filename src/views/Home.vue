<template>
  <div class="home">
    <h1>INFOGR Raytracer WebGL</h1>
    <h2><a href="https://github.com/cor">cor</a> & <a href="https://github.com/kaiserkarel">kaiserkarel</a></h2>
    <button class="tablink" v-for="movie in movies" :key="movie.id" v-on:click="playMovie(movie)">{{movie.id}}</button>
    <canvas id="glCanvas" width="800" height="800"></canvas>
  </div>
</template>

<script>
import Raytracer from '../raytracer'

import movie1 from '../raytracer/movies/movie1.js'
import movie0 from '../raytracer/movies/movie0.js'

export default {
  name: 'Home',
  data () {
    return {
      frameId: null,
      startTime: 0,
      raytracer: null,
      movies: [movie0(), movie1()]
    }
  },

  mounted () {
    this.playMovie(this.movies[0])
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
    background-color: #555;
    color: white;
    float: left;
    border: none;
    outline: none;
    cursor: pointer;
    padding: 14px 16px;
    font-size: 17px;
    width: 25%;
  }

  .tablink:hover {
    background-color: #777;
  }

</style>
