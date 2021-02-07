let count = 1;
const error = document.getElementById('error-handle');
const searchResultShow = document.getElementById('search-results');
const mealIngredientDetails = document.getElementById('meal-ingredient-details');

inputMealName = () => {
    const mealName = document.getElementById('meal-name').value;
    if (mealName === "") {
        searchResultShow.innerHTML = "";
        mealIngredientDetails.innerHTML = "";
        return error.innerText = 'Please enter meal name!';
    }
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`;
    fetch(url)
        .then(response => response.json())
        .then(data => displayResults(data));
}


displayResults = givenMealName => {
    const searchResultShow = document.getElementById('search-results');
    const matchedMeal = givenMealName.meals;
    if (matchedMeal === null) {
        searchResultShow.innerHTML = "";
        mealIngredientDetails.innerHTML = "";
        return error.innerText = 'Opps!! No meals found!!';
    }
    if (count > 1) {
        searchResultShow.innerHTML = "";
        mealIngredientDetails.innerHTML = "";
        count--;
    }
    if (count <= 1) {
        count++;
        error.innerText = "";
        mealIngredientDetails.innerHTML = "";
        matchedMeal.forEach(mealName => {
            const mealDiv = document.createElement('div');
            mealDiv.className = 'mealInfo';
            mealDiv.innerHTML = `
        <div class="card mt-5 pb-5" onclick="gettingMealDetail('${mealName.strMeal}')" >
            <img class="card-img-top" src="${mealName.strMealThumb}">
            <div class="card-body">
            <h3 class="card-text">${mealName.strMeal}</h3>
            </div>
        </div> 
        `
            searchResultShow.appendChild(mealDiv);
        });
    }

}
const gettingMealDetail = name => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
    fetch(url)
        .then(response => response.json())
        .then(data => viewIngredient(data));
}

const viewIngredient = mealName => {
    const name = mealName.meals[0];
    mealIngredientDetails.innerHTML = `
    <div>
        <img class="card-img-top" style="width:35%" src="${name.strMealThumb}" ">
    <div class="card-body">
        <h3 class="card-text">${name.strMeal}</h3>
        <h5 class="card-text">Ingredients:</h5>
        <li><i class="fas fa-check-square"></i> ${name.strIngredient1}</li>
        <li><i class="fas fa-check-square"></i> ${name.strIngredient2}</li>
        <li><i class="fas fa-check-square"></i> ${name.strIngredient3}</li>
        <li><i class="fas fa-check-square"></i> ${name.strIngredient4}</li>
        <li><i class="fas fa-check-square"></i> ${name.strIngredient5}</li>
        <li><i class="fas fa-check-square"></i> ${name.strIngredient6}</li>
        <li><i class="fas fa-check-square"></i> ${name.strIngredient7}</li>
        <li><i class="fas fa-check-square"></i> ${name.strIngredient8}</li>
        <li><i class="fas fa-check-square"></i> ${name.strIngredient9}</li>
        <li><i class="fas fa-check-square"></i> ${name.strIngredient10}</li>
    </div>
    </div>
        `
    }
