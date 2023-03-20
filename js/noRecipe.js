function noRecipe (message) {
    recipeSection.innerHTML = "";
    const displayMessage = document.createElement('h3');
    displayMessage.classList.add('displayMessage');
    displayMessage.textContent = message//'Aucune recettes correspondent à vos critères. Essayez "tarte aux pommes", "poisson" ou changez les filtres de recherche.'
    recipeSection.appendChild(displayMessage);

}