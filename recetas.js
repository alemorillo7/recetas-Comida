const ingredientInput = document.getElementById("ingredientInput");
const searchButton = document.getElementById("searchButton");
const recipesList = document.getElementById("recipesList");

searchButton.addEventListener("click", searchRecipes);

function searchRecipes() {
  const ingredient = ingredientInput.value.trim();
  if (ingredient === "") return;

  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${ingredient}`)
    .then(response => response.json())
    .then(data => {
      recipesList.innerHTML = "";

      if (data.meals) {
        data.meals.forEach(recipe => {
          const recipeDiv = document.createElement("div");
          recipeDiv.classList.add("recipe");

          recipeDiv.innerHTML = `
            <h2>${recipe.strMeal}</h2>
            <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
            <p><strong>Ingredientes:</strong></p>
            <ul>
              ${getIngredientsList(recipe)}
            </ul>
            <p><strong>Instrucciones:</strong></p>
            <p>${recipe.strInstructions}</p>
          `;

          recipesList.appendChild(recipeDiv);
        });
      } else {
        recipesList.innerHTML = "<p>No se encontraron recetas con ese ingrediente.</p>";
      }
    })
    .catch(error => {
      console.error("Hubo un error al obtener las recetas:", error);
    });
}

function getIngredientsList(recipe) {
  let ingredientsList = "";
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];

    if (ingredient && ingredient.trim() !== "") {
      ingredientsList += `<li>${measure} - ${ingredient}</li>`;
    }
  }
  return ingredientsList;
}
