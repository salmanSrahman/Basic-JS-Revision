const searchField = document.getElementById("search-field");

const loadMeals = () => {
  const searchValue = searchField.value;
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => displayMeals(data.meals));
};

const displayMeals = (meals) => {
  const singleMeal = document.getElementById("single-Meal");
  singleMeal.textContent = "";
  meals.forEach((meal) => {
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
      <div class="card" onClick="displayMeal(${meal.idMeal})">
             <img src=${meal.strMealThumb} class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title text-center">${meal.strMeal}</h5>
            </div>
      </div> 
    `;
    singleMeal.appendChild(div);
  });
};

// ===== single meals shown =====

const displayMeal = (mealId) => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayMealDetails(data.meals));
};

const displayMealDetails = (meals) => {
  console.log(meals);
  const mealDetails = document.getElementById("meal-details");

  meals.forEach((meal) => {
    const div = document.createElement("div");
    div.innerHTML = `
              <img src="${meal.strMealThumb}" class="card-img-top img-fluid" alt="..."    style="height:400px">
               <div class="card-body text-left">
                          <h3 class="card-title">${meal.strMeal}</h3>
                          <h4>Ingredients</h4>
                          <div id="ingredients">
                          </div>
               </div>

               <div class="card-footer text-center">
                  <small class="text-muted">${meal.strCategory}</small>
               </div>
              `;
    mealDetails.appendChild(div);
    const mealIngredients = document.getElementById("ingredients");

    for (let i = 1; i <= 20; i++) {
      if (meal["strIngredient" + i]) {
        const ingredient = document.createElement("p");
        ingredient.innerText = `${meal["strMeasure" + i]} ${
          meal["strIngredient" + i]
        }`;
        mealIngredients.appendChild(ingredient);
      }
    }
  });
};

// ====== meal details =======
