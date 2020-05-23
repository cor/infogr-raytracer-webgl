import initShaderProgram from './shader'

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

export default class Raytracer {
  constructor (gl) {
    this.gl = gl

    if (this.gl === null) {
      alert('Unable to initialize WebGL. Your browser or machine may not support it.')
    }
    // Set clear color to black, fully opaque
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0)

    // Clear the color buffer with specified clear color
    this.gl.clear(this.gl.COLOR_BUFFER_BIT)

    const shaderProgram = initShaderProgram(gl, vsSource, fsSource)
    console.log(shaderProgram)
  }

  printContext () {
    console.log(this.gl)
  }
}
