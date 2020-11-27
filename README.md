# infogr-raytracer-webgl
On [the demo site](https://cor.github.io/infogr-raytracer-webgl/) you will find two movies; which are actively ray traced withn a WebGL fragment shader. The tracer operates in two dimensions, shooting a ray at each pixel every single frame. WebGL is easily capable of performing this operation at 60FPS, as opposed to traditional CPU implementations. Our CPU-based C# version, from which we originally ported the core logic, runs at a mere 5FPS. We've ported that shader to OpenGL, which supports a more modern shading language, in order to hit 60FPS.

We wanted to run this project on the web, which is why we ported it to WebGL. However, due to WebGL's limited support for shaders, we wrote our own shader preprocessor in order to add variable-sized arrays to GLSL 1.0

The movie consists of a set of static scenes, which are interpolated to generate fluid motion.

As part of our assignment, we first implemented the 2D tracer in C#, after porting the provided template project, removing deprecated OpenGL practices. Next we reimplemented the same ray tracer using OpenGL in a fragment shader. Lastly we ported our OpenGL 3.0 fragment shader to WebGL (which uses OpenGL 1.0 ES). Running the WebGL shader requires NPM and Node, the options are explained in the README.


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Run your end-to-end tests
```
npm run test:e2e
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
