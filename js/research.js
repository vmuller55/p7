/**
 * Importation des fonctions nécessaires
 */
import { displaySearchRecipes, createTagDom } from './index.js'
const recipeSection = document.getElementById('recipeCards')
/**
 * Permet d'incrémenter un tableau avec les recettes contenant le/les tags et/ou la valeur de la barre de recherche
 * @param {Array} recipes Les recettes dans lesquels faire la recherche
 * @param {string} inputValue La valeur recherchée
 * @param {Array} ingredientTagCheckedTab le tableau des ingrédients sélectionnés
 * @param {Array} ustensilTagCheckedTab le tableau des ustensiles sélectionnés
 * @param {Array} deviceTagCheckedTab le tableau des appareils sélectionnés
 * @returns le résultat des recherches dans la variable résultat
 */
export function principalSearch (recipes, inputValue, ingredientTagCheckedTab, ustensilTagCheckedTab, deviceTagCheckedTab) {
  /**
   * Permet de récupérer la valeur sans espaces autour
   */
  inputValue = inputValue.trim()
  /**
   * Tableau qui va recueillir les recettes correspondantes à la recherche, initialisé avec l'ensemble des recettes et mis à zéro seulement lors d'une recherche
   */
  let result = recipes
  /**
   * Permet d'afficher l'ensemble des recettes lorsque aucun tag n'est sélectionné et que la barre de recherche est vide
   */
  if (!inputValue.length && !ingredientTagCheckedTab.length && !ustensilTagCheckedTab.length && !deviceTagCheckedTab.length) {
    return displaySearchRecipes(recipes)
  }
  /**
   * Permet de commencer la recherche lorsque la valeur saisie contient 3 caractères ou plus
   */
  if (inputValue.length >= 3) {
    result = []
    /**
     * Utilisation de la classe Recipe pour vérifier si la recette contient la valeur recherchée dans son nom, sa description ou ses ingrédients
     */
    recipes.forEach(recipe => {
      if (recipe.includeName(inputValue) || recipe.includeDescription(inputValue) || recipe.includeIngredient(inputValue)) {
        result.push(recipe)
      }
    })
  }
  /**
   * Tableau qui va recueillir les résultats des filtres, initialisé avec les résultats de la recherche précédente
   */
  let lastResult = result
  /**
   * S'il y a des filtres sélectionnés
   */
  if (ingredientTagCheckedTab.length || ustensilTagCheckedTab.length || deviceTagCheckedTab.length) {
    lastResult = []
    /**
     * Si une recette parmi les résultats précédents contient les tags sélectionnés, elle est ajoutée dans le tableau
     */
    result.forEach(recipe => {
      if (ingredientTagCheckedTab.every(ingredient => recipe.includeIngredient(ingredient)) && ustensilTagCheckedTab.every(ustensil => recipe.includeUstensil(ustensil)) && deviceTagCheckedTab.every(device => recipe.includeAppliance(device))) {
        lastResult.push(recipe)
      }
    })
  }
  /**
   * S'il y a un résultat
   */
  if (lastResult.length) {
    lastResult = [...new Set(lastResult)].sort()
    return displaySearchRecipes(lastResult)
  } else {
    /**
     * Sinon, si la valeur de la barre de recherche est supérieure à 3, affichage d'un message
     */
    if (inputValue.length >= 3) {
      return noRecipe()
    }
  }
}
/**
  * Fonction qui permet d'afficher un message lorsqu'aucune recette n'est trouvée
  */
function noRecipe () {
  recipeSection.innerHTML = ''
  const displayMessage = document.createElement('h3')
  displayMessage.classList.add('displayMessage')
  displayMessage.textContent = 'Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc'
  recipeSection.appendChild(displayMessage)
}
/**
 * Fonction permettant d'effectuer une recherche dans la liste des tags sélectionnables
 * @param {Array} ingredientsTab
 * @param {string} inputValue
 */
export function searchInIngredientTag (ingredientsTab, inputValue) {
  const ingredientList = document.getElementById('ingredientsList')
  ingredientList.innerHTML = ''
  ingredientsTab.forEach(findIngredient => {
    if (findIngredient.toLowerCase().includes(inputValue.toLowerCase())) {
      createTagDom(findIngredient, 'ingredients')
    }
  })
}
export function searchInDeviceTag (deviceTab, inputValue) {
  const deviceList = document.getElementById('devicesList')
  deviceList.innerHTML = ''
  deviceTab.forEach(findDevice => {
    if (findDevice.toLowerCase().includes(inputValue.toLowerCase())) {
      createTagDom(findDevice, 'devices')
    }
  })
}
export function searchInUstensilTag (ustensilsTab, inputValue) {
  const ustensilList = document.getElementById('ustensilsList')
  ustensilList.innerHTML = ''
  ustensilsTab.forEach(findUstensil => {
    if (findUstensil.toLowerCase().includes(inputValue.toLowerCase())) {
      createTagDom(findUstensil, 'ustensils')
    }
  })
}
