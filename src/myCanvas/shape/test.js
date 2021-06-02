
let shape = new ShapeObject();
let rect = new Rect(0, 0, 0, 0);
let triangle = new Triangle(0, 0, 0, 0);
[shape, rect, triangle].forEach((item) => {
    console.log(item.shape);
})