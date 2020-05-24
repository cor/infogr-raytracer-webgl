export default class Scene {
  lights = [
    {
      position: [0.8, 0.8],
      color: [1, 1, 1]
    },
    {
      position: [0, 0],
      color: [1, 1, 1]
    },
    {
      position: [-0.8, -0.8],
      color: [1, 1, 1]
    }
  ]

  circles = [
    {
      position: [-0.8, 0.8],
      radius: 0.1
    },
    {
      position: [0.8, -0.8],
      radius: 0.1
    }
  ]

  addLight () {
    this.lights.push({
      position: [0, 0],
      color: [1, 1, 1]
    })
  }

  shaderSourceVars () {
    return {
      LIGHT_COUNT: this.lights.length,
      CIRCLE_COUNT: this.circles.length
    }
  }
}
