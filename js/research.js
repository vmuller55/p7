const recipeSection = document.getElementById("recipeCards");
const searchBar = document.getElementById("searchBar");

export var resultTag = [];


import { recipeClass } from './index.js';
import { displaySearchRecipes } from './index.js';
import {createTagDom} from './index.js';

export function principalSearch(recipes, inputValue, ingredientTagCheckedTab, ustensilTagCheckedTab, deviceTagCheckedTab){

    inputValue = inputValue.trim();
    let message = '';

    if(ingredientTagCheckedTab.length > 0 || ustensilTagCheckedTab.length > 0 || deviceTagCheckedTab.length > 0) {
        if(!searchBar.value) {
            searchWithTag(recipes, ingredientTagCheckedTab, ustensilTagCheckedTab, deviceTagCheckedTab)
            displaySearchRecipes(resultTag)
        }
        else{
            searchWithTag(recipes, ingredientTagCheckedTab, ustensilTagCheckedTab, deviceTagCheckedTab)
            searchWithBar(resultTag, inputValue); 
            displaySearchRecipes(resultTag) 
        }
    }
    else{  
        if(!searchBar.value && ingredientTagCheckedTab || ustensilTagCheckedTab || deviceTagCheckedTab.length){
            searchWithTag(resultTag, ingredientTagCheckedTab, ustensilTagCheckedTab, deviceTagCheckedTab)
        }
        searchWithBar(recipeClass, inputValue)
        displaySearchRecipes(resultTag)
    }
    if(searchBar.value.length < 3 && ingredientTagCheckedTab.length == 0 && ustensilTagCheckedTab.length == 0  && deviceTagCheckedTab.length == 0) {
        message = 'Veuillez entrer au moins 3 caractères'
        noRecipe(message);
    }
    else {
        if(resultTag.length == 0) {
            message = 'Aucune recettes correspondent à vos critères. Essayez "tarte aux pommes", "poisson" ou changez les filtres de recherche.'
            noRecipe (message)
        }
    }    
    if(!searchBar.value && ingredientTagCheckedTab.length == 0 && ustensilTagCheckedTab.length == 0  && deviceTagCheckedTab.length == 0) {
        displaySearchRecipes(recipeClass)
        return resultTag = []
    }
    
    
    resultTag = [...new Set(resultTag)];
    return resultTag
}

function noRecipe (message) {
    recipeSection.innerHTML = '';
    const displayMessage = document.createElement('h3');
    displayMessage.classList.add('displayMessage');
    displayMessage.textContent = message;
    recipeSection.appendChild(displayMessage);

}

function searchWithBar(recipes, inputValue) {
    if(inputValue.length >= 3) { 
        recipes.forEach(recipe => {
            if(recipe.includeName(inputValue) || recipe.includeDescription(inputValue) || recipe.includeIngredient(inputValue)) {
                resultTag.push(recipe);         
            }
        })
        resultTag.forEach(recipe => {
            if(!recipe.includeName(inputValue) || !recipe.includeDescription(inputValue) || !recipe.includeIngredient(inputValue)) {
                removeElementFromArray (resultTag, recipe)         
            }
        })
        resultTag = [... new Set(resultTag)];
        return resultTag;
    }
}

// ici la branch native

function searchWithTag(recipes, ingredientTagCheckedTab, ustensilTagCheckedTab, deviceTagCheckedTab) {
    recipes.forEach(recipe => {
        ingredientTagCheckedTab.forEach(ingredient => {
            if(recipe.includeIngredient(ingredient)) {
                resultTag.push(recipe);
                resultTag = [...new Set(resultTag)];
            }
            else {
                let here = resultTag.indexOf(recipe);
                if(here !== -1) {
                    resultTag.splice(here, 1)
                }   
            } 
        })
        ustensilTagCheckedTab.forEach(ustensil => {
            if(recipe.includeUstensil(ustensil)) {
                resultTag.push(recipe)
                resultTag = [...new Set(resultTag)];
            }
            else {
                let here = resultTag.indexOf(recipe);
                if(here !== -1) {
                    resultTag.splice(here, 1)
                }   
            }
        })
        deviceTagCheckedTab.forEach(device => {
            if(recipe.includeAppliance(device)) {
                resultTag.push(recipe)
                resultTag = [...new Set(resultTag)];
            }
            else {
                let here = resultTag.indexOf(recipe);
                if(here !== -1) {
                    resultTag.splice(here, 1)
                }   
            }
        })
        
    });
    resultTag = [...new Set(resultTag)];
    return resultTag
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