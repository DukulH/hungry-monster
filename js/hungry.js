let count = 1;
const error = document.getElementById('error-handle');
const searchResultShow = document.getElementById('search-results');
inputMealName = () => {
    const mealName = document.getElementById('meal-name').value;
    if (mealName === "") {
        searchResultShow.innerHTML = "";
        return error.innerText = 'Please enter meal name!' ;
    }
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`;
    fetch(url)
        .then(response => response.json())
        .then(data => displayResults(data));
}


displayResults = givenMealName => {
    const searchResultShow = document.getElementById('search-results');
    const matchedMeal = givenMealName.meals;
    console.log(matchedMeal);
    if (matchedMeal === null) {
        searchResultShow.innerHTML = "";
        return error.innerText = 'Opps!! No meals found!!';
    }
    if(count>1){
        searchResultShow.innerHTML = "";
        count--;
    }
    if(count <= 1){
        count++;
        error.innerText = "";
        matchedMeal.forEach(mealName => {
            const mealDiv = document.createElement('div');
            mealDiv.className = 'mealInfo';
            mealDiv.innerHTML = `
        
        <div class="card mt-5 pb-5" >
            <img class="card-img-top" src="${mealName.strMealThumb}">
            <div class="card-body">
            <h3 class="card-text">${mealName.strMeal}</h3>
            </div>
        </div>
            
        `
            searchResultShow.appendChild(mealDiv);
        });
    }

console.log(count);

}



