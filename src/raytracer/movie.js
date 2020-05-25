export default class Movie {
  scenes = []

  sceneDurations () {
    return this.scenes.map(s => s.duration)
  }

  duration () {
    return this.sceneDurations().reduce((d0, d1) => d0 + d1, 0)
  }

  currentScene (time) {
    // TODO: Implement looping
    const sceneDurations = this.sceneDurations()
    const lastSceneIndex = this.scenes.length - 1

    // Rewrite to binary search if this becomes a bottleneck
    let timeSum = 0
    let sceneIndex = -1
    while (timeSum < time && sceneIndex < lastSceneIndex) {
      sceneIndex++
      timeSum += sceneDurations[sceneIndex]
    }

    if (sceneIndex < lastSceneIndex) {
      const scene0 = this.scenes[sceneIndex]
      const normalizedTime = (time - timeSum + scene0.duration) / scene0.duration
      return scene0.interpolate(this.scenes[sceneIndex + 1], normalizedTime)
    } else {
      return this.scenes[sceneIndex]
    }
  }
}
