import icons from 'url:../.../img/icons.svg'   

export default  class  view {
    #data

    render(data, render =  true){
if(!data || (Array.isArray(data) && data.length === 0)) return this.renderError()

        this.#data = data
        const markup = this.#generateMarkup()   //old markup

        if (!render) return markup
        this.#clear ()
        this.#parentElement.insertAdjacentHTML('afterbegin', markup)
    }

    update(data) {
    this.#data = data
        const newMarkup = this.#generateMarkup()  

        //convert markkup to new do element so thatwecan compare to the old markup
const newDOm = document.createRange().createContextualFragment(newMarkup)
const newElement = Array.from(newDOm.querySelectorAll('*'))
const curElement = Array.from(this.#parentElement.querySelectorAll('*'))

newElement.forEach((newEl, i) => {
const curEl = curElement[i]


// updates changed text
if(!newEl.isEqualNode(curEl) && 
newEl.firstChild?.nodeValue.trim() !== ''
) {
curEl.textContent = newEl.textContent
}
// update changed attriutes

if(!newEl.isEqualNode(curEl))
Array.from(newEl.attributes).forEach(attr => 
  curEl.setAttribute(attr.name, attr.value)
)
    })
  }
    #clear() {
        this.#parentElement.innerHTML = ''
    }
     renderSpinner() {
        const markup = `
        <div class="spinner">
                <svg>
                  <use href="${icons}#icon-loader"></use>
                </svg>
              </div>
               `
               this.#clear ()
               this.#parentElement.insertAdjacentHTML('afterbegin', markup)    
      }
    renderError(message = this.#errorMessage) {
      const markup = `
      <div class="error">
                <div>
                  <svg>
                    <use href="${icons}#icon-alert-triangle"></use>
                  </svg>
                </div>
                <p>${message}</p>
              </div>
              `
              this.#clear ()
        this.#parentElement.insertAdjacentHTML('afterbegin', markup)
    }
    renderMessage(message = this.#message) {
      const markup = `
      <div class="message">
                <div>
                  <svg>
                    <use href="${icons}#icon-smile"></use>
                  </svg>
                </div>
                <p>${message}</p>
              </div>
              `
              this.#clear ()
        this.#parentElement.insertAdjacentHTML('afterbegin', markup)
    }
    
}