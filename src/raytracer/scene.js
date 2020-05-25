import clone from '../helpers/clone'

export default class Scene {
  lights = [
    {
      position: [1, 1],
      color: [1, 0, 2.4]
    }
  ]

  circles = [
    {
      position: [-1, 0.8],
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

  clone () {
    return clone(this)
  }

  interpolate (nextScene, t) {
    const interpolatedScene = this.clone()

    // I = C + t(N-C)
    // TODO: Refactor this to be more DRY
    this.lights.forEach((light, i) => {
      interpolatedScene.lights[i].position[0] = light.position[0] + t * (nextScene.lights[i].position[0] - light.position[0])
      interpolatedScene.lights[i].position[1] = light.position[1] + t * (nextScene.lights[i].position[1] - light.position[1])

      interpolatedScene.lights[i].color[0] = light.color[0] + t * (nextScene.lights[i].color[0] - light.color[0])
      interpolatedScene.lights[i].color[1] = light.color[1] + t * (nextScene.lights[i].color[1] - light.color[1])
      interpolatedScene.lights[i].color[2] = light.color[2] + t * (nextScene.lights[i].color[2] - light.color[2])
    })

    this.circles.forEach((circle, i) => {
      interpolatedScene.circles[i].position[0] = circle.position[0] + t * (nextScene.circles[i].position[0] - circle.position[0])
      interpolatedScene.circles[i].position[1] = circle.position[1] + t * (nextScene.circles[i].position[1] - circle.position[1])

      interpolatedScene.circles[i].radius = circle.radius + t * (nextScene.circles[i].radius - circle.radius)
    })

    return interpolatedScene
  }

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
