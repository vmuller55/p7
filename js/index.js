function displayRecipe(recipes) {
    const recipeSection = document.getElementById("recipeCards");

    recipes.forEach(recipe => {
        const createRecipe = new recipeData(recipe);
        const createDom = createRecipe.createDom();
        recipeSection.appendChild(createDom);
    });
}
function createTabTag(recipes) {
    let ingredientsTab = [];
    let ustensilsTab = [];
    let devicesTab = [];

    recipes.forEach(recipe => {
        recipe.ingredients.map((ingredient) => {
            ingredientsTab.push(ingredient.ingredient.charAt(0).toUpperCase() + ingredient.ingredient.slice(1));
        });
        recipe.ustensils.map((ustensil) => {
            ustensilsTab.push(ustensil.charAt(0).toUpperCase() + ustensil.slice(1));
        });
        devicesTab.push(recipe.appliance.charAt(0).toUpperCase() + recipe.appliance.slice(1))    
    });

    ingredientsTab = [...new Set(ingredientsTab)].sort();
    ustensilsTab = [...new Set(ustensilsTab)].sort();
    devicesTab = [...new Set(devicesTab)].sort();

    ingredientsTab.map((ingredient) => {
        createTagDom(ingredient, 'ingredients');
    })
    ustensilsTab.map((ustensil) => {
        createTagDom(ustensil, 'ustensils');
    })
    devicesTab.map((device) => {
        createTagDom(device, 'devices');
    })
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