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

    return this.scenes[sceneIndex]
  }
}
