If you have any preceding knowledge about pixel art, to create an isometric pixel cube must be the first thing you would like to see. In this part, you will find how to do that with obelisk.js. Probably you have no idea what does the code mean but no worries, this is just to let you know how easy it could be.

First we create an isometric 3D axis zero point instance
```
var point = new obelisk.Point(200, 200);
```

Create pixel view instance on HTML5 Canvas object to nest everything
```
var pixelView = new obelisk.PixelView(canvas, point);
```

Also create cube dimension and color instance
```
var dimension = new obelisk.CubeDimension(80, 100, 120);
var gray = obelisk.ColorPattern.GRAY;
var color = new obelisk.CubeColor().getByHorizontalColor(gray);
```

Then we assign them to cube constructor parameter to create a cube instance
```
var cube = new obelisk.Cube(dimension, color, true);
```

Last step, render cube primitive into view
```
pixelView.renderObject(cube);
```
