const search = document.getElementById('search'),
    submit = document.getElementById('submit'),
    random = document.getElementById('random'),
    mealsEl = document.getElementById('meals'),
    resultHeading = document.getElementById('result-heading'),
    single_mealEl = document.getElementById('single-meal')


function searchMeal(e) {
    e.preventDefault()
    //clear single meal
    single_mealEl.innerHTML = ``

    //get search term
    const term = search.value

    if (term.trim()) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
            .then(res => res.json())
            .then(data => {
                resultHeading.innerHTML = `
                <h2>Search results for "${term}":</h2>`
                if (data.meals !== null) {
                    mealsEl.innerHTML = data.meals.map(meal =>
                        `<div class="meal">
                            <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
                            <div class="meal-info" data-mealID=${meal.idMeal}>
                                <h3>${meal.strMeal}</h3>
                            </div>
                        </div>`
                    )
                        .join('')
                } else {
                    resultHeading.innerHTML = `<h2>No results, try again</h2>`
                }

            })
        search.value = ``
    } else {
        alert('Enter a Search Value or Term')
    }
}

function getMealById(mealID) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
        .then(res => res.json())
        .then(data => {
            const meal = data.meals[0]

            addMealToDOM(meal)
        })
}

function addMealToDOM(meal) {
    const ingredients = []
    const testIng = []
    console.log(meal);

    for (let i = 1; i <= 20; i++) {
        console.log(meal[`strIngredient${i}`]);
        if (meal[`strIngredient${i}`]) {
            testIng.push(meal[`strIngredient${i}`])
            ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`) //meal[strIng1] - meal[str1]
        } else {
            break
        }
    }

    console.log(ingredients);
    console.log(testIng);
}

submit.addEventListener('submit', searchMeal)

mealsEl.addEventListener('click', e => {
    //console.log(e.path);
    const mealInfo = e.path.find(item => {
        //console.log(item);
        if (item.classList) {
            return item.classList.contains('meal-info')
        } else {
            return false
        }
    })

    if (mealInfo) {
        const mealID = mealInfo.getAttribute('data-mealID')
        console.log(mealID);
        getMealById(mealID)
    }

})