const recipeSection = document.getElementById("recipeCards");
/**
 * Importation des fonctions nécéssaires
 */
import { displaySearchRecipes } from './index.js';
import {createTagDom} from './index.js';
/**
 * Permet d'initialiser la fonction de recherche par tag ou avec la barre de recherche selon plusieurs conditions
 * @param {Array} recipes Les recettes dans lesquels faire la recherche
 * @param {string} inputValue La valeur recherchée
 * @param {Array} ingredientTagCheckedTab le tableau des ingrédients séléctionnés
 * @param {Array} ustensilTagCheckedTab le tableau des ustensils séléctionnés
 * @param {Array} deviceTagCheckedTab le tableau des appareils séléctionnés
 * @returns le resultat des recherches dans la variable resultat
 */
export function principalSearch(recipes, inputValue, ingredientTagCheckedTab, ustensilTagCheckedTab, deviceTagCheckedTab){
    inputValue = inputValue.trim();   
    let result = []; 
    if(!inputValue.length && !ingredientTagCheckedTab.length && !ustensilTagCheckedTab.length && !deviceTagCheckedTab.length) { 
        return displaySearchRecipes(recipes);
    }
    for(let i = 0; i < recipes.length; i++) {
        if(inputValue.length > 3 && !ingredientTagCheckedTab.length && !ustensilTagCheckedTab.length && !deviceTagCheckedTab.length) {
            if(recipes[i].includeName(inputValue) || recipes[i].includeDescription(inputValue) || recipes[i].includeIngredient(inputValue)) {
                result.push(recipes[i]);        
            }
        }
        if(ingredientTagCheckedTab.length || ustensilTagCheckedTab.length || deviceTagCheckedTab.length) {
            if(ingredientTagCheckedTab.every(ingredient => recipes[i].includeIngredient(ingredient)) && ustensilTagCheckedTab.every(ustensil => recipes[i].includeUstensil(ustensil)) && deviceTagCheckedTab.every(device => recipes[i].includeAppliance(device))) {
                result.push(recipes[i])
            }
        }
    }
    if(inputValue.length > 3 && ingredientTagCheckedTab.length || ustensilTagCheckedTab.length || deviceTagCheckedTab.length) {
        let searchInTag = [];
        for(let i = 0; i < result.length; i++) {
            if(result[i].includeName(inputValue) || result[i].includeDescription(inputValue) || result[i].includeIngredient(inputValue)) {
                searchInTag.push(result[i]);        
            }
        }
        if(!searchInTag.length){
           return noRecipe();
        }
        else {
            return displaySearchRecipes(searchInTag);
        }
    }
    if(result.length) {
        result = [...new Set(result)].sort();
        return displaySearchRecipes(result)
    }
    else{
        if(inputValue.length > 3) {
            return noRecipe();
        }
    }
}

function noRecipe () {
    recipeSection.innerHTML = '';
    const displayMessage = document.createElement('h3');
    displayMessage.classList.add('displayMessage');
    displayMessage.textContent = 'Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc';
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