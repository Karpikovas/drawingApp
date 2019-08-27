if (window.addEventListener) {
  window.addEventListener('load', function () {
    init();
  });
}

function init() {

  selectedType = 'circle';
  selectedShape = null;
  onMove = false;


  container = document.getElementById('container');
  btnDelete = document.getElementById('btn-delete');
  btnIncrease = document.getElementById('btn-increase');
  btnReduce = document.getElementById('btn-reduce');
  colorPicker = document.getElementById('color-picker');


  container.addEventListener('click', function (e) {
    paintShape(e);
  }, false);
  btnDelete.addEventListener('click', deleteShape, false);
  btnIncrease.addEventListener('click', increaseShape, false);
  btnReduce.addEventListener('click', reduceShape, false);
  colorPicker.addEventListener('change', changeShapeColor, false);

  document.getElementById('circle').addEventListener('click', function (e) {
    onShapeClick(e.target.id);
  }, false);
  document.getElementById('rect').addEventListener('click', function (e) {
    onShapeClick(e.target.id);
  }, false);
  document.getElementById('triangle').addEventListener('click', function (e) {
    onShapeClick(e.target.id);
  }, false);

}

//Методы кнопок

function onShapeClick(typeOfShape) {

    let oldTypeOfShape = document.getElementById(selectedType);
    oldTypeOfShape.classList.remove('active');
    oldTypeOfShape.classList.add('disabled');

    let newTypeOfShape = document.getElementById(typeOfShape);
    newTypeOfShape.classList.remove('disabled');
    newTypeOfShape.classList.add('active');

    selectedType = typeOfShape;
}

function changeShapeColor() {

  if (selectedShape.classList.contains('triangle')) {
    selectedShape.style.borderBottomColor = colorPicker.value;
  } else {
    selectedShape.style.background = colorPicker.value;
  }
}
function increaseShape() {
    if (selectedShape.classList.contains('triangle')) {
        let newWidth = selectedShape.offsetWidth/2 + 10;
        selectedShape.style.borderWidth = newWidth + 'px';
        selectedShape.style.borderBottomWidth = newWidth * 1.7 + 'px';
    } else {
        selectedShape.style.height = selectedShape.offsetHeight + 10 + 'px';
        selectedShape.style.width = selectedShape.offsetWidth + 10 + 'px';
    }
}

function reduceShape() {
    if (selectedShape.offsetHeight > 10) {


        if (selectedShape.classList.contains('triangle')) {
            let newWidth = selectedShape.offsetWidth/2 - 10;
            selectedShape.style.borderWidth = newWidth + 'px';
            selectedShape.style.borderBottomWidth = newWidth * 1.7 + 'px';
        } else {
            selectedShape.style.height = selectedShape.offsetHeight - 10 + 'px';
            selectedShape.style.width = selectedShape.offsetWidth - 10 + 'px';

        }
    }
}
function deleteShape() {
    selectedShape.parentNode.removeChild(selectedShape);
    disabledShapeMenu();
    selectedShape = null;
}

function paintShape(coords) {
  if (!onMove) {
    let top = coords.pageY;
    let left = coords.pageX;

    let div = document.createElement('div');
    div.classList.add(selectedType);
    container.appendChild(div);

    div.style.left = left - div.offsetWidth / 2 + 'px';
    div.style.top = top - div.offsetHeight / 2 + 'px';

    div.onmousedown = function (event) {

      event.stopPropagation();
      event.preventDefault();

      if (selectedShape != null) {
        selectedShape.classList.remove('active');
      } else {
        activeShapeMenu();
      }

      selectedShape = div;
      div.classList.add('active');
      onMove = true;

      colorPicker.value = getShapeColor();

      let shiftX = event.clientX - div.getBoundingClientRect().left;
      let shiftY = event.clientY - div.getBoundingClientRect().top;

      moveAt(event.pageX, event.pageY);

      function moveAt(pageX, pageY) {
        div.style.left = pageX - shiftX + 'px';
        div.style.top = pageY - shiftY + 'px';
      }

      function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
      }

      container.addEventListener('mousemove', onMouseMove);

      div.onmouseup = function () {
        container.removeEventListener('mousemove', onMouseMove);
        div.onmouseup = null;
      };

    };

    div.ondragstart = function () {
      return false;
    };
  } else {
    onMove = false;
  }
}

function activeShapeMenu() {
    btnDelete.classList.remove('disabled');
    btnDelete.classList.add('active');

    btnIncrease.classList.remove('disabled');
    btnIncrease.classList.add('active');

    btnReduce.classList.remove('disabled');
    btnReduce.classList.add('active');

    colorPicker.disabled = false;
    colorPicker.value = selectedShape ? selectedShape.style.background : '#008000';
}

function disabledShapeMenu() {
    btnDelete.classList.remove('active');
    btnDelete.classList.add('disabled');

    btnIncrease.classList.remove('active');
    btnIncrease.classList.add('disabled');

    btnReduce.classList.remove('active');
    btnReduce.classList.add('disabled');

    colorPicker.disabled = true;
    colorPicker.value = '#808080';
}

function rgbToHex(rgb) {
  return "#" + ((1 << 24) + (parseInt(rgb[0]) << 16) + (parseInt(rgb[1]) << 8) + parseInt(rgb[2])).toString(16).slice(1);
}


function getStyle(el, styleProp) {
  if (el.currentStyle)
    return el.currentStyle[styleProp];

  return document.defaultView.getComputedStyle(el, null)[styleProp];
}

function getShapeColor() {
  let color;
  if (selectedShape.classList.contains('triangle')) {
    color = getStyle(selectedShape, 'borderBottomColor');
  } else {
    color = getStyle(selectedShape, 'backgroundColor');
  }


  let rgbArray = color.match(/\d+/g);
  return rgbToHex(rgbArray);
}
