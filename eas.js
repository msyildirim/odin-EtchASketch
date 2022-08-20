/* TODO: - convert the sketch to png or jpeg and download https://www.youtube.com/watch?v=YoVJWZrS2WU
         - 
*/
const gridContainer = document.querySelector('.grid-container');
const gridChangeForm = document.forms.gridChoiceForm;
const changeButton = gridChangeForm.changeButton;
const sizeInputError = gridChangeForm.querySelector('#sizeInputError');
let isPencilActive = false;
const sketchOrErase = document.querySelectorAll('input[name="sketchOrErase"]');
let isSketchSelected = sketchOrErase[0].value == 'sketch' ? true : false;
let gridColor = "white";

////////////////Grid Creation//////////////////////////////////////
function createGrid(numberOfRows, numberOfColumns){
    gridContainer.style.setProperty('grid-template-columns', `repeat(${numberOfColumns}, 1fr)`);
    
    for (let index = 0; index < numberOfRows*numberOfColumns; index++) {
        let gridDiv = document.createElement('div');
        gridDiv.style.cssText = `border: 1px solid black;
        user-drag: none;`;
        gridDiv.classList.add('grid-item');
        gridDiv.style.background = gridColor;
        gridContainer.append(gridDiv);  
    }
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

createGrid(gridChangeForm.height.value, gridChangeForm.width.value)

//Grid column and widht selection 
changeButton.onclick = function changeGrid(){
    removeAllChildNodes(gridContainer);
    let numberOfColumns = gridChangeForm.width.value;
    let numberOfRows = gridChangeForm.height.value;
    createGrid(numberOfRows, numberOfColumns);
}

gridChangeForm.querySelectorAll('.gridSizeInput').forEach(element => {
    element.onblur = function(){
        if(element.value>100) {
            element.classList.add('invalid');
            sizeInputError.innerHTML = 'Please enter a number less than 100.'
        }
    }
    element.onfocus = function() {
        if (this.classList.contains('invalid')) {
          this.classList.remove('invalid');
          sizeInputError.innerHTML = "";
        }
      };
    
});

////////////////////////////////////////////////////////////////////////////

//////These event listeners that enable user to sketch or erase///////////////
//to do -> radio butondak değişikliği onclik ile yakalayıp isSketchSelected boolen ını değiştir. 
//isSketchSelected 0 olduğunda kalem rengini background rengine eşitle 1 olduğundan şimdilik siyah olsun
sketchOrErase.forEach(element=>{
    element.addEventListener('click', (event)=>{
        if(event.target.value == "erase") isSketchSelected = false;
        else isSketchSelected = true;
    })
})
function changePixel(pixel){
    let isRandomColor = document.querySelectorAll('input[name="randomColor"]');
    if (isSketchSelected) {
        if (document.querySelector('input[name="randomColor"]').checked) {
            pixel.style.background = '#'+Math.floor(Math.random()*16777215).toString(16);
        } else {
            pixel.style.background = document.querySelector('input[name="colorpicker"]').value;
        }
    } else {
        pixel.style.background = gridColor;
    }
}
gridContainer.addEventListener('mousedown', (event)=>{
    isPencilActive = true;
    changePixel(event.target);
})

document.addEventListener('mouseup', ()=>{
    isPencilActive = false;
})

gridContainer.addEventListener('dragstart', (event)=>{
    isPencilActive = true;
    changePixel(event.target);
    event.preventDefault();
})

gridContainer.addEventListener('mouseover', (event)=>{
    if(isPencilActive) {
        changePixel(event.target);
    }
})

/////////////////////////////////////////////////////




