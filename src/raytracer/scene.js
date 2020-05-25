export default class Scene {
  lights = [
    {
      position: [1, 1],
      color: [1, 0, 2.4]
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
    },
    {
      position: [0, 0],
      radius: 0.1
    }
  ]

  duration = 1

  addLight () {
    this.lights.push({
      position: [0.5, 0.5],
      color: [1, 1, 1]
    })
  }

  addCircle () {
    this.circles.push({
      position: [0, -0.5],
      radius: 0.1
    })
  }

  shaderSourceVars () {
    return {
      LIGHT_COUNT: this.lights.length,
      CIRCLE_COUNT: this.circles.length
    }
  }
}
