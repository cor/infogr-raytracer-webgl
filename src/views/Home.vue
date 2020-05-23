<template>
  <div class="home">
    <h1>INFOGR Raytracer WebGL</h1>
    <canvas id="glCanvas" width="600" height="600"></canvas>
  </div>
</template>

<script>
import initShaderProgram from '../shader'

const fsSource = `
    void main() {
      gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
    }
  `

const vsSource = `
    attribute vec4 aVertexPosition;

    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;

    void main() {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
    }
  `

export default {
  name: 'Home',
  mounted () {
    const canvas = document.querySelector('#glCanvas')
    // Initialize the GL context

    const gl = canvas.getContext('webgl')

    if (gl === null) {
      alert('Unable to initialize WebGL. Your browser or machine may not support it.')
    }

    // Set clear color to black, fully opaque
    gl.clearColor(0.0, 0.0, 0.0, 1.0)

    // Clear the color buffer with specified clear color
    gl.clear(gl.COLOR_BUFFER_BIT)

    const shaderProgram = initShaderProgram(gl, vsSource, fsSource)
    console.log(shaderProgram)
  }
}
</script>
