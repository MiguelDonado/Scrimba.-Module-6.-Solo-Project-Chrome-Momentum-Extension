const topContainer = document.getElementById('top-container')
const mediumContainer = document.getElementById('medium-container')
const bottomContainer = document.getElementById('bottom-container')

//Bored API
p3 = fetch('https://www.boredapi.com/api/activity/?type=education')
    .then(response => response.json())
    
//Random Meal API
p4 = fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then(response => response.json())

Promise.all([p3,p4])
    .then(data =>{
    //handle of Bored API
    boredIdeaEl = document.createElement('p')
    boredIdeaEl.innerHTML = `
    Don't know what to do. Try the following: <span class="new-line">${data[0].activity}</span>
    `
    topContainer.appendChild(boredIdeaEl)
    boredIdeaEl.classList.add('bored-paragraph')
    //handle of Random Meal API
    displayMeal(data[1])
})

function displayMeal (objectMeal) {
    mealEl = document.createElement('div')
    mealEl.innerHTML = `
    <img class="meal-img" src="${objectMeal.meals[0].strMealThumb}">
    <div class="meal-inner">
        <p class="meal-intro">¿Willing to eat something new?</p>
        <p class="meal-descr">Try <span class="meal-hightlight">${objectMeal.meals[0].strMeal}</span>, a typical ${objectMeal.meals[0].strCategory} from the ${objectMeal.meals[0].strArea} gastronomy.</p>
        <a href="${objectMeal.meals[0].strSource}">Click here to check the recipe</a>
    </div>
        `
    mealEl.classList.add('meal-container')
    topContainer.appendChild(mealEl)  
}

//QUOTES API
fetch('https://stoic.tekloon.net/stoic-quote')
.then(response => response.json())
.then(data => {
    stoicQuote = document.createElement('div')
    stoicQuote.innerHTML = `
    <p class="quote-stoic">${data.quote}</p>
    <p class="author-stoic">${data.author}</p>
    `
    mediumContainer.appendChild(stoicQuote)
  })
  .catch(error => {
      console.error('Error:', error)
  })

//BACKGROUND IMAGE API
p1 = fetch('https://api.unsplash.com/photos/random/?client_id=AUw1zpEmm49dFZ0uN54p7uHU4pjtzpVXIi0q_UFFWJ8&query=nature')
    .then(response => response.json())
    
//Dog API facts
p2 = fetch('https://dogapi.dog/api/facts')
    .then(response => response.json())

Promise.all([p1,p2])
    .then(data =>{
        //handle of UNSPLASH API
        document.body.style.backgroundImage= `url(${data[0].urls.full})`
        attributionUnsplashPhoto(data[0])

        //handle of DOG API
        dogFactEl = document.createElement('div')
        dogFactEl.innerHTML = `
        <p class="dog-fact">If you are dog lover you should know that: <span class="dog-fact-highlight">"${data[1].facts[0]}"</span></p>
        `
        bottomContainer.appendChild(dogFactEl)
    }
    )
    
function attributionUnsplashPhoto (objectPhoto) {
    attributionEl = document.createElement('div')
    if (!objectPhoto.location.name){
        photoLocation = 'Unknown'
    }else {
        photoLocation = objectPhoto.location.name
    }
    attributionEl.innerHTML = `
    <p>Photo by <a href="${objectPhoto.user.links.html}?utm_source=Scrimba_Module_6_Chrome_Momentum&utm_medium=referral">
    ${objectPhoto.user.name}</a> on <a href="https://unsplash.com/?utm_source=Scrimba_Module_6_Chrome_Momentum&utm_medium=referral">Unsplash</a></p>
    <p class="location-photo">${photoLocation}</p>
    `
    attributionEl.classList.add('attribute-unsplash')
    bottomContainer.appendChild(attributionEl)
}