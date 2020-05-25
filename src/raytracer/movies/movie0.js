import Movie from '../movie'

export default function movie0 () {
  const m = new Movie()
  let s = m.lastScene()
  s.lights[0].position = [-2.5, 2.5]
  s.lights[0].color = [0, 0, 0]

  s = m.addScene()
  s.lights[0].color = [2, 2, 2]
  s.duration = 2

  s = m.addScene()

  s = m.addScene()
  s.lights[0].position = [-0.5, 0.5]
  s.duration = 0.5

  s = m.addScene()

  s = m.addScene()
  s.lights[0].position = [0.5, 0.5]
  s.lights[0].color = [2, 0, 0]

  s = m.addScene()
  s.lights[0].position = [0.5, -0.5]
  s.lights[0].color = [1, 1, 0]

  s = m.addScene()
  s.lights[0].position = [-0.5, -0.5]
  s.lights[0].color = [0, 2, 0]

  s = m.addScene()
  s.lights[0].position = [-0.5, 0.5]
  s.lights[0].color = [0, 0, 2]

  s = m.addScene()
  s.lights[0].color = [1, 1, 1]
  s.duration = 2

  s = m.addScene()
  s.lights[0].position = [-2.5, 2.5]

  return m
}