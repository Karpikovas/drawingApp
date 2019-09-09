'use strict';

(function () { // pattern "module"

  var container;
  var btnDelete;
  var btnIncrease;
  var btnReduce;
  var colorPicker;

  var selectedType;
  var onMove;

  var shapes = [];

  function init() {

    selectedType = null;
    onMove = false;

    container = document.getElementById('container');
    btnDelete = document.getElementById('btn-delete');
    btnIncrease = document.getElementById('btn-increase');
    btnReduce = document.getElementById('btn-reduce');
    colorPicker = document.getElementById('color-picker');

    bindEvents();

  }

  function bindEvents() {

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

//------------------Методы кнопок------------------------------------

  function onShapeClick(typeOfShape) {

    if (selectedType) {
      let oldTypeOfShape = document.getElementById(selectedType);
      oldTypeOfShape.classList.remove(`menu__item-${selectedType}_active`);    
    }

    if (selectedType !== typeOfShape) {
      let newTypeOfShape = document.getElementById(typeOfShape);
      newTypeOfShape.classList.add(`menu__item-${typeOfShape}_active`);      
      selectedType = typeOfShape;
    } else {
      selectedType = null;
    }    
  }

  function changeShapeColor() {
    let selectedShape = findActiveShape();
    selectedShape.color = colorPicker.value;
    applyChanges(selectedShape);
  }

  function increaseShape() {
    let selectedShape = findActiveShape();
    selectedShape.scale += 0.1;
    applyChanges(selectedShape);
  }

  function reduceShape() {
    let selectedShape = findActiveShape();
    if (selectedShape.scale > 0.1) {
      selectedShape.scale -= 0.1;
      applyChanges(selectedShape);
    }
  }

  function deleteShape() {

    let selectedShape = findActiveShape();

    shapes =  shapes.filter(shape => shape.elem !== selectedShape.elem);
    selectedShape.elem.parentNode.removeChild(selectedShape.elem);
    disabledShapeMenu();
  }

  function paintShape(coords) {
    if (!onMove && selectedType) {

      let top = coords.pageY;
      let left = coords.pageX;

      let div = document.createElement('div');
      div.classList.add('shape');
      div.classList.add(`shape__${selectedType}`);
      container.appendChild(div);

      let dX = left - div.offsetWidth / 2;
      let dY = top - div.offsetHeight / 2;

      shapes.push({
        typeOfShape: selectedType,
        elem: div,
        dX: dX,
        dY: dY,
        scale: 1,
        color: '#008000',
        select: false  
      });

      applyChanges(findSelectedShape(div));

      div.onmousedown = function (event) {
        event.stopPropagation();
        event.preventDefault();

        let selectedShape = findSelectedShape(div);
        changeActiveShape(selectedShape);
        activeShapeMenu();

        onMove = true;

        colorPicker.value = getShapeColor();

        let shiftX = event.clientX - div.offsetLeft;
        let shiftY = event.clientY - div.offsetTop;

        function moveAt(pageX, pageY) {
          selectedShape.dX = pageX - shiftX;
          selectedShape.dY = pageY - shiftY;
          applyChanges(selectedShape);
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

//------------Вспомогательные функции-----------------

  function applyChanges(shape) {

    if (shape.select) {
      shape.elem.classList.add('shape_active');
    } else {
      shape.elem.classList.remove('shape_active');
    }

    if (shape.elem.classList.contains('shape__triangle')) {
      shape.elem.style.borderBottomColor = shape.color;
    } else {
      shape.elem.style.background = shape.color;
    }

    shape.elem.style.transform = `scale(${shape.scale})`;
    shape.elem.style.left = shape.dX + 'px';
    shape.elem.style.top = shape.dY + 'px';
  }

  function findSelectedShape(div) {
    return shapes.find(shape => shape.elem === div);
  }

  function findActiveShape() {
    return shapes.find(shape => shape.select === true);
  }

  function changeActiveShape(newActiveShape) {
    let oldActiveShape = findActiveShape();

    if (oldActiveShape) {
     oldActiveShape.select = false;
     applyChanges(oldActiveShape); 
    }

    newActiveShape.select = true;
    applyChanges(newActiveShape);
  }

  function activeShapeMenu() {
    btnDelete.removeAttribute('disabled');
    btnIncrease.removeAttribute('disabled');
    btnReduce.removeAttribute('disabled');
    colorPicker.removeAttribute('disabled');
    colorPicker.value = '#008000';
  }

  function disabledShapeMenu() {
    btnDelete.setAttribute('disabled', 'disabled');
    btnIncrease.setAttribute('disabled', 'disabled');
    btnReduce.setAttribute('disabled', 'disabled');
    colorPicker.setAttribute('disabled', 'disabled');
    colorPicker.value = '#808080';
  }

  function getShapeColor() {
    let selectedShape = findActiveShape();
    let color = selectedShape.color;
    return color;
  }

  window.addEventListener('load', function () {
    init();
  });

})();