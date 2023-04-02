function removeExistingTagFromList (array, list) {
    array.forEach((arrayElement) => {
        list.forEach((listElement) => {
            if(listElement == arrayElement) {
                removeElementFromArray(list, listElement);
            }
        })
    })
}

function removeElementFromArray (array, element) {
    let indexOfElement = array.indexOf(element);
    array.splice(indexOfElement, 1)
}

function openList(type) {
    let whichList = document.querySelector('.' + type + 'List');
    whichList.style.display = 'block';
    let whichBtn = document.querySelector('.' + type + 'Btn');
    whichBtn.style.width = '600px'
}

function closeList(type) {
    let whichList = document.querySelector('.' + type + 'List');
    whichList.style.display = 'none';
    let whichBtn = document.querySelector('.' + type + 'Btn');
    whichBtn.style.width = 'unset'
}