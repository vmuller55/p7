import { recipes } from "./recipes.js";
import Recipe from "./Recipe.js";
import { principalSearch, searchInIngredientTag, searchInDeviceTag, searchInUstensilTag, resultTag } from "./research.js";


export const recipeClass = [];

const searchBar = document.getElementById("searchBar");

const ingredientListOpen = document.getElementById('ingredientsDown');
const ingredientListClose = document.getElementById('ingredientsUp');
const inputIngredient = document.getElementById('inputIngredient');
const deviceListOpen = document.getElementById('devicesDown');
const deviceListClose = document.getElementById('devicesUp');
const inputDevice = document.getElementById('inputDevice');
const ustensilListOpen = document.getElementById('ustensilsDown');
const ustensilListClose = document.getElementById('ustensilsUp');
const inputUstensil = document.getElementById('inputUstensil');

var ingredientTagCheckedTab = [];
var ustensilTagCheckedTab = [];
var deviceTagCheckedTab = [];

var ingredientsTab = [];
var ustensilsTab = [];
var devicesTab = [];


function displayRecipe(recipes) {
    
    let recipeSection = document.getElementById("recipeCards");
    recipeSection.innerHTML = ''
    recipes.forEach(recipe => {    
        const createRecipe = new Recipe(recipe);
        recipeClass.push(createRecipe);
        const createDom = createRecipe.createDom();
        recipeSection.appendChild(createDom);
    });
}

export function displaySearchRecipes(recipes) {
    let recipeSection = document.getElementById("recipeCards");
    recipeSection.innerHTML = ''
    recipes.forEach(recipe => { 
        const createDom = recipe.createDom();
        recipeSection.appendChild(createDom);
    })
}

export function createTabTag(recipes) {

    ingredientsTab = [];
    ustensilsTab = [];
    devicesTab = [];
    
    if(searchBar.value == 0 && ingredientTagCheckedTab.length == 0 && ustensilTagCheckedTab.length == 0 && deviceTagCheckedTab.length == 0) {
        recipes = recipeClass
    }

    let ingredientList = document.getElementById('ingredientsList');
    let deviceList = document.getElementById('devicesList');
    let ustensilList = document.getElementById('ustensilsList');

    ingredientList.innerHTML = '';
    deviceList.innerHTML = '';
    ustensilList.innerHTML = '';

    recipes.forEach(recipe => {

        recipe.ingredients.forEach((ingredient) => { 
            ingredientsTab.push(ingredient.ingredient.charAt(0).toUpperCase() + ingredient.ingredient.slice(1).toLowerCase());
        })

        recipe.ustensils.forEach((ustensil) => { 
            ustensilsTab.push(ustensil.charAt(0).toUpperCase() + ustensil.slice(1).toLowerCase());
        });

        devicesTab.push(recipe.appliance.charAt(0).toUpperCase() + recipe.appliance.slice(1).toLowerCase());

    });
    
    ingredientsTab = [...new Set(ingredientsTab)].sort();
    ustensilsTab = [...new Set(ustensilsTab)].sort();
    devicesTab = [...new Set(devicesTab)].sort();
    
    removeExistingTagFromList(ingredientTagCheckedTab, ingredientsTab);
    removeExistingTagFromList(ustensilTagCheckedTab,ustensilsTab);
    removeExistingTagFromList(deviceTagCheckedTab, devicesTab);

    ingredientsTab.forEach((ingredient) => {
        createTagDom(ingredient, 'ingredients');   
    })
    ustensilsTab.forEach((ustensil) => {
        createTagDom(ustensil, 'ustensils');
    })
    
    devicesTab.forEach((device) => {
        createTagDom(device, 'devices');
    })
}

export function createTagDom(element, type) {
    let ulLocation = document.getElementById(type + 'List');
    let liTag = document.createElement('li');
    liTag.textContent = element;
    ulLocation.appendChild(liTag);
    
    liTag.addEventListener('click',() => {
        addTag(element, type);
        addTagInTab(element, type);
        principalSearch(whichSearch(resultTag), element, ingredientTagCheckedTab, ustensilTagCheckedTab, deviceTagCheckedTab);
        displaySearchRecipes(resultTag);
        createTabTag(resultTag);
    }) 
}

function addTagInTab(element, type) {
    switch (type) {
        case 'ingredients' :
            ingredientTagCheckedTab.push(element);
            break;
        case 'ustensils' :
            ustensilTagCheckedTab.push(element);
            break;
        case 'devices' :
            deviceTagCheckedTab.push(element);
            break;
    };
}

function addTag(element, type) {
    let ulLocation = document.getElementById('tagChecked');
    let liTag = document.createElement('li');
    liTag.classList.add(type + 'TagChecked')
    liTag.textContent = element;
    let closeCross = document.createElement('i');
    closeCross.setAttribute('class', 'fa-sharp fa-regular fa-circle-xmark');
    liTag.appendChild(closeCross);
    ulLocation.appendChild(liTag);

    closeCross.addEventListener('click', () => {
        liTag.remove(),
        removeTag(type, element);
    });
}

function removeTag (type, element) {
    switch (type) {
        case 'ingredients' :
             ingredientTagCheckedTab.forEach(ingredient => {
                if(ingredient == element) {  
                    removeElementFromArray(ingredientTagCheckedTab, ingredient);
                    principalSearch(recipeClass, ingredient, ingredientTagCheckedTab, ustensilTagCheckedTab, deviceTagCheckedTab);
                }
             });
            break;
        case 'ustensils' :
            ustensilTagCheckedTab.forEach(ustensil =>{
                if(ustensil == element) {  
                    removeElementFromArray(ustensilTagCheckedTab, ustensil);
                    principalSearch(recipeClass, ustensil, ingredientTagCheckedTab, ustensilTagCheckedTab, deviceTagCheckedTab);
                }
             });
            break;
        case 'devices' :
            deviceTagCheckedTab.forEach(device =>{
                if(device == element) {
                    removeElementFromArray(deviceTagCheckedTab, device);  
                    principalSearch(recipeClass, device, ingredientTagCheckedTab, ustensilTagCheckedTab, deviceTagCheckedTab);
                }
             });
            break;
    }
    if(!searchBar.value && ingredientTagCheckedTab.length == 0 && ustensilTagCheckedTab.length == 0 && deviceTagCheckedTab.length == 0) {
        displaySearchRecipes(recipeClass);
        createTabTag(recipeClass);
        resultTag == []; 
    }
    else {
        if(searchBar.value && ingredientTagCheckedTab.length == 0 && ustensilTagCheckedTab.length == 0 && deviceTagCheckedTab.length == 0){
            principalSearch(recipeClass, searchBar.value, ingredientTagCheckedTab, ustensilTagCheckedTab, deviceTagCheckedTab)
            displaySearchRecipes(resultTag);
            createTabTag(resultTag);
        }
        else {
            displaySearchRecipes(resultTag);
            createTabTag(resultTag);
        }
    }
}

function whichSearch(resultTag){
    if(resultTag.length == 0 && searchBar.value == 0) {
        resultTag = recipeClass;
    }
    if(searchBar.value && ingredientTagCheckedTab.length == 0 && ustensilTagCheckedTab.length == 0  && deviceTagCheckedTab.length == 0 && resultTag.length == 0) {
        resultTag = recipeClass;
    }
    return resultTag
}

function init() {
    displayRecipe(recipes);
    createTabTag(recipes);
}

init();

searchBar.addEventListener("input", () => {
    console.log(searchBar.value)
    principalSearch(whichSearch(resultTag), searchBar.value,ingredientTagCheckedTab, ustensilTagCheckedTab, deviceTagCheckedTab),
    createTabTag(resultTag)
});
searchBar.addEventListener("keypress", (e) => {if(e.key === 'Enter') { e.preventDefault()}});

ingredientListOpen.addEventListener('click', () => {openList('ingredient'), closeList('device'), closeList('ustensil')});
ingredientListClose.addEventListener('click', () => {closeList('ingredient')});

deviceListOpen.addEventListener('click', () => {openList('device'), closeList('ingredient'), closeList('ustensil')});
deviceListClose.addEventListener('click', () => {closeList('device')});

ustensilListOpen.addEventListener('click', () => {openList('ustensil'), closeList('device'), closeList('ingredient')});
ustensilListClose.addEventListener('click', () => {closeList('ustensil')});

inputIngredient.addEventListener('input', () => {searchInIngredientTag(ingredientsTab, inputIngredient.value, ingredientTagCheckedTab, ustensilTagCheckedTab, deviceTagCheckedTab)});
inputDevice.addEventListener('input', () => {searchInDeviceTag(devicesTab, inputDevice.value)});
inputUstensil.addEventListener('input', () => {searchInUstensilTag(ustensilsTab, inputUstensil.value)});

