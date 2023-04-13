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
    let result = [];
    /**
     * Permet d'afficher l'ensemble des recettes lorsque aucun tag n'est sélectionné et aucun que la barre de recherche est vide
     */
    if(!inputValue.length && !ingredientTagCheckedTab.length && !ustensilTagCheckedTab.length && !deviceTagCheckedTab.length) { 
        return displaySearchRecipes(recipes);
    }
    recipes.forEach(recipe => { 
        /**
         * Si aucun tag n'est sélectionné et que la valeur de la barre de recherche est supérieure à 3
         */
        if(inputValue.length > 3 && !ingredientTagCheckedTab.length && !ustensilTagCheckedTab.length && !deviceTagCheckedTab.length) {
            /**
             * Utilisation de la classe Recipe pour vérifier si la recette contient la valeur recherchée dans son nom, sa description ou ses ingrédients
             */
            if(recipe.includeName(inputValue) || recipe.includeDescription(inputValue) || recipe.includeIngredient(inputValue)) {
                result.push(recipe);        
            }
        }
        /**
         * Si un ou plusieurs tags ont été sélectionnés
         */
        if(ingredientTagCheckedTab.length || ustensilTagCheckedTab.length || deviceTagCheckedTab.length) {
            /**
             * Utilisation de la methode every pour vérifier si chaque tag sélectionnés est present dans une recette
             */
            if(ingredientTagCheckedTab.every(ingredient => recipe.includeIngredient(ingredient)) && ustensilTagCheckedTab.every(ustensil => recipe.includeUstensil(ustensil)) && deviceTagCheckedTab.every(device => recipe.includeAppliance(device))) {
                result.push(recipe)
            }
        }
    })
    /**
     * Si la barre de recherche contient une valeur supérieure à 3 ET que un ou plusieurs tags ont été sélectionnés
     */
    if(inputValue.length > 3 && ingredientTagCheckedTab.length || ustensilTagCheckedTab.length || deviceTagCheckedTab.length) {
        let searchInTag = [];
        /**
         * Pour chaque recette déjà trouvée
         */
        result.forEach((recipe) => {
            if(recipe.includeName(inputValue) || recipe.includeDescription(inputValue) || recipe.includeIngredient(inputValue)) {
                searchInTag.push(recipe);        
            }
        })
        /**
         * Si aucune recette ne correspond affichage d'un message
         */
        if(!searchInTag.length){
           return noRecipe();
        }
        else {
            return displaySearchRecipes(searchInTag);
        }
    }
    /**
     * S'il y a un résultat à la recherche new Set pour supprimer les doublons et .sort pour trier
     */
    if(result.length) {
        result = [...new Set(result)].sort();
        return displaySearchRecipes(result)
    }
    else{
        /**
         * Sinon, si la valeur de la barre de recherche est supérieure à 3 et qu'aucun résultat n'est trouvé, affichage d'un message
         */
        if(inputValue.length > 3) {
            return noRecipe();
        }
    }
}
/**
 * Fonction qui permet d'afficher un message lorsqu'aucune recette n'est trouvée
 */
function noRecipe () {
    recipeSection.innerHTML = '';
    const displayMessage = document.createElement('h3');
    displayMessage.classList.add('displayMessage');
    displayMessage.textContent = 'Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc';
    recipeSection.appendChild(displayMessage);

}
/**
 * Fonction permettant d'effectuer une recherche dans la liste des tags sélectionnables
 * @param {Array} ingredientsTab 
 * @param {string} inputValue 
 */
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