import { recipes } from "./recipes.js";
import Recipe from "./Recipe.js";
import { principalSearch, searchInIngredientTag, searchInDeviceTag, searchInUstensilTag } from "./research.js";


const recipeClass = [];
const searchBar = document.getElementById("searchBar");

const ingredientListOpen = document.getElementById('ingredientsDown');
const ingredientListClose = document.getElementById('ingredientsUp');
const inputIngredientValue = document.getElementById('inputIngredient');
const deviceListOpen = document.getElementById('devicesDown');
const deviceListClose = document.getElementById('devicesUp');
const inputDeviceValue = document.getElementById('inputDevice');
const ustensilListOpen = document.getElementById('ustensilsDown');
const ustensilListClose = document.getElementById('ustensilsUp');
const inputUstensilValue = document.getElementById('inputUstensil');

var ingredientsTab = [];
var ustensilsTab = [];
var devicesTab = [];


export function displayRecipe(recipes) {
    
    let recipeSection = document.getElementById("recipeCards");

    recipes.forEach(recipe => {
        const createRecipe = new Recipe(recipe);
        recipeClass.push(createRecipe);
        const createDom = createRecipe.createDom();
        recipeSection.appendChild(createDom);
    });
}

export function createTabTag(recipes) {

    recipes.forEach(recipe => {
        recipe.ingredients.forEach((ingredient) => { 
            ingredientsTab.push(ingredient.ingredient.charAt(0).toUpperCase() + ingredient.ingredient.slice(1).toLowerCase());
        });
        recipe.ustensils.forEach((ustensil) => {
            ustensilsTab.push(ustensil.charAt(0).toUpperCase() + ustensil.slice(1).toLowerCase());
        });
        devicesTab.push(recipe.appliance.charAt(0).toUpperCase() + recipe.appliance.slice(1).toLowerCase())    
    });

    ingredientsTab = [...new Set(ingredientsTab)].sort();
    ustensilsTab = [...new Set(ustensilsTab)].sort();
    devicesTab = [...new Set(devicesTab)].sort();
    
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
    const ulLocation = document.getElementById(type + 'List');
    const liTag = document.createElement('li');
    liTag.textContent = element;
    ulLocation.appendChild(liTag);
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

function init() {
    displayRecipe(recipes);
    createTabTag(recipes);
    
}

init();

searchBar.addEventListener("input", () => {principalSearch(recipeClass, searchBar.value)});
searchBar.addEventListener("keypress", (e) => {if(e.key === 'Enter') { e.preventDefault()}});

ingredientListOpen.addEventListener('click', () => {openList('ingredient')});
ingredientListClose.addEventListener('click', () => {closeList('ingredient')});

deviceListOpen.addEventListener('click', () => {openList('device')});
deviceListClose.addEventListener('click', () => {closeList('device')});

ustensilListOpen.addEventListener('click', () => {openList('ustensil')});
ustensilListClose.addEventListener('click', () => {closeList('ustensil')});

inputIngredientValue.addEventListener('input', () => {searchInIngredientTag(ingredientsTab, inputIngredientValue.value)});
inputDeviceValue.addEventListener('input', () => {searchInDeviceTag(devicesTab, inputDeviceValue.value)});
inputUstensilValue.addEventListener('input', () => {searchInUstensilTag(ustensilsTab, inputUstensilValue.value)});
