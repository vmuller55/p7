function displayRecipe(recipes) {
    const recipeSection = document.getElementById("recipeCards");

    recipes.forEach(recipe => {
        const createRecipe = new recipeData(recipe);
        const createDom = createRecipe.createDom();
        recipeSection.appendChild(createDom);
    });
}

function init() {
    displayRecipe(recipes);
}

init();