if (window.addEventListener) {
    window.addEventListener('load', function () {
        init();
    });
}

function init() {

    selectedType = 'circle';
    onMove = false;

    container = document.getElementById('container');

    container.addEventListener('click', function (e) {
        paintShape(e);
    }, false);

    document.getElementById('circle').addEventListener('click', function (e) {
        onShapeClick(e.target.id);
    }, false);
    document.getElementById('rect').addEventListener('click', function (e) {
        onShapeClick(e.target.id);
    }, false);
    document.getElementById('triangle').addEventListener('click', function (e) {
        onShapeClick(e.target.id);
    }, false);

    function onShapeClick(typeOfShape) {
        oldTypeOfShape = document.getElementById(selectedType);

        oldTypeOfShape.classList.remove('active');
        oldTypeOfShape.classList.add('disabled');

        newTypeOfShape = document.getElementById(typeOfShape);
        newTypeOfShape.classList.remove('disabled');
        newTypeOfShape.classList.add('active');

        selectedType = typeOfShape;
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

                onMove = true;

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
}

