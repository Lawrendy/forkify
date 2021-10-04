import view from "../view";
import icons from 'url:../.../img/icons.svg'

class addRecipeView extends  View {
    #parentElement = document.querySelector('.upload');
    #message = 'recipe was  sucessfullly uplaed'
#window = document.querySelector('.add-recipe-window ')
#overlay = document.querySelector('.overlay ')
#btnOpen = document.querySelector('.nav__btn--add-recipe')
#btnClose = document.querySelector('.btn--close-modal')

// aing recipe we dnt addit to the controller sowe use the constructor
constructor() {
    super()
    this.#addHandlerShowWindow()
    this.#addHandlerHideWindow()
    
}
toggleWindow() {
this.#overlay.classList.toggle('hidden')
this.#window.classList.toggle('hidden')
}


#addHandlerShowWindow() {
    this.#btnOpen.addEventListener('click', this.toggleWindow.bind(this))
}

#addHandlerHideWindow() {
    this.#btnclose.addEventListener('click', this.toggleWindow.bind(this))
    this.#overlay.addEventListener('click', this.toggleWindow.bind(this))
}


addHandlerUpload(handler) {
    this.#parentElement.addEventListener('submit', function (e) {
        e.preventDefault()
const dataArr = [...newFormData(this)]   // sellect all element in html
const data = Object.fromEntries(dataArr)
handler(data)
    })
}

#generateMarkup() {
}
}
export default new addRecipeView()