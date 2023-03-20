const recipeSection = document.getElementById("recipeCards");
const searchBar = document.getElementById("searchBar");
searchBar.addEventListener("input", principalSearch);
searchBar.addEventListener("keypress", (e) => {if(e.key === 'Enter') { e.preventDefault()}});

function principalSearch(){
    const inputValue = searchBar.value.trim();
    
    let result = [];
    if(inputValue.length >= 3) { 
        for(let i = 0; i < recipes.length; i++) {
            if(recipes[i].name.toLowerCase().includes(inputValue.toLowerCase()) || recipes[i].description.toLowerCase().includes(inputValue.toLowerCase())) {
                result.push(recipes[i]);
            }
            else{
                for(let j = 0; j< recipes[i].ingredients.length; j++) {
                    if(recipes[i].ingredients[j].ingredient.toLowerCase().includes(inputValue.toLowerCase())){
                        result.push(recipes[i]);
                        break;
                    }
                }
            }
            
        }
        recipeSection.innerHTML = "";
        displayRecipe(result);
        if(result.length == 0 && inputValue.length >= 3) {
            let message = 'Aucune recettes correspondent à vos critères. Essayez "tarte aux pommes", "poisson" ou changez les filtres de recherche.'
            noRecipe (message)
        }
    }
    else{
        let message = 'Veuillez entrer au moins 3 caractères'
        noRecipe(message);
    }
    
    if(inputValue.length == 0) {
        recipeSection.innerHTML = "";
        displayRecipe(recipes);
       
    }
    
    
}

