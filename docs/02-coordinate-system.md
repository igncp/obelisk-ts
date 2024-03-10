In this part, we will learn how the coordinate system is working in obelisk.js.

Considering the code in part one, we defined the traditional 2D point like this, but just remember this object has nothing to do with our pixel object and coordinate, the point (200, 200) is where we put the whole pixel view thing:
```
var point = new obelisk.Point(200, 200);
```

To render the object in a certain 3D point, you will need to create an 3D position instance:
```
var p3d = new obelisk.Point3D(40, 40, 40);
```

And pass it to render any object like this:
```
pixelView.renderObject(cube, p3d);
```
