import { async } from "regenerator-runtime"
import { API_URL, RESUITS_PER_PAGE, KEY } from "./config.js"
//import { getJSON, sendJSON} from "./helpers.js"
import { AJAX} from "./helpers.js"
import { TIMEOUT_SEC } from "./config.js"
export const state = {
    recipe: {},
    search: {
     query: '',
     results: [],     
     page:1,
     resultsPerPage: RESUITS_PER_PAGE,
    },
    bookmark: [],   //pushing the recipe into the array
}
//refactoring code
const createRecipeObject = function (data) {
    const {recipe} = data.data;
    const {recipe} = data.data  //  to change those with underscore() 
    state.recipe  = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
    servings: recipe.servings,
    sourceUrl:recipe.source_url,
    image:recipe.image_url,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key,})   // if key does not exist
} 
}
export const loadRecipe = async function (id) {
    try {
    const data = await AJAX(`${API_URL}${id}?key=${KEY}`) 
    state.recipe = createRecipeObject(data) // usin the refactored code here


       // const {recipe} = data.data  //  to change those with underscore() 
//state.recipe  = {
 // id: recipe.id,
  //title: recipe.title,
  //publisher: recipe.publisher,
//servings: recipe.servings,
//sourceUrl:recipe.source_url,
//image:recipe.image_url,
//cookingTime: recipe.cooking_time,
//ingredients: recipe.ingredients
//}
// bokmark are nt lost ater selectin another one
if(state.bookmark.some(bookmark => bookmark.id === id))
state.recipe.bookmarked = true
else state.recipe.bookmarked = false
console.log(state.recipe);
} catch(err) {
    // temp error hhandling
console.error(`${err}`)
}
 }

 export const loadSearchReslts = async function(query) {
     try {
         
const data = await AJAXX(`${API_URL}?search=${query}&key=${KEY}`)

states.search.results = data.data.recipe.map(rec => {
    return {
        id: rec.id,
  title: rec.title,
  publisher: rec.publisher,
image:rec.image_url,
...(rec.key && { key: rec.key,}) 
    }
})
state.search.page =1
     } catch(err) {
         console.error(`${err}`);
         throw err
     }
 }
loadSearchReslts('pizza')

//pagnititon
export const getSearchResultspage = function(page=state.search.page ) {
    state.search.page = page
const start = (page-1) *states.search.resultsPerPage  //0
const end =(page * states.search.resultsPerPage) //9
    return state.search.results.slice(start, end)

}
export const updateServings = function(newservings) {
state.recipe.ingredients.forEach(ing => {
    ing.quantity = ing.quantity * newservings / state.recipe.servings
    
});
state.recipe.servings = newservings
}
//  creatinga  ocal strage for bookmarks
const persistBookmarks = function  (recipe)  {
    localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks))
}

export const addbookmark = function (recipe) { 
// add bookmark

state.bookmark.push(recipe)
// mark current recipe as bookmark
if(recipe.id === state.recipe.id) state.recipe.bookmarked = true
persistBookmarks()  //  local sto
}
export const removebookmark = function (id) {
// callculate index
const index = state.bookmark.findIndex(el=> el.id === id)
 // remove bookmark
 state.bookmark.splice(index, 1)

 // mark current recipe as unbookmark
if(id === state.recipe.id) state.recipe.bookmarked = false
persistBookmarks() //  localstorage
}
// getting the bookmarks from storage
const init = function() {
const storage = localStorage.getItem('bookmarks')
if (storage)  state.bookmarks = JSON.parse(storage)
}
init()

const clearBookmarks = function () {
    localStorage.clear('bookmarks')
}
//clearBookmarks()

export const uploadRecipe = async function(newRecipe)  {
    try{
    // taking an oject and putting in an array
    const ingredients = oject.entries(newRecipe).filter(
        entry=>entry[0].startWith('ingredient') && entry[1] !== ''
        ).map(ing => {
            ///const ingArr =  ing[1].replaceAll(' ',' ').split(',') // making sure the array are three
            const ingArr =  ing[1].split(',').map(el => el.trim()) // making sure the array are three
if(ingArr.length !==3) throw new Error(// catch in controlller
    'wrong ingredient format please use the correct format :')

         const [quantity, unit, description] = ingArr // deconstructing 
         return {quantity:quantity ? +quantity: null, unit, description} // if no quantity null
        })

        
const recipe = { // want the arrangement to be the same as the ApI
    title:newRecipe.title,
    source_Url: newRecipe.sourceUrl,
    image_url: newRecipe.image_url,
    publisher: newRecipe.publisher,
    cooking_time: +newRecipe.cookingTime,
    servings: +newRecipe.servings,
    ingredients,
    
}
// using our new JSN to create ajax request 
 const data = await AJAX(`${API_URL}?key=${KEY}`, recipe)
 state.recipe = createRecipeObject(data)  // want it back in a form t  e understood by programme
 addbookmark(state.recipe)  // bookmarking our own recipe
}catch(err) {
    throw(err)
    
}

}
