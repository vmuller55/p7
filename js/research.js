const recipeSection = document.getElementById("recipeCards");
import { displayRecipe } from "./index.js";

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
