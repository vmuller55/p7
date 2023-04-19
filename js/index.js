import { recipes } from './recipes.js'
import Recipe from './Recipe.js'
import { principalSearch, searchInIngredientTag, searchInDeviceTag, searchInUstensilTag } from './research.js'
/**
 * Tableau dans lequel on va initialiser toutes les recettes
 */
export const allRecipe = []
/**
 * Permet de gérer les inputs et l'ouverture de la liste des filtres
 */
const searchBar = document.getElementById('searchBar')
const ingredientListOpen = document.getElementById('ingredientsDown')
const ingredientListClose = document.getElementById('ingredientsUp')
const inputIngredient = document.getElementById('inputIngredient')
const deviceListOpen = document.getElementById('devicesDown')
const deviceListClose = document.getElementById('devicesUp')
const inputDevice = document.getElementById('inputDevice')
const ustensilListOpen = document.getElementById('ustensilsDown')
const ustensilListClose = document.getElementById('ustensilsUp')
const inputUstensil = document.getElementById('inputUstensil')
/**
 * Gestion de l'affichage du responsive
 */
const ustensilHide = document.querySelector('.ustensilBtn')
const deviceHide = document.querySelector('.deviceBtn')
const ingredientHide = document.querySelector('.ingredientBtn')
const mediaQuery = window.matchMedia('(max-width: 749px)')
/**
 * Tableaux des filtres sélectionnés
 */
const ingredientTagCheckedTab = []
const ustensilTagCheckedTab = []
const deviceTagCheckedTab = []
/**
 * Tableaux des filtres sélectionnables
 */
let ingredientsTab = []
let ustensilsTab = []
let devicesTab = []
/**
 * Utilise la classe Recipe pour le premier affichage des recettes
 * @param {Array} recipes Tableaux des recettes sélectionnées
 */
function displayRecipe (recipes) {
  const recipeSection = document.getElementById('recipeCards')
  recipeSection.innerHTML = ''
  recipes.forEach(recipe => {
    const createRecipe = new Recipe(recipe)
    allRecipe.push(createRecipe)
    const createDom = createRecipe.createDom()
    recipeSection.appendChild(createDom)
  })
  /**
   * Permet de mettre à jour les filtres sélectionnables
   */
  createTabTag((recipes))
}
/**
 * Permet d'afficher les recettes recherchées
 * @param {Array} recipes
 */
export function displaySearchRecipes (recipes) {
  const recipeSection = document.getElementById('recipeCards')
  recipeSection.innerHTML = ''
  recipes.forEach(recipe => {
    const createDom = recipe.createDom()
    recipeSection.appendChild(createDom)
  })
  /**
   * Permet de mettre à jour les filtres sélectionnables
   */
  createTabTag(recipes)
}
/**
 * Permet d'initialiser la fonction de tri et la fonction relative à la création des éléments
 * @param {Array} recipes
 */
export function createTabTag (recipes) {
  filterTabTag(recipes)
  ingredientsTab.forEach((ingredient) => {
    createTagDom(ingredient, 'ingredients')
  })
  ustensilsTab.forEach((ustensil) => {
    createTagDom(ustensil, 'ustensils')
  })
  devicesTab.forEach((device) => {
    createTagDom(device, 'devices')
  })
}
/**
 * Permet de filtrer les éléments sélectionables dans les filtres
 * @param {Array} recipes
 */
function filterTabTag (recipes) {
  ingredientsTab = []
  ustensilsTab = []
  devicesTab = []
  /**
   * Permet d'afficher l'ensemble des éléments si aucun tag n'est sélectionné et si aucune valeur est présente dans la barre de recherche
   */
  if (!searchBar.value && !ingredientTagCheckedTab.length && !ustensilTagCheckedTab.length && !deviceTagCheckedTab.length) {
    recipes = allRecipe
  }
  /**
   * Suppression du précédent contenu des listes
   */
  const ingredientList = document.getElementById('ingredientsList')
  const deviceList = document.getElementById('devicesList')
  const ustensilList = document.getElementById('ustensilsList')
  ingredientList.innerHTML = ''
  deviceList.innerHTML = ''
  ustensilList.innerHTML = ''
  /**
   * Ajout des éléments selon les recettes
   */
  recipes.forEach(recipe => {
    recipe.ingredients.forEach((ingredient) => {
      ingredientsTab.push(ingredient.ingredient.charAt(0).toUpperCase() + ingredient.ingredient.slice(1).toLowerCase())
    })
    recipe.ustensils.forEach((ustensil) => {
      ustensilsTab.push(ustensil.charAt(0).toUpperCase() + ustensil.slice(1).toLowerCase())
    })
    devicesTab.push(recipe.appliance.charAt(0).toUpperCase() + recipe.appliance.slice(1).toLowerCase())
  })
  /**
   * Permet de supprimer les doublons et de trier par ordre alphabétique
   */
  ingredientsTab = [...new Set(ingredientsTab)].sort()
  ustensilsTab = [...new Set(ustensilsTab)].sort()
  devicesTab = [...new Set(devicesTab)].sort()
  /**
   * Permet de supprimer un tag déjà sélectionné de la liste
   */
  removeExistingTagFromList(ingredientTagCheckedTab, ingredientsTab)
  removeExistingTagFromList(ustensilTagCheckedTab, ustensilsTab)
  removeExistingTagFromList(deviceTagCheckedTab, devicesTab)
}
function removeExistingTagFromList (array, list) {
  array.forEach((arrayElement) => {
    list.forEach((listElement) => {
      if (listElement === arrayElement) {
        removeElementFromArray(list, listElement)
      }
    })
  })
}
function removeElementFromArray (array, element) {
  const indexOfElement = array.indexOf(element)
  array.splice(indexOfElement, 1)
}
/**
 * Permet de créer un élément de la liste des filtres
 * @param {string} element
 * @param {string} type
 */
export function createTagDom (element, type) {
  const ulLocation = document.getElementById(type + 'List')
  const liTag = document.createElement('li')
  liTag.textContent = element
  ulLocation.appendChild(liTag)
  /**
   * Permet de gérer les événements au clic sut le tag
   */
  liTag.addEventListener('click', () => {
    addTag(element, type)
    addTagInTab(element, type)
    principalSearch(allRecipe, searchBar.value, ingredientTagCheckedTab, ustensilTagCheckedTab, deviceTagCheckedTab)
  })
}
/**
 * Permet d'ajouter un tag dans la liste au tableau de tag sélectionnés correspondant
 * @param {string} element
 * @param {string} type
 */
function addTagInTab (element, type) {
  switch (type) {
    case 'ingredients' :
      ingredientTagCheckedTab.push(element)
      break
    case 'ustensils' :
      ustensilTagCheckedTab.push(element)
      break
    case 'devices' :
      deviceTagCheckedTab.push(element)
      break
  };
}
/**
 * Permet de créer le tag sélectionné
 * @param {string} element
 * @param {string} type
 */
function addTag (element, type) {
  const ulLocation = document.getElementById('tagChecked')
  const liTag = document.createElement('li')
  liTag.classList.add(type + 'TagChecked')
  liTag.textContent = element
  const closeCross = document.createElement('i')
  closeCross.setAttribute('class', 'fa-sharp fa-regular fa-circle-xmark')
  liTag.appendChild(closeCross)
  ulLocation.appendChild(liTag)
  /**
   * Gestion de la suppression du tag
   */
  closeCross.addEventListener('click', () => {
    liTag.remove()
    removeTag(type, element)
    principalSearch(allRecipe, searchBar.value, ingredientTagCheckedTab, ustensilTagCheckedTab, deviceTagCheckedTab)
  })
}
/**
 * Permet de supprimer le tag du tableau des tags sélectionnés et de faire une recherche sur les tags restants s'il y en a
 * @param {string} type
 * @param {string} element
 */
function removeTag (type, element) {
  /**
   * Suppression des tags dans les tableaux
   */
  switch (type) {
    case 'ingredients' :
      removeElementFromArray(ingredientTagCheckedTab, element)
      break
    case 'ustensils' :
      removeElementFromArray(ustensilTagCheckedTab, element)
      break
    case 'devices' :
      removeElementFromArray(deviceTagCheckedTab, element)
      break
  }
}
/**
 * Permet la gestion de l'ouverture et la fermeture des listes de tags sélectionnables
 * @param {string} type
 */
function openList (type) {
  const whichList = document.querySelector('.' + type + 'List')
  whichList.style.display = 'block'
  const whichBtn = document.querySelector('.' + type + 'Btn')
  whichBtn.style.width = '600px'
  /**
   * Pour le format 'mobile'
   */
  if (mediaQuery.matches) {
    console.log('ici')
    switch (type) {
      case 'ingredient' :
        console.log('ici')
        ustensilHide.style.display = 'none'
        deviceHide.style.display = 'none'
        whichBtn.style.width = '400px'
        break
      case 'device' :
        console.log('ici')
        ustensilHide.style.display = 'none'
        ingredientHide.style.display = 'none'
        whichBtn.style.width = '400px'
        break
      case 'ustensil' :
        console.log('ici')
        ingredientHide.style.display = 'none'
        deviceHide.style.display = 'none'
        whichBtn.style.width = '400px'
        break
    }
  }
}
function closeList (type) {
  const whichList = document.querySelector('.' + type + 'List')
  whichList.style.display = 'none'
  const whichBtn = document.querySelector('.' + type + 'Btn')
  whichBtn.style.width = 'unset'
  if (mediaQuery.matches) {
    ustensilHide.style.display = 'flex'
    ingredientHide.style.display = 'flex'
    deviceHide.style.display = 'flex'
  }
}
/**
 * Initialisation des fonctions primaires
 */
function init () {
  displayRecipe(recipes)
}
init()
/**
 * Gestion des événements sur les différents inputs
 */
searchBar.addEventListener('input', () => {
  principalSearch(allRecipe, searchBar.value, ingredientTagCheckedTab, ustensilTagCheckedTab, deviceTagCheckedTab)
})
searchBar.addEventListener('keypress', (e) => { if (e.key === 'Enter') { e.preventDefault() } })

ingredientListOpen.addEventListener('click', () => { openList('ingredient'); if (!mediaQuery.matches) { closeList('device'); closeList('ustensil') } })
ingredientListClose.addEventListener('click', () => { closeList('ingredient') })

deviceListOpen.addEventListener('click', () => { openList('device'); if (!mediaQuery.matches) { closeList('ingredient'); closeList('ustensil') } })
deviceListClose.addEventListener('click', () => { closeList('device') })

ustensilListOpen.addEventListener('click', () => { openList('ustensil'); if (!mediaQuery.matches) { closeList('device'); closeList('ingredient') } })
ustensilListClose.addEventListener('click', () => { closeList('ustensil') })

inputIngredient.addEventListener('input', () => { searchInIngredientTag(ingredientsTab, inputIngredient.value, ingredientTagCheckedTab, ustensilTagCheckedTab, deviceTagCheckedTab) })
inputDevice.addEventListener('input', () => { searchInDeviceTag(devicesTab, inputDevice.value) })
inputUstensil.addEventListener('input', () => { searchInUstensilTag(ustensilsTab, inputUstensil.value) })
