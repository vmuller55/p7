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
    /**
     * Permet de récupérer la valeur sans espaces autour
     */
    inputValue = inputValue.trim();
    /**
     * Tableau qui va recueillir les recettes correspondantes à la recherche
     */  
    let result = recipes;
    /**
     * Permet d'afficher l'ensemble des recettes lorsque aucun tag n'est sélectionné et aucun que la barre de recherche est vide
     */
    if(!inputValue.length && !ingredientTagCheckedTab.length && !ustensilTagCheckedTab.length && !deviceTagCheckedTab.length) { 
        return displaySearchRecipes(recipes);
    }
    if(inputValue.length >= 3) {
        result = [];
        /**
         * Utilisation de la classe Recipe pour vérifier si la recette contient la valeur recherchée dans son nom, sa description ou ses ingrédients
         */
        for(let i = 0; i < recipes.length; i++) {
            if(recipes[i].includeName(inputValue) || recipes[i].includeDescription(inputValue) || recipes[i].includeIngredient(inputValue)) {
                result.push(recipes[i]);        
            }
        }
    }
    let lastResult = result;
    if(ingredientTagCheckedTab.length || ustensilTagCheckedTab.length || deviceTagCheckedTab.length) {
        lastResult = [];
        for(let i =0; i < result.length; i++) {
            if(ingredientTagCheckedTab.every(ingredient => result[i].includeIngredient(ingredient)) && ustensilTagCheckedTab.every(ustensil => result[i].includeUstensil(ustensil)) && deviceTagCheckedTab.every(device => result[i].includeAppliance(device))) {
                lastResult.push(result[i])
            }
        }
    }
    if(lastResult.length) {
        lastResult = [...new Set(lastResult)].sort();
        return displaySearchRecipes(lastResult)
    }
    else{
        /**
         * Sinon, si la valeur de la barre de recherche est supérieure à 3 et qu'aucun résultat n'est trouvé, affichage d'un message
         */
        if(inputValue.length >= 3) {
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