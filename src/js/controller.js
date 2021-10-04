import { async } from 'regenerator-runtime';
import {MODAL_CLOSE_SEC} from './config.js'
import * as model from './model.js'

import recipeView from './views/recipeView.js'
import searchView from './views/searchView.js'
import resultView from './views/resultView.js'
import paginationView from './views/paginationView.js'
import bookmarkView from './views/bookmarkView.js'
import addRecipeView from './views/addRecipeView.js'


import "/core-js/stable";//prolifying all
import "/regenerator-runtime/runtime"// prolifying async 

if (module.hot) {
  module.hot.accept()
}
///////////////////////////////////////

const controlRecipe = async function() {
try { 
  const id = window.location.hash.slice(1)
  
  if (!id) return
recipeView.renderSpinner()

//update results view to mark selected search results
resultView.update(model.getSearchResultspage())
bookmarkView.update(model.state.bookmark) // current sellected recipe select also in bookmark
 // loading  recipe
await model.loadRecipe(id)
///////////////////////////////////////////////////////////////////////////////
//2. rendering recipe

recipeView.render(model.state.recipe)

    
}catch(err)  { 
  recipeView.renderError()
}
} 
const controlSearchResults = async function() {
  try {
    resultView.renderSpinner()
    // get search query
    const query =searchView.getQuery()
    if(!query) return
    //load search results
await model.loadSearchResults(query)
// render resslts

resultView.render(model.getSearchResultspage())

//  render initiall pagination
paginationView.render(model.state.search)

  }catch(err) {
    console.log(err);
  }
}
const controlPagination = function(goToPage) {
  // render new results

resultView.render(model.getSearchResultspage(goToPage))

//  render  new initial pagination
paginationView.render(model.state.search)
}
const controlServings = function() {
  //update nthe recipe serving
model.updateServings()

  // update the recipe view
  
//recipeView.render(model.state.recipe)
recipeView.update(model.state.recipe)  // will only update text and attribute and leave images
}

const controlAddBookmark = function() {
  // add or remove bookmark
  if(!model.state.recipe.bookmarked) model.addbookmark(model.state.recipe)
  else model.removebookmark(model.state.recipe.id)
  
  // update recippe view
  recipeView.update(model.state.recipe)

  // render a bookmark
  bookmarkView.render(model.state.bookmark)
}
const controlBookmark = function() {
  bookmarkView.render(model.state.bookmark)
}
// for loadind the new recipe
const controlAddRecipe = async function (newRecipe) {
try{

  // show loading spinneer
  addRecipeView.renderSpinner()
  // upload new recipe data
   await model.uploadRecipe(newRecipe)

   // render recipe
   recipeView.render(model.state.recipe)


   // dispplay a sucess message
   addRecipeView.renderMessag()

   //render bbookmark
   bookmarkView.render(model.state.bookmark)

   //change id in the URL
window.history.pushState(null, '', `#${model.state.recipe.id}`)


   //close form window
   setTimeout(function() {
addRecipeView.toggleWindow()
   },MODAL_CLOSE_SEC * 1000)

}catch(err) {// from modal
  console.error(err);
  addRecipeView.renderError(err.message)  // renderError is in vieww
}
}
const init = function() {
bookmarkView.addHandlerRender(controlBookmark)
recipeView.addHandlerRender(controlRecipe)
recipeView.addHandlerUpdateServing(controlServings)
recipeView.addHandlerAddbookmark(controlAddBookmark)
searchView.addHandlerSearch(controlSearchResults)
paginationView.addHandlerClick(controlPagination)
//controlServings()
addRecipeView.addHandlerUpload(controlAddRecipe)
}
init()
