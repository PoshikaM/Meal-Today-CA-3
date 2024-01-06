// First API
function getRandomFood(){
    axios.get(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then((res) => {
        displayRandomFood(res.data);
    })
    .catch((err) => {
        console.log(err.message)
    });
}

function displayRandomFood(object) {
    let Container = document.querySelector(".Container");

    let firstMeal = object.meals[0];
    let randomImg = firstMeal.strMealThumb;
    let randomName = firstMeal.strMeal;
    Container.innerHTML = '';
    Container.innerHTML += `<h3>Meal for the day</h3>
                            <img id="image" src='${randomImg}'/>
                            <p>${randomName}</p>`
    document.getElementById("image").addEventListener("click",() => showIngredients(firstMeal))
}
getRandomFood()
// First API


// Display ingredients on click
function showIngredients(firstMeal){
    let ingredients = document.getElementById("ingredients")
    ingredients.textContent = '';

    let heading = document.createElement("h2")
    heading.textContent = "Ingredients"
    heading.classList.add("content")

    let foodItems = document.createElement("div")
    foodItems.classList.add("content")

    let cross = document.createElement("img");
    cross.src = "https://cdn-icons-png.flaticon.com/512/37/37752.png";
    cross.addEventListener("click", function(){
        ingredients.style.display = "none";
    });
    cross.classList.add("content")
    cross.setAttribute("id", "cross")

    let listofIngredients = document.createElement("ol")

    for(let i=1; i<=30; i++){
        let ingredient = firstMeal[`strIngredient${i}`];
        if (ingredient && ingredient.trim() !== ""){
            const listOfItem = document.createElement('li');
            listOfItem.textContent = ingredient;
            listofIngredients.appendChild(listOfItem);
        }
    }
    foodItems.appendChild(listofIngredients);

    ingredients.appendChild(heading)
    ingredients.appendChild(foodItems);
    ingredients.appendChild(cross)

    ingredients.style.display = 'block';
}
// Display ingredients on click


// Second API
function getSearchFood(inputFromHtml){
    axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${inputFromHtml}`)
    .then((response) => {
        displaySearchFood(response.data);
        console.log('answer',response);
    })
    .catch((error) => {
        console.log(error.message);
    });
}

document.getElementById("text").addEventListener("input",getInput)
function getInput(){
    let inputValue = document.getElementById("text").value
    getSearchFood(inputValue)
}

function displaySearchFood(Obj){
    let footer = document.querySelector(".footer");
    footer.innerHTML =''
    if (Obj.meals && Obj.meals.length > 0){
    Obj.meals.forEach((meal) => {
        let itemImage = meal.strMealThumb;
        let itemName = meal.strMeal;
        footer.innerHTML += `<div class="box"><img src="${itemImage}" alt="${itemName}"/>
                         <p>${itemName}</p></div>`
    })
    }else{
        footer.innerHTML = `<h2>Food item not found</h2>`
    }
}
// Second API
