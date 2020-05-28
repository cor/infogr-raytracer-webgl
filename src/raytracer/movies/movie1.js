import Movie from '../movie'

export default function movie1 () {
  const m = new Movie(1, 1, 9)
  let s = m.lastScene()

  const spacing = 0.5
  const sideDimension = 0.2

  s.lights[0].position[0] = 1
  s.lights[0].position[1] = 1
  s.lights[0].color = [1, 1, 1]

  s.circles[0].radius = 0

  for (let i = 0; i < 9; i++) {
    const x = i % 3
    const y = ~~(i / 3)

    s.rectangles[i].width = sideDimension
    s.rectangles[i].height = sideDimension
    s.rectangles[i].position[0] = spacing * x - spacing
    s.rectangles[i].position[1] = spacing * y - spacing
  }

  s = m.addScene()
  s.lights[0].position[0] = 1
  s.lights[0].position[1] = -1

  return m
}
