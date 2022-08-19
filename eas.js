let gridContainer = document.querySelector('.grid-container');
let gridChangeForm = document.forms.gridChoiceForm;

let changeButton = gridChangeForm.changeButton;
let gridTemplateColumns = "";


changeButton.onclick = function changeGrid(event){
    let widthSize = gridChangeForm.width.value;
    let heightSize = gridChangeForm.height.value;
    console.log(widthSize)
    gridContainer.style.setProperty('grid-template-columns', `repeat(${widthSize}, 1fr)`);

    for (let index = 0; index < widthSize*heightSize; index++) {
        let gridDiv = document.createElement('div');
        gridDiv.style.border = "1px solid black";
        gridDiv.classList.add('grid-item');
        gridContainer.append(gridDiv);
        
    }
}





