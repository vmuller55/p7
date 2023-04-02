export default class Recipe {
    constructor(data) {
        this.id = data.id,
        this.name = data.name,
        this.servings = data.servings,
        this.ingredients = data.ingredients,   
        this.time = data.time,
        this.description = data.description,
        this.appliance = data.appliance,
        this.ustensils = data.ustensils
    }
    

    createDom() {
        const article = document.createElement("article");
        article.classList.add("recipeCard");

        const img = document.createElement("img");
        const nameAndTime = document.createElement("div"); 
        nameAndTime.classList.add("nameAndTime");
        article.appendChild(img);
        article.appendChild(nameAndTime);

        const h3 = document.createElement("h3");
        h3.textContent = this.name;
        nameAndTime.appendChild(h3);

        const timeAndiconWrapper = document.createElement("div");
        timeAndiconWrapper.classList.add("timeAndIconWrapper");
        const icon = document.createElement("i");
        icon.className = "fa-regular fa-clock";
        const time = document.createElement("p");
        time.classList.add("time");
        time.textContent = this.time + " min";
        nameAndTime.appendChild(timeAndiconWrapper);
        timeAndiconWrapper.appendChild(icon);
        timeAndiconWrapper.appendChild(time);

        const toDoWrapper = document.createElement("div");
        toDoWrapper.classList.add("toDoWrapper");
        article.appendChild(toDoWrapper);

        const detail = document.createElement("div");
        detail.classList.add("detail");
        toDoWrapper.appendChild(detail);

        const ingredients = this.ingredients;

        ingredients.forEach(ingredient => {

                const ingredientName = document.createElement("h4");
                
                if(!ingredient.quantity) {
                    ingredientName.textContent = ingredient.ingredient;
                }
                else {
                     ingredientName.textContent = ingredient.ingredient + " : ";
                }

                detail.appendChild(ingredientName);

                const ingredientQuantity = document.createElement("span");

                if(!ingredient.unit) {
                    ingredientQuantity.textContent = ingredient.quantity;
                }
                else {
                    if(ingredient.unit == "grammes") {
                        ingredientQuantity.textContent = ingredient.quantity + " g";
                    }
                    else {
                        ingredientQuantity.textContent = ingredient.quantity + " " + ingredient.unit;
                    }
                }
                ingredientName.appendChild(ingredientQuantity);
            }
        );
        
        const description = document.createElement("div");
        description.classList.add("description");
        const descriptionText = document.createElement("p");
        descriptionText.textContent = this.description;
        toDoWrapper.appendChild(description);
        description.appendChild(descriptionText);

        return article;

    }

    includeName(nameSearch) {
        return this.name.toLowerCase().includes(nameSearch.toLowerCase());   
    }

    includeDescription(descriptionSearch) {
        return this.description.toLowerCase().includes(descriptionSearch.toLowerCase());  
    }
    
    includeIngredient(ingredientSearch) {
        let result = false;
        this.ingredients.forEach(ingredient => {
            if(ingredient.ingredient.toLowerCase().includes(ingredientSearch.toLowerCase())) {
                result = true;
            }
        }) 
        return result;  
    }

    includeAppliance(applianceSearch) {
        return this.appliance.toLowerCase().includes(applianceSearch.toLowerCase());  
    }

    includeUstensil(ustensilSearch) {
        let result = false;
        this.ustensils.forEach(ustensil => {
            if(ustensil.toLowerCase().includes(ustensilSearch.toLowerCase())) {
                result= true;
            }
        })
        return result;
    }
}