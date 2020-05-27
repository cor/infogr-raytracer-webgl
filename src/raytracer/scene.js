import clone from '../helpers/clone'

export default class Scene {
  lights = [
    {
      position: [1, 1],
      color: [1, 1, 1]
    }
  ]

  circles = [
    {
      position: [0, 0],
      radius: 0.1
    }
  ]

  rectangles = [
    {
      center: [0.0],
      width: 0.1,
      height: 0.1,
      angle: 0.4
    }
  ]

  duration = 1

  clone () {
    return clone(this)
  }

  interpolate (nextScene, t, linear = false) {
    const interpolatedScene = this.clone()

    if (!linear) { // Ease in and ease out
      t = (Math.sin((t - 0.5) * Math.PI) + 1) / 2
    }

    // Interpolated = Current + t(Next-Current)
    this.lights.forEach((light, i) => {
      for (const p in interpolatedScene.lights[i].position) {
        interpolatedScene.lights[i].position[p] =
          light.position[p] + t * (nextScene.lights[i].position[p] - light.position[p])
      }

      for (const c in interpolatedScene.lights[i].color) {
        interpolatedScene.lights[i].color[c] =
          light.color[c] + t * (nextScene.lights[i].color[c] - light.color[c])
      }
    })

    this.circles.forEach((circle, i) => {
      for (const p in interpolatedScene.circles[i].position) {
        interpolatedScene.circles[i].position[p] =
          circle.position[p] + t * (nextScene.circles[i].position[p] - circle.position[p])
      }

      interpolatedScene.circles[i].radius =
        circle.radius + t * (nextScene.circles[i].radius - circle.radius)
    })

    return interpolatedScene
  }

  addLight () {
    this.lights.push(clone(this.lights[this.lights.length - 1]))
  }

  addCircle () {
    this.circles.push(clone(this.circles[this.circles.length - 1]))
  }

  addRectangle () {
    this.rectangles.push(clone(this.rectangles[this.rectangles.length - 1]))
  }
}
