import { mat4 } from 'gl-matrix'
import Shader from './shader'

import fsSource from './shaders/shader.frag'
import vsSource from './shaders/shader.vert'

export default class Raytracer {
  gl
  shader
  buffers

  constructor (gl) {
    this.gl = gl

    // Set clear color to black, fully opaque
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0)

    // Clear the color buffer with specified clear color
    this.gl.clear(this.gl.COLOR_BUFFER_BIT)

    this.shader = new Shader(gl, vsSource, fsSource)

    console.log(this.shader.id)
    this.buffers = this.initBuffers()
    this.drawScene(this.gl)
  }

  initBuffers () {
    // Create a buffer for the square's positions.

    const positionBuffer = this.gl.createBuffer()

    // Select the positionBuffer as the one to apply buffer
    // operations to from here out.

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer)

    // Now create an array of positions for the square.

    const positions = [
      -1.0, 1.0,
      1.0, 1.0,
      -1.0, -1.0,
      1.0, -1.0
    ]

    // Now pass the list of positions into WebGL to build the
    // shape. We do this by creating a Float32Array from the
    // JavaScript array, then use it to fill the current buffer.
    this.gl.bufferData(this.gl.ARRAY_BUFFER,
      new Float32Array(positions),
      this.gl.STATIC_DRAW)

    return {
      position: positionBuffer
    }
  }

  drawScene () {
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0) // Clear to black, fully opaque
    this.gl.clearDepth(1.0) // Clear everything
    this.gl.enable(this.gl.DEPTH_TEST) // Enable depth testing
    this.gl.depthFunc(this.gl.LEQUAL) // Near things obscure far things

    // Clear the canvas before we start drawing on it.

    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT)

    // Create a perspective matrix, a special matrix that is
    // used to simulate the distortion of perspective in a camera.
    // Our field of view is 45 degrees, with a width/height
    // ratio that matches the display size of the canvas
    // and we only want to see objects between 0.1 units
    // and 100 units away from the camera.

    const fieldOfView = 45 * Math.PI / 180 // in radians
    const aspect = this.gl.canvas.clientWidth / this.gl.canvas.clientHeight
    const zNear = 0.1
    const zFar = 100.0
    const projectionMatrix = mat4.create()

    // note: glmatrix.js always has the first argument
    // as the destination to receive the result.
    mat4.perspective(projectionMatrix,
      fieldOfView,
      aspect,
      zNear,
      zFar)

    // Set the drawing position to the "identity" point, which is
    // the center of the scene.
    const modelViewMatrix = mat4.create()

    // Now move the drawing position a bit to where we want to
    // start drawing the square.

    mat4.translate(modelViewMatrix, // destination matrix
      modelViewMatrix, // matrix to translate
      [-0.0, 0.0, -6.0]) // amount to translate

    // Tell WebGL how to pull out the positions from the position
    // buffer into the vertexPosition attribute.
    {
      const numComponents = 2 // pull out 2 values per iteration
      const type = this.gl.FLOAT // the data in the buffer is 32bit floats
      const normalize = false // don't normalize
      const stride = 0 // how many bytes to get from one set of values to the next
      // 0 = use type and numComponents above
      const offset = 0 // how many bytes inside the buffer to start from
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffers.position)
      this.gl.vertexAttribPointer(
        this.shader.attribLocations.vertexPosition,
        numComponents,
        type,
        normalize,
        stride,
        offset)
      this.gl.enableVertexAttribArray(
        this.shader.attribLocations.vertexPosition)
    }

    // Tell WebGL to use our program when drawing

    this.gl.useProgram(this.shader.program)

    // Set the shader uniforms

    this.gl.uniformMatrix4fv(
      this.shader.uniformLocations.projectionMatrix,
      false,
      projectionMatrix)
    this.gl.uniformMatrix4fv(
      this.shader.uniformLocations.modelViewMatrix,
      false,
      modelViewMatrix)

    {
      const offset = 0
      const vertexCount = 4
      this.gl.drawArrays(this.gl.TRIANGLE_STRIP, offset, vertexCount)
    }
  }
}
