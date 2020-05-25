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

    // Rewrite to binary search if this becomes a bottleneck
    let timeSum = 0
    let sceneNumber = 0
    while (timeSum < time) {
      timeSum += sceneDurations[sceneNumber]
      sceneNumber++
    }
  }
}
