Firstly let’s take a look at the ColorPattern Class. There is a set of bright or comfortable color value defined as the const variables, which means you can get a certain color value as follows:
```
obelisk.ColorPattern.PURPLE;
obelisk.ColorPattern.PINK;
```

Or get a random color value from all of the color const variables sets like this:
```
var color = obelisk.ColorPattern.getRandomComfortableColor();
```

For the primitive just having one side like Brick, SideX and SideY, we set color by assigning an instance of SideColor to the primitive constructor, like this:
```
var brickDms = new obelisk.BrickDimension(60, 60);
var sideColor = new obelisk.SideColor(0x666666, 0x33CCCCCC);
var brick = new obelisk.Brick(brickDms, sideColor);
```

The first parameter represents the border color and the second represents the side color. You can also assign an aRGB color value to parameters if you want to get transparent. In the preceding code, 0×33 indicates the alpha value of the side inner color.

With the Cube primitive, we set color by assigning an instance of CubeColor to the primitive constructor, like this:
```
var cubeDms = new obelisk.CubeDimension(60, 60, 60);
var cubeColor = new obelisk.CubeColor().getByHorizontalColor(obelisk.ColorPattern.PINK);
var cube = new obelisk.Cube(cubeDms, cubeColor); 
```

Every cube has three sides,an out dark border and an inner highlight border, so normally we need to prepare five color parameters. However, to simplify this procedure, the `obelisk.CubeColor.getByHorizontalColor();` static method helps you automatically calculate values from light to dark and returns an instance of CubeColor which contains the values set. To invoke this method, just one color value is required (usually color of the lightest horizontal side).

This approach is highly recommended, but still you are able to assign all of the colors to create a CubeColor instance compeletely by yourself, like this:
```
var cubeColor = new obelisk.CubeColor(0x949698, 0xFFFFFF, 0xC9CFD0, 0xE6E8E9, 0xEEEFF0);
```

For Pyramid, it is quite similar to the Cube. The only difference is to obtain color set by calling `obelisk.PyramidColor.getByRightColor();`
```
var pyColor = new obelisk.PyramidColor().getByRightColor(obelisk.ColorPattern.YELLOW);
var pyDms = new obelisk.PyramidDimension(40);
var py = new Pyramid(pyDms, pyColor); 
```
