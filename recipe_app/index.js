const mealsEl = document.getElementById('meals');
const favoritesContainer = document.getElementById('favorites-container');

const searchTerm = document.getElementById('search-term');
const searchBtn = document.getElementById('search');

const mealPopup = document.getElementById('meal-popup');
const mealPopupInfo = document.getElementById('meal-info');
const mealPopupCloseBtn = document.getElementById('meal-popup-close');

getRandomMeal();
fetchFavMeals();

async function getRandomMeal() {
    const randomMeal = await (await fetch('https://www.themealdb.com/api/json/v1/1/random.php'))
        .json()
        .then((data) => {
            return data.meals[0];
        });

    addMeal(randomMeal, true);
}

async function getMealById(id) {
    const meal = await (await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`))
        .json()
        .then((data) => {
            return data.meals[0];
        });

    return meal;
}

async function getMealsBySearch(term) {
    const meals = await (await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`))
        .json()
        .then((data) => {
            return data.meals;
        });

    return meals;
}

function addMeal(mealData, random = false) {
    const meal = document.createElement('div');
    meal.classList.add('container__meal');

    meal.innerHTML = `
        <div class="container__meal__header">
                    ${random ?
            `<span class="container__meal__header-text">Random recipe</span>`
            : ``}
                    <img class="container__meal-img"
                        src=${mealData.strMealThumb}>
                </div>
                <div class="container__meal__body">
                    <h4 class="container__meal__body-text">${mealData.strMeal}</h4>
                    <button class="like-btn" id="like-btn">
                        <i class="fas fa-heart"></i>
                    </button>
                    <button class="rot-ebal"></button>
                </div>
            </div>
        </div>
    `;

    meal.querySelector('.like-btn')
        .addEventListener("click", (e) => {
            if (e.target.classList.contains('like-btn--active')) {
                removeMealFromLS(mealData.idMeal);
                e.target.classList.remove('like-btn--active');
            } else {
                addMealToLS(mealData.idMeal);
                e.target.classList.add('like-btn--active');
            }
            favoritesContainer.innerHTML = '';
            fetchFavMeals();
        })


    meals.appendChild(meal);
}

function addMealToLS(mealId) {
    const mealsIds = getMealsFromLS();

    localStorage.setItem('mealsIds', JSON.stringify([...mealsIds, mealId]));
}

function removeMealFromLS(mealId) {
    const mealsIds = getMealsFromLS();

    localStorage.setItem('mealsIds',
        JSON.stringify(mealsIds.filter(id => id !== mealId)));
}

function getMealsFromLS() {
    const mealsIds = JSON.parse(localStorage.getItem('mealsIds'));

    return mealsIds === null ? [] : mealsIds;
}

async function fetchFavMeals() {
    const mealsIds = getMealsFromLS();
    const meals = [];

    for (let i = 0; i < mealsIds.length; i++) {
        const meal = await getMealById(mealsIds[i]);
        meals.push(meal);

        addMealToFav(meal);
    }

    console.log(meals);
}

function addMealToFav(mealData) {
    const meal = document.createElement("li");
    meal.classList.add("container__fav-meals__item");

    meal.innerHTML = `
        <img class="container__fav-meals__item-img"
        src=${mealData.strMealThumb}>
        <span class="container__fav-meals__item-name">${mealData.strMeal}</span>
        <button class="container__fav-meals__item-delete">
            <i class="fas fa-times"></i>
        </button>
    `;

    meal.querySelector(".container__fav-meals__item-delete")
        .addEventListener("click", (e) => {
            removeMealFromLS(mealData.idMeal);
            favoritesContainer.innerHTML = "";
            fetchFavMeals();
        });

    favoritesContainer.appendChild(meal);
}

searchBtn.addEventListener("click", async () => {
    mealsEl.innerHTML = '';

    const meals = await getMealsBySearch(searchTerm.value);

    if (meals) {
        meals.forEach(meal => {
            addMeal(meal);
        });
    }
});

mealPopupCloseBtn.addEventListener("click", () => {
    mealPopup.classList.add('hidden');
});

document.addEventListener("click", (e) => {
    let isClickInside = mealPopupInfo.contains(e.target);

    if (!isClickInside) {
        mealPopup.classList.add('hidden');
    }
});

function showMealInfo(mealData) {
    const mealEl = document.createElement('div');

    mealEl.innerHTML = `
            <div class="meal-info__top">
                <h2 class="meal-info__top_header">${mealData.strMeal}</h2>
                <img class="meal-info__top__img" src="${mealData.strMealThumb}"
                    alt="">
            </div>
            <div class="meal-info__text">
                <p>${mealData.strInstructions}</p>
                <div class="meal-info__text__inner">
                    <ul class="meal-info__text__list">
                        <li>ing 1 / measure</li>
                        <li>ing 2 / measure</li>
                        <li>ing 3 / measure</li>
                    </ul>
                </div>
            </div>
    `;

    mealPopupInfo.appendChild(mealEl);

    mealPopup.classList.remove('hidden');
}

