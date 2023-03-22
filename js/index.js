import { recipes } from "./recipes.js";
import Recipe from "./Recipe.js";
import { principalSearch } from "./research.js";

const recipeClass = [];
const searchBar = document.getElementById("searchBar");

const inputIngrdient = document.getElementById('inputIngredient');
const drop = document.getElementById('ingredientsList');
inputIngrdient.addEventListener('focus', ()=> {inputIngrdient.style.width = '667px'; inputIngrdient.style.borderRadius = "5px 5px 0px 0px"; drop.style.display = 'flex'; inputIngrdient.setAttribute('placeholder', 'Rechercher un ingrédient')})

export function displayRecipe(recipes) {
    let recipeSection = document.getElementById("recipeCards");

    recipes.forEach(recipe => {
        const createRecipe = new Recipe(recipe);
        recipeClass.push(createRecipe);
        const createDom = createRecipe.createDom();
        recipeSection.appendChild(createDom);
    });
}

function createTabTag(recipes) {
    let ingredientsTab = [];
    let ustensilsTab = [];
    let devicesTab = [];

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
    // researchByTag(ingredientsTab, ustensilsTab, devicesTab)
}

function createTagDom(element, type) {
    const ulLocation = document.getElementById(type + 'List');
    const liTag = document.createElement('li');
    liTag.textContent = element;
    ulLocation.appendChild(liTag);
}

function init() {
    displayRecipe(recipes);
    createTabTag(recipes);
    
}

init();

searchBar.addEventListener("input", () => {principalSearch(recipeClass, searchBar.value)});
searchBar.addEventListener("keypress", (e) => {if(e.key === 'Enter') { e.preventDefault()}});