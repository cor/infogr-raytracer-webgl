import Shader from './shader'

import fsSource from './shaders/shader.frag'
import vsSource from './shaders/shader.vert'

export default class Raytracer {
  gl
  shader

  constructor (gl) {
    this.gl = gl

    // Set clear color to black, fully opaque
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0)

    // Clear the color buffer with specified clear color
    this.gl.clear(this.gl.COLOR_BUFFER_BIT)

    this.shader = new Shader(gl, vsSource, fsSource)

    console.log(this.shader.id)
  }
}
