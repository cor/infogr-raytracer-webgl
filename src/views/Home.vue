<template>
  <div class="home">
    <h1>INFOGR Index WebGL</h1>
    <canvas id="glCanvas" width="600" height="600"></canvas>
  </div>
</template>

<script>
import Raytracer from '../raytracer'

export default {
  name: 'Home',
  mounted () {
    // Get WebGL context
    const canvas = document.querySelector('#glCanvas')
    const gl = canvas.getContext('webgl')

    // Notify users of browsers that do not support WebGL
    if (gl === null) {
      alert('Unable to initialize WebGL. Your browser or machine may not support it.')
    }

    // Create raytracer
    const raytracer = new Raytracer(gl)
    raytracer.printContext()
  }
}
</script>
