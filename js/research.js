const recipeSection = document.getElementById("recipeCards");

export var tabTag = [];

import { displayRecipe } from "./index.js";
import {createTagDom} from './index.js';




export function principalSearch(recipes, inputValue){

    inputValue = inputValue.trim();
    let result = [];
    let message = '';

    if(inputValue.length >= 3) { 
        recipes.forEach(recipe => {
            if(recipe.includeName(inputValue) || recipe.includeDescription(inputValue) || recipe.includeIngredient(inputValue)) {
                result.push(recipe);
            }
        })
        recipeSection.innerHTML = "";
        displayRecipe(result);
        if(result.length == 0) {
            message = 'Aucune recettes correspondent à vos critères. Essayez "tarte aux pommes", "poisson" ou changez les filtres de recherche.'
            noRecipe (message)
        }
    }
    else{
        message = 'Veuillez entrer au moins 3 caractères'
        noRecipe(message);
    }
    
    if(inputValue.length == 0) {
        recipeSection.innerHTML = "";
        displayRecipe(recipes);
       
    }   
}

function noRecipe (message) {
    recipeSection.innerHTML = "";
    const displayMessage = document.createElement('h3');
    displayMessage.classList.add('displayMessage');
    displayMessage.textContent = message;
    recipeSection.appendChild(displayMessage);

}




export function searchInIngredientTag(ingredientsTab, inputValue){
    const ingredientList = document.getElementById('ingredientsList');
    ingredientList.innerHTML = '';
    ingredientsTab.forEach(findIngredient => {
        if(findIngredient.toLowerCase().includes(inputValue.toLowerCase())) {
            createTagDom(findIngredient, 'ingredients');
        }
    })
}
export function searchInDeviceTag(deviceTab, inputValue){
    const deviceList = document.getElementById('devicesList');
    deviceList.innerHTML = '';
    deviceTab.forEach(findDevice => {
        if(findDevice.toLowerCase().includes(inputValue.toLowerCase())) {
            createTagDom(findDevice, 'devices');
        }
    })
}
export function searchInUstensilTag(ustensilsTab, inputValue){
    const ustensilList = document.getElementById('ustensilsList');
    ustensilList.innerHTML = '';
    ustensilsTab.forEach(findUstensil => {
        if(findUstensil.toLowerCase().includes(inputValue.toLowerCase())) {
            createTagDom(findUstensil, 'ustensils');
        }
    })
}

export function filterWithTag(recipes){
    let result = [];
    tabTag.forEach(tag => {
        recipes.forEach(recipe => {
            recipe.ingredients.forEach(ingredient => {
                if(ingredient.ingredient.toLowerCase().includes(tag)) {
                    result.push(recipe);
                }
            })
            if(recipe.appliance.toLowerCase().includes(tag) || recipe.ustensils.includes(tag)) {
                result.push(recipe)
            }
        })
    })
    if(result.length == 0) {
        recipeSection.innerHTML = "";
        displayRecipe(recipes)
    }
    else{
        recipeSection.innerHTML = "";
        displayRecipe(result)
    }
}


