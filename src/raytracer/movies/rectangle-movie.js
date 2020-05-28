import Movie from '../movie'

export default function rectangleMovie () {
  const m = new Movie('Rectangle Movie', 2, 1, 9)
  let s = m.lastScene()

  const brightness = 2

  s.lights[0].position = [1, 1]
  s.lights[0].color = [brightness, 0, brightness]

  s.lights[1].position = [-1, 0]
  s.lights[1].color = [0, 0, 0]

  s.circles[0].radius = 0

  const spacing = 0.4
  const sideDimension = 0.2

  const combinedWidth = spacing * 3 - sideDimension

  for (let i = 0; i < 9; i++) {
    const x = i % 3
    const y = ~~(i / 3)

    s.rectangles[i].width = 0
    s.rectangles[i].height = 0
    s.rectangles[i].position[0] = spacing * x - spacing
    s.rectangles[i].position[1] = spacing * y - spacing
  }

  s.rectangles[4].width = combinedWidth
  s.rectangles[4].height = combinedWidth

  s = m.addScene()
  s.lights[0].position[1] = -1

  s = m.addScene()
  s.lights[0].position[0] = -1

  // combine rects for split
  s.rectangles[1].width = combinedWidth
  s.rectangles[1].height = sideDimension

  s.rectangles[7].width = combinedWidth
  s.rectangles[7].height = sideDimension

  s = m.addScene()
  s.lights[0].position[1] = 0

  s = m.addScene()
  s.rectangles[4].height = sideDimension

  s = m.addScene()
  s.lights[0].color = [brightness, 0, 0]
  s.lights[1].color = [0, 0, brightness]

  s = m.addScene()
  s.lights[0].position[1] = spacing / 4
  s.lights[1].position[1] = -spacing / 4

  s = m.addScene()
  s.lights[0].position[1] = spacing / 2
  s.lights[1].position[1] = -spacing / 2

  s = m.addScene()
  s.lights[0].position[0] = 1

  s = m.addScene()
  s.lights[1].position[0] = -1

  s = m.addScene()
  s.lights[1].position[0] = 1
  s.lights[1].position[0] = -1

  const pointBetweenRects = spacing / 2
  s = m.addScene()
  s.lights[0].position[0] = pointBetweenRects
  s.lights[1].position[0] = -pointBetweenRects

  for (const i of [0, 2, 3, 5, 6, 8]) {
    s.rectangles[i].width = sideDimension
    s.rectangles[i].height = sideDimension
  }

  s = m.addScene()
  s.duration = 3
  for (const i of [1, 4, 7]) {
    s.rectangles[i].width = sideDimension
    s.rectangles[i].height = sideDimension
  }

  s = m.addScene()
  s.rectangles[4].angle = 3 * Math.PI
  s.duration = 0.5

  s = m.addScene()
  s.lights[0].position[1] = -pointBetweenRects
  s.lights[1].position[1] = pointBetweenRects

  s = m.addScene()
  s.lights[0].position[0] = -pointBetweenRects
  s.lights[1].position[0] = pointBetweenRects
  s.duration = 1

  s = m.addScene()
  s.lights[0].position[1] = 1
  s.lights[1].position[1] = -1

  s = m.addScene()
  s.lights[0].position[1] = -1
  s.lights[1].position[1] = 1

  s = m.addScene()
  s.lights[0].position[1] = pointBetweenRects
  s.lights[1].position[1] = -pointBetweenRects

  s = m.addScene()
  s.lights[0].position[1] = 1
  s.lights[1].position[1] = 1
  s.duration = 0.5

  s = m.addScene()
  s.lights[0].position[0] = -pointBetweenRects / 2
  s.lights[1].position[0] = pointBetweenRects / 2

  s = m.addScene()
  s.lights[0].position[0] = 0
  s.lights[1].position[0] = 0
  s.duration = 1

  s.rectangles[4].width = combinedWidth
  s.rectangles[4].height = combinedWidth

  s = m.addScene()
  s.lights[0].color = [2, 0, 2]
  s.lights[1].color = [0, 0, 0]
  for (const i of [0, 1, 2, 3, 5, 6, 7, 8]) {
    s.rectangles[i].width = 0
    s.rectangles[i].height = 0
  }
  s.duration = 2

  return m
}
