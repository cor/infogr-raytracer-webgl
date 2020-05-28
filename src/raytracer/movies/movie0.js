import Movie from '../movie'

export default function movie0 () {
  const m = new Movie(4, 5, 4)
  let s = m.lastScene()
  s.lights[0].position = [-2.5, 2.5]
  s.lights[0].color = [0, 0, 0]
  s.lights[1].position = [0, 0]
  s.lights[2].position = [0, 0]
  s.lights[3].position = [0, 0]
  s.lights[1].color = [0, 0, 0]
  s.lights[2].color = [0, 0, 0]
  s.lights[3].color = [0, 0, 0]

  s = m.addScene()
  s.lights[0].color = [2, 2, 2]
  s.duration = 2

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
  s.lights[0].color = [2, 1, 3]
  s.duration = 2

  s = m.addScene()
  s.circles[0].position = [-1, -1]
  s.circles[1].position = [1, 1]
  s.circles[2].position = [1, -1]
  s.circles[3].position = [1, -1]
  s.circles[4].position = [1, -1]

  s = m.addScene()
  s.rectangles[0].position = [0, 0]
  s.rectangles[1].position = [0, 0]
  s.rectangles[2].position = [0, 0]
  s.rectangles[3].position = [0, 0]

  s = m.addScene()
  s.rectangles[0].position = [-1.3, -1.5]
  s.rectangles[1].position = [1.3, -1.5]
  s.rectangles[2].position = [-1.3, 1.5]
  s.rectangles[3].position = [1.3, 1.5]

  s.lights[0].position = [0, 0]

  s = m.addScene()
  s.circles[3].position = [1, 0]
  s.circles[4].position = [0, -1]

  s = m.addScene()
  s.circles[0].radius = 0.2
  s.circles[1].radius = 0.2
  s.circles[3].radius = 0.15
  s.circles[4].radius = 0.15

  s = m.addScene()
  s.lights[0].color = [1, 1, 4]

  s = m.addScene()
  s.lights[1].color = [9, 4, 8]

  s = m.addScene()
  s.rectangles[0].angle = 0.2
  s.rectangles[1].angle = 0.2
  s.rectangles[2].angle = 0.2
  s.rectangles[3].angle = 0.2

  s = m.addScene()
  s.rectangles[0].angle = 1.5
  s.rectangles[1].angle = 1.5
  s.rectangles[2].angle = 1.5
  s.rectangles[3].angle = 1.5

  s = m.addScene()
  s.rectangles[0].angle = 3
  s.rectangles[1].angle = 3
  s.rectangles[2].angle = 3
  s.rectangles[3].angle = 3

  s = m.addScene()
  s.lights[1].position = [0, 1.8]
  s.duration = 1

  s = m.addScene()
  s.rectangles[0].angle = 4.5
  s.rectangles[1].angle = 4.5
  s.rectangles[2].angle = 4.5
  s.rectangles[3].angle = 4.5

  s = m.addScene()
  s.lights[1].position = [1.8, 1.8]

  s = m.addScene()
  s.rectangles[0].angle = 6
  s.rectangles[1].angle = 6
  s.rectangles[2].angle = 6
  s.rectangles[3].angle = 6

  s = m.addScene()
  s.lights[1].position = [1.8, -1.8]

  s = m.addScene()
  s.rectangles[0].width = 0.3
  s.rectangles[1].width = 0.3
  s.rectangles[2].width = 0.3
  s.rectangles[3].width = 0.3

  s = m.addScene()
  s.lights[1].position = [-1.8, -1.8]

  s = m.addScene()
  s.lights[1].position = [-1.8, 0]

  s = m.addScene()
  s.rectangles[0].height = 0.3
  s.rectangles[1].height = 0.3
  s.rectangles[2].height = 0.3
  s.rectangles[3].height = 0.3

  s = m.addScene()
  s.lights[1].position = [0, 0]

  s = m.addScene()
  s.circles[0].radius = 0.1
  s.circles[1].radius = 0.1
  s.circles[2].radius = 0.1
  s.circles[3].radius = 0.1
  s.circles[4].radius = 0.1

  s = m.addScene()
  s.rectangles[0].position = [1, 0.5]
  s.rectangles[1].position = [1, -0.5]
  s.rectangles[2].position = [0.5, -1]
  s.rectangles[3].position = [-0.5, -1]

  s = m.addScene()
  s.lights[0].color = [0, 0, 0]
  s.lights[1].color = [0, 0, 0]
  s.lights[2].color = [0, 0, 0]
  s.lights[3].color = [0, 0, 0]

  s = m.addScene()
  s.lights[0].position = [1.8, 0.7]
  s.lights[1].position = [1.8, -0.7]
  s.lights[2].position = [0.7, -1.8]
  s.lights[3].position = [-0.7, -1.8]
  s.duration = 0.5

  s = m.addScene()
  s.lights[0].color = [0, 2, 0]

  s = m.addScene()
  s.lights[0].color = [0, 0, 0]
  s.lights[1].color = [0, 2, 0]

  s = m.addScene()
  s.lights[1].color = [0, 0, 0]
  s.lights[2].color = [0, 2, 0]

  s = m.addScene()
  s.lights[2].color = [0, 0, 0]
  s.lights[3].color = [0, 2, 0]

  s = m.addScene()
  s.lights[3].color = [0, 0, 0]

  s = m.addScene()
  s.lights[0].color = [0, 2, 0]
  s.lights[1].color = [0, 2, 0]
  s.lights[2].color = [0, 2, 0]
  s.lights[3].color = [0, 2, 0]
  s.duration = 3

  s = m.addScene()
  s.lights[0].position = [1.8, -1.8]
  s.lights[1].position = [1.8, -1.8]
  s.lights[2].position = [1.8, -1.8]
  s.lights[3].position = [1.8, -1.8]

  s = m.addScene()
  s.lights[0].position = [5, -5]
  s.lights[1].position = [5, -5]
  s.lights[2].position = [5, -5]
  s.lights[3].position = [5, -5]

  s = m.addScene()
  s.duration = 1
  s.lights[0].position = [-2.5, 2.5]
  s.lights[1].position = [-2.5, 2.5]
  s.lights[2].position = [-2.5, 2.5]
  s.lights[3].position = [-2.5, 2.5]
  s.lights[0].color = [0, 0, 0]
  s.lights[1].color = [0, 0, 0]
  s.lights[2].color = [0, 0, 0]
  s.lights[3].color = [0, 0, 0]

  return m
}
