Actually if you have followed the preceding parts, you might already have the idea about how to define the dimension for primitives.

For Brick, SideX and SideY, you should pass two parameters to the constructor which represent the 2 dimensions in x-axis, y-axis or z-axis.

For Cube, you should pass three parameters to the constructor which represent the 3 dimensions in x-axis, y-axis or z-axis.

For Pyramid, the bottom must be a square, which means you just have to pass one parameter to the constructor.

As follows:
```
var xDms = 20;
var yDms = 30;
var zDms = 40;

var brickDms = new obelisk.BrickDimension(xDms, yDms);
var sideXDms = new obelisk.SideXDimension(xDms, zDms);
var sideYDms = new obelisk.SideYDimension(yDms, zDms);
var cubeDms = new obelisk.CubeDimension(xDms, yDms, zDms);
var pyDms = new obelisk.PyramidDimension(xDms);
```

For Pyramid, you might notice that it has another parameter, which means whether to generate a taller pyramid. In 3d pixel isometric projection, there are two types of pyramid.

Now we try to build a pyramid group, assign colors for them by `obelisk.PyramidColor.getByRightColor();` mentioned in the previous part. Visit "Play with code" below and you will get this:
