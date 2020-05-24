export default class Scene {
  lights = [
    {
      position: [0.8, 0.8],
      color: [1, 1, 1],
      velocity: [0, 0]
    },
    {
      position: [0, 0],
      color: [1, 1, 1],
      velocity: [0, 0]
    },
    {
      position: [-0.8, -0.8],
      color: [1, 1, 1],
      velocity: [1, 0]
    }
  ]

  circles = [
    {
      position: [-0.8, 0.8],
      radius: 0.1,
      velocity: [0, 0]
    },
    {
      position: [0.8, -0.8],
      radius: 0.1,
      velocity: [0, 0]
    }
  ]

  update (deltaTime) {
    for (const light of this.lights) {
      light.position[0] += light.velocity[0] * deltaTime
      light.position[1] += light.velocity[1] * deltaTime
    }

    for (const circle of this.circles) {
      circle.position[0] += circle.velocity[0] * deltaTime
      circle.position[1] += circle.velocity[1] * deltaTime
    }
  }

  addLight () {
    this.lights.push({
      position: [0, 0],
      color: [1, 1, 1],
      velocity: [0, 0]
    })
  }

  addCircle () {
    this.circles.push({
      position: [0, 0],
      radius: 0.1,
      velocity: [0, 0]
    })
  }

  shaderSourceVars () {
    return {
      LIGHT_COUNT: this.lights.length,
      CIRCLE_COUNT: this.circles.length
    }
  }
}
