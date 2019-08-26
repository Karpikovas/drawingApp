if (window.addEventListener) {
  window.addEventListener('load', function() { init(); });
}

function init() {
  canvas = document.getElementById('canvas');
  context = canvas.getContext('2d');
  canvas.width  = window.innerWidth - 75;
  canvas.height = window.innerHeight - 75;

  shapes = [

  ];
  selectedType = 'circle';


  canvas.addEventListener('click', function () { paintShape(); }, false);
  document.getElementById('circle').addEventListener('click', function(e) { onShapeClick(e.target.id); }, false);
  document.getElementById('rect').addEventListener('click', function(e) { onShapeClick(e.target.id); }, false);

  //document.getElementById('triangle').addEventListener('click', function(e) { onShapeClick(e.target.id); }, false);

  container = document.getElementById('container');

  paintRect(200, 200);
  linedraw(100, 400, 700, 400)

  shapes.forEach(s => s.draw());

}

Triangle = function(...points) {
  this.points = points
};
Triangle.prototype = {
  draw() {
    context.closePath();
    context.beginPath();
    context.moveTo(this.points[this.points.length - 1].x, this.points[this.points.length - 1].y);
    this.points.forEach(n => context.lineTo(n.x, n.y));
    context.fill();
  }
};

Rect = function(...points) {
  this.points = points
};
Rect.prototype = {
  draw() {
    context.closePath();
    context.beginPath();
    context.fillRect(this.points[0].x, this.points[0].y, this.points[1].x - this.points[0].x, this.points[1].y - this.points[0].y)
  }
};


Circle = function (...points) {
  this.points = points
};
Circle.prototype = {
  draw() {
    context.closePath();
    context.beginPath();
    context.arc(this.points[this.points.length - 1].x, this.points[this.points.length - 1].y, 20, 0, 2 * Math.PI, false);
    context.fill();
    context.stroke();
  }
};

function onShapeClick(typeOfShape) {
  oldTypeOfShape = document.getElementById(selectedType);
  oldTypeOfShape.style.border = "0px dashed white";
  oldTypeOfShape.style.background = "green";

  newTypeOfShape = document.getElementById(typeOfShape);
  newTypeOfShape.style.border = "2px dashed limegreen";
  newTypeOfShape.style.background = "lightgrey";

  selectedType = typeOfShape;
}

function paintShape() {

  if (selectedType === 'circle')
  {
    console.log('sss');
    shapes.push(
        new Circle(
            { x: window.screenX, y: window.screenY }
        )
    );
  }
  //context.clearRect(0, 0, canvas.width, canvas.height);
  shapes.forEach(s => s.draw());
}

function linedraw(x1, y1, x2, y2) {
  if (x2 < x1) {
    tmp = x2 ; x2 = x1 ; x1 = tmp;
    tmp = y2 ; y2 = y1 ; y1 = tmp;
  }

  lineLength = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  m = (y2 - y1) / (x2 - x1);

  degree = Math.atan(m) * 180 / Math.PI;

  container.innerHTML += "" +
      "<div class='line' style='transform-origin: top left; transform: rotate(" + degree + "deg); width: " + lineLength + "px; height: 1px; background: black; position: absolute; top: " + y1 + "px; left: " + x1 + "px;'></div>"
}

// function paintRect(top, left) {
//   container.innerHTML += "<div class='rect' style='position: absolute; width: 40px; height: 40px;background: green;'></div>";
// }


let div = container.createElement('div');
div.classList.add('figure figure_rect');
div.style.left = obj,x + 'px';
div.style.top = obj,y + 'px';
 div.onmousedown = function(ev) {
   ev.target.classList.add('figure_selected');
   ...
 }



