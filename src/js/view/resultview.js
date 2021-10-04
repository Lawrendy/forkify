import view from "./View";
import preView from "./preView.js";
import icons from 'url:../.../img/icons.svg'

class resultView extends  View {
    #parentElement = document.querySelector('.results');
    #errorMessage = 'no  recipe found for your query please try again '
    #message = ''
   
    #generateMarkup() {
      return this.#data
      .map(result=> PreView.render(result, false))
      .join('')
  }
}

export default new resultView()
