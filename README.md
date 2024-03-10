# Obelisk TS

Obelisk TS is a TypeScript library for building isometric pixel objects. It was forked from https://github.com/nosir/obelisk.js .

With the simple and flexible API provided, you can easily add isometric pixel elements like brick, cube, pyramid and slope in HTML5 canvas. Obelisk TS strictly follows pixel neat pattern: lines with 1:2 pixel dot arrangement, leading to an angle of 22.6 degrees.

Also you should know obelisk TS is not for vector isometric graphics drawing and rendering. Internally it does not use any canvas graphic drawing API, instead, it manipulates all the rendering in pixel level to obtain precise pixel arrangement. Just try it out to pixelate something. Have fun.

## Showcase

Origin:

-   Input Text Rendering: http://codepen.io/nosir/details/IxBJn
-   GIF Animation Rendering: http://codepen.io/nosir/details/mdiHe (Safari only)
-   Pixel Isometirc Flappy Bird: http://codepen.io/nosir/details/rzaLA
-   Cube Generator: http://codepen.io/nosir/details/ganrh

User Contributed:

-   Github Contribution Chart Isometric View Chrome Extension: [Github Project URL](https://github.com/jasonlong/isometric-contributions) by [@jasonlong](https://twitter.com/jasonlong)
-   Online Voxel Builder: http://ngryman.sh/obelisk-buildr by [@ngryman](https://twitter.com/ngryman)
-   Snake Game: http://codepen.io/sfaedo/full/AwGjg (Use &larr; &rarr; Key) by [@Sebastian Faedo](http://codepen.io/sfaedo)
-   Mario 3D voxel: http://jsdo.it/cx20/bQtQ by [@cx20](https://twitter.com/cx20)
-   Conway's Game of Life: http://codepen.io/safx/full/Ewcym by [@safxdev](https://twitter.com/safxdev)
-   Node Server-side Image Rendering with [node-canvas](https://github.com/learnboost/node-canvas): [Github Project URL](https://github.com/pose/node-obelisk-example) by [@pose](https://github.com/pose)
-   Animations with Angular.js: [Github Project URL](https://github.com/Wildhoney/ngObelisk) by [@Wildhoney](https://github.com/Wildhoney)
-   Perlin Noise Map: http://codepen.io/slobaum/pen/zhmFL by [@slobaum](https://twitter.com/slobaum)
-   [More on CodePen](http://codepen.io/search/pens/?depth=everything&limit=all&order=newest&page=1&q=obelisk.js&show_forks=false)

## Getting started

-   WIP

CDN url

```javascript
// create a canvas 2D point for pixel view world
var point = new obelisk.Point(200, 200);

// create view instance to nest everything
// canvas could be either DOM or jQuery element
var pixelView = new obelisk.PixelView(canvas, point);

// create cube dimension and color instance
var dimension = new obelisk.CubeDimension(80, 100, 120);
var gray = obelisk.ColorPattern.GRAY;
var color = new obelisk.CubeColor().getByHorizontalColor(gray);

// build cube with dimension and color instance
var cube = new obelisk.Cube(dimension, color, true);

// render cube primitive into view
pixelView.renderObject(cube);
```

## Tutorials

-   Part 1: [To build the first cube](./docs/01-first-cube.md)
-   Part 2: [Coordinate system](./docs/02-coordinate-system.md)
-   Part 3: [Primitives](./docs/03-primitives.md)
-   Part 4: [Color](./docs/04-color.md)
-   Part 5: [Dimension](./docs/05-dimension.md)

### Current examples in the repo

- Basic:
    - Brick: https://igncp.github.io/obelisk-ts/demo/primary/brick
    - Cube: https://igncp.github.io/obelisk-ts/demo/primary/cube
    - Line: https://igncp.github.io/obelisk-ts/demo/primary/line
    - Slope: https://igncp.github.io/obelisk-ts/demo/primary/slope
    - Pyramid: https://igncp.github.io/obelisk-ts/demo/primary/pyramid
    - Side: https://igncp.github.io/obelisk-ts/demo/primary/side

- Advanced:
    - Gif Rendering: https://igncp.github.io/obelisk-ts/demo/advanced/gif-rendering
    - Flappy Bird: https://igncp.github.io/obelisk-ts/demo/advanced/flappy-bird
    - Flexible Cube: https://igncp.github.io/obelisk-ts/demo/advanced/flexible-cube
    - Input Text Rendering: https://igncp.github.io/obelisk-ts/demo/advanced/input-text-rendering

## Development

### Want to build the project locally?

```
$ git clone https://github.com/igncp/obelisk-ts.git
$ npm install
```

Build

```
$ npm run build
```

## References

Pixel art is a form of digital art, where images are edited and displayed on the pixel level. The isometric projection is commonly seen in games to provide a 3D view without using any real 3D processing.

-   Isometric projection http://en.wikipedia.org/wiki/Isometric_projection
-   Flood fill implementation http://en.wikipedia.org/wiki/Flood_fill
-   Pixel grapic - Eboy http://eboy.com

## License

Obelisk TS is released under the [MIT License](http://opensource.org/licenses/MIT)
