'use strict';

(function () { // pattern "module"

  var container;
  var btnDelete;
  var btnIncrease;
  var btnReduce;
  var colorPicker;

  var selectedType;
  var selectedShape;
  var onMove;

  function init() {

    selectedType = 'circle';
    selectedShape = null;
    onMove = false;

    container = document.getElementById('container');
    btnDelete = document.getElementById('btn-delete');
    btnIncrease = document.getElementById('btn-increase');
    btnReduce = document.getElementById('btn-reduce');
    colorPicker = document.getElementById('color-picker');

    document.getElementById('circle').classList.add('menu__item-circle_active');


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

    let oldTypeOfShape = document.getElementById(selectedType);
    oldTypeOfShape.classList.remove(`menu__item-${selectedType}_active`);

    let newTypeOfShape = document.getElementById(typeOfShape);
    newTypeOfShape.classList.add(`menu__item-${typeOfShape}_active`);

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
    let scale = selectedShape.getBoundingClientRect().width / selectedShape.offsetWidth;
    selectedShape.style.transform = `scale(${scale + 0.1})`;
  }

  function reduceShape() {
    let scale = selectedShape.getBoundingClientRect().width / selectedShape.offsetWidth;
    if (scale > 0.1) {
      selectedShape.style.transform = `scale(${scale - 0.1})`;
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
      div.classList.add('shape');
      div.classList.add(`shape__${selectedType}`);
      container.appendChild(div);

      div.style.left = left - div.offsetWidth / 2 + 'px';
      div.style.top = top - div.offsetHeight / 2 + 'px';

      div.onmousedown = function (event) {
        event.stopPropagation();
        event.preventDefault();

        if (selectedShape != null) {
          selectedShape.classList.remove('shape_active');
        } else {
          activeShapeMenu();
        }

        selectedShape = div;
        div.classList.add('shape_active');
        onMove = true;

        colorPicker.value = getShapeColor();

        let shiftX = event.clientX - div.offsetLeft;
        let shiftY = event.clientY - div.offsetTop;


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

//------------Вспомогательные функции-----------------

  function activeShapeMenu() {
    btnDelete.removeAttribute('disabled');
    btnIncrease.removeAttribute('disabled');
    btnReduce.removeAttribute('disabled');
    colorPicker.removeAttribute('disabled');
    colorPicker.value = selectedShape ? selectedShape.style.background : '#008000';
  }

  function disabledShapeMenu() {
    btnDelete.setAttribute('disabled', 'disabled');
    btnIncrease.setAttribute('disabled', 'disabled');
    btnReduce.setAttribute('disabled', 'disabled');
    colorPicker.setAttribute('disabled', 'disabled');
    colorPicker.value = '#808080';
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

  function rgbToHex(rgb) {
    return "#" + ((1 << 24) + (parseInt(rgb[0]) << 16) + (parseInt(rgb[1]) << 8) + parseInt(rgb[2])).toString(16).slice(1);
  }


  function getStyle(el, styleProp) {
    if (el.currentStyle)
      return el.currentStyle[styleProp];

    return document.defaultView.getComputedStyle(el, null)[styleProp];
  }


  window.addEventListener('load', function () {
    init();
  });

})();