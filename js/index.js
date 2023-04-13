import { recipes } from "./recipes.js";
import Recipe from "./Recipe.js";
import { principalSearch, searchInIngredientTag, searchInDeviceTag, searchInUstensilTag } from "./research.js";

/**
 * Tableau dans lequel on va initialiser toutes les recettes
 */
export const allRecipe = [];
/**
 * Permet de gérer les inputs et l'ouverture de la liste des filtres
 */
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
/**
 * Tableaux des filtres séléctionnés
 */
var ingredientTagCheckedTab = [];
var ustensilTagCheckedTab = [];
var deviceTagCheckedTab = [];
/**
 * Tableaux des filtres séléctionnable
 */
var ingredientsTab = [];
var ustensilsTab = [];
var devicesTab = [];
/**
 * Utilise la classe Recipe pour le premier affichage des recettes
 * @param {Array} recipes Tableaux des recettes séléctionnées
 */
function displayRecipe(recipes) {
    let recipeSection = document.getElementById("recipeCards");
    recipeSection.innerHTML = '';
    for(let i = 0; i < recipes.length; i++){
        const createRecipe = new Recipe(recipes[i]);
        allRecipe.push(createRecipe);
        const createDom = createRecipe.createDom();
        recipeSection.appendChild(createDom);
    }
    createTabTag((recipes))
}
/**
 * Permet d'afficher les recettes recherchées
 * @param {Array} recipes 
 */
export function displaySearchRecipes(recipes) {
    let recipeSection = document.getElementById("recipeCards");
    recipeSection.innerHTML = '';
    for(let i = 0; i < recipes.length; i++) {
        const createDom = recipes[i].createDom();
        recipeSection.appendChild(createDom);
    }
    createTabTag(recipes)  
}
/**
 * Permet d'initialiser la fonction de tri et la fonction relative à la création des éléments
 * @param {Array} recipes 
 */
export function createTabTag(recipes) {
    filterTabTag(recipes);
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
/**
 * Permet de filtrer les éléments séléctionables dans les filtres
 * @param {Array} recipes 
 */
function filterTabTag(recipes) {
    ingredientsTab = [];
    ustensilsTab = [];
    devicesTab = [];
    /**
     * permet d'afficher l'ensemble des éléments si aucun tag est séléctionné et si aucune valeur est présente dans la barre de recherche
     */
    if(!searchBar.value && !ingredientTagCheckedTab.length && !ustensilTagCheckedTab.length && !deviceTagCheckedTab.length) {
        recipes = allRecipe
    }
    /**
     * Supression du précédent contenu des listes
     */
    let ingredientList = document.getElementById('ingredientsList');
    let deviceList = document.getElementById('devicesList');
    let ustensilList = document.getElementById('ustensilsList');
    ingredientList.innerHTML = '';
    deviceList.innerHTML = '';
    ustensilList.innerHTML = '';
    /**
     * Ajout des éléments selon les recettes
     */
    recipes.forEach(recipe => {
        recipe.ingredients.forEach((ingredient) => { 
            ingredientsTab.push(ingredient.ingredient.charAt(0).toUpperCase() + ingredient.ingredient.slice(1).toLowerCase());
        })
        recipe.ustensils.forEach((ustensil) => { 
            ustensilsTab.push(ustensil.charAt(0).toUpperCase() + ustensil.slice(1).toLowerCase());
        });
        devicesTab.push(recipe.appliance.charAt(0).toUpperCase() + recipe.appliance.slice(1).toLowerCase());
    });
    /**
     * Permet de supprimer les doublons et de trier par ordre alphabetique
     */
    ingredientsTab = [...new Set(ingredientsTab)].sort();
    ustensilsTab = [...new Set(ustensilsTab)].sort();
    devicesTab = [...new Set(devicesTab)].sort();
    /**
     * Permet de supprimer un tag déjà séléctionné de la liste
     */
    removeExistingTagFromList(ingredientTagCheckedTab, ingredientsTab);
    removeExistingTagFromList(ustensilTagCheckedTab,ustensilsTab);
    removeExistingTagFromList(deviceTagCheckedTab, devicesTab);
}
/**
 * Permet de créer un élément de la liste des filtres
 * @param {string} element 
 * @param {string} type 
 */
export function createTagDom(element, type) {
    let ulLocation = document.getElementById(type + 'List');
    let liTag = document.createElement('li');
    liTag.textContent = element;
    ulLocation.appendChild(liTag);
    /**
     * Permet de gérer les evenements au clic sut le tag
     */
    liTag.addEventListener('click',() => {
        addTag(element, type);
        addTagInTab(element, type);
        principalSearch(allRecipe, searchBar.value, ingredientTagCheckedTab, ustensilTagCheckedTab, deviceTagCheckedTab);
    }) 
}
/**
 * Permet d'ajouter un tag dans la liste au tableau de tag séléctionnés correspondant 
 * @param {string} element 
 * @param {string} type 
 */
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
/**
 * Permet de créer le tag séléctionné
 * @param {string} element 
 * @param {string} type 
 */
function addTag(element, type) {
    let ulLocation = document.getElementById('tagChecked');
    let liTag = document.createElement('li');
    liTag.classList.add(type + 'TagChecked')
    liTag.textContent = element;
    let closeCross = document.createElement('i');
    closeCross.setAttribute('class', 'fa-sharp fa-regular fa-circle-xmark');
    liTag.appendChild(closeCross);
    ulLocation.appendChild(liTag);
    /**
     * Gestion de la suppréssion du tag
     */
    closeCross.addEventListener('click', () => {
        liTag.remove(),
        removeTag(type, element);
        principalSearch(allRecipe, searchBar.value, ingredientTagCheckedTab, ustensilTagCheckedTab, deviceTagCheckedTab);
    });
}
/**
 * Permet de supprimer le tag du tableau des tags séléctionnés et de faire une recherche sur les tags restant si il y en a.
 * @param {string} type 
 * @param {string} element 
 */
function removeTag (type, element) {
    /**
     * Suppréssion des tags dans les tableaux
     */
    switch (type) {
        case 'ingredients' :
            removeElementFromArray(ingredientTagCheckedTab, element);
            break;
        case 'ustensils' :
            removeElementFromArray(ustensilTagCheckedTab, element);
            break;
        case 'devices' :
            removeElementFromArray(deviceTagCheckedTab, element); 
        break;
    }
}

/**
 * Initialisation des fonctions primaires
 */
function init() {
    displayRecipe(recipes);
}

init();
/**
 * Gestion des événements sur les différents input
 */
searchBar.addEventListener("input", () => {
    principalSearch(allRecipe, searchBar.value, ingredientTagCheckedTab, ustensilTagCheckedTab, deviceTagCheckedTab)
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