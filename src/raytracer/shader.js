export default class Shader {
  gl
  program

  constructor (gl, vsSource, fsSource, sourceVars) {
    this.gl = gl

    // preprocess sources
    vsSource = this.preprocessSource(vsSource, sourceVars)
    fsSource = this.preprocessSource(fsSource, sourceVars)

    this.program = this.initShaderProgram(gl, vsSource, fsSource)
  }

  //
  // Initialize a shader program, so WebGL knows how to draw our data
  //
  initShaderProgram (gl, vsSource, fsSource) {
    const vertexShader = this.loadShader(gl, gl.VERTEX_SHADER, vsSource)
    const fragmentShader = this.loadShader(gl, gl.FRAGMENT_SHADER, fsSource)

    // Create the shader program
    const shaderProgram = gl.createProgram()
    gl.attachShader(shaderProgram, vertexShader)
    gl.attachShader(shaderProgram, fragmentShader)
    gl.linkProgram(shaderProgram)

    // If creating the shader program failed, alert
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      alert(`Unable to initialize the shader program: ${gl.getProgramInfoLog(shaderProgram)}`)
      return null
    }

    return shaderProgram
  }

  //
  // preprocesses our shader source files
  // it replaces variables in the format 42//$VARIABLE_NAME$// with the VARIABLE_NAME
  // item from the sourceVars object
  //
  preprocessSource (source, sourceVars) {
    const sourceVarPattern = /42\/\/\$(.*)\$\/\//g
    return source.replace(sourceVarPattern, (_, varName) => sourceVars[varName])
  }

  //
  // creates a shader of the given type, uploads the source and
  // compiles it.
  //
  loadShader (gl, type, source) {
    const shader = gl.createShader(type)

    // Send the source to the shader object
    gl.shaderSource(shader, source)

    // Compile the shader program
    gl.compileShader(shader)

    // See if it compiled successfully
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error(`An error occurred compiling the shaders:\n${gl.getShaderInfoLog(shader)}`)
      gl.deleteShader(shader)
      return null
    }

    return shader
  }

  use () {
    this.gl.useProgram(this.program)
  }

  setUniform1f (name, value) {
    this.gl.uniform1f(this.getUniformLocation(name), value)
  }

  setUniformMatrix4fv (name, value) {
    this.gl.uniformMatrix4fv(this.getUniformLocation(name), false, value)
  }

  setUniform2fv (name, value) {
    this.gl.uniform2fv(this.getUniformLocation(name), value)
  }

  setUniform3fv (name, value) {
    this.gl.uniform3fv(this.getUniformLocation(name), value)
  }

  getUniformLocation (name) {
    // TODO: Cache uniform locations
    return this.gl.getUniformLocation(this.program, name)
  }

  getAttribLocation (name) {
    // TODO: Cache attrib locations
    return this.gl.getAttribLocation(this.program, name)
  }

  delete () {
    this.gl.deleteProgram(this.program)
  }
}
