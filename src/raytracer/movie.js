import Scene from './scene'

export default class Movie {
  scenes = [new Scene()]

  sceneDurations () {
    return this.scenes.map(s => s.duration)
  }

  duration () {
    return this.sceneDurations().reduce((d0, d1) => d0 + d1, 0)
  }

  lastScene () {
    return this.scenes[this.scenes.length - 1]
  }

  addScene () {
    this.scenes.push(this.lastScene().clone())
    return this.lastScene()
  }

  currentScene (time) {
    const sceneDurations = this.sceneDurations()
    const sceneCount = this.scenes.length

    time %= this.duration()

    let timeSum = 0
    let sceneIndex = -1
    while (timeSum < time) {
      sceneIndex++
      timeSum += sceneDurations[sceneIndex]
      sceneIndex %= sceneCount
    }

    const scene0 = this.scenes[sceneIndex]
    const scene1 = sceneIndex + 1 === sceneCount
      ? this.scenes[0] // go back to scene 0 at the end
      : this.scenes[sceneIndex + 1] // otherwise, go the the succeeding scene
    const normalizedTime = (time - timeSum + scene0.duration) / scene0.duration
    return scene0.interpolate(scene1, normalizedTime)
  }
}
