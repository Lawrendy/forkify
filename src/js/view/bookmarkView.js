import view from "../view.js";
import preView from "./preView.js";
import icons from 'url:../.../img/icons.svg'

class BookmarkView extends View {
    #parentElement = document.querySelector('.bookmarks__list');
    #errorMessage = 'no  bookmark yet. find a nice recipe and bookmark it '
    #message = ''
   
    addHandlerRender(handler) {
      wiwndow.addEventlistener('load', handler)
    }
    #generateMarkup() {
        return this.#data
        .map(bookmarks=> PreView.render(bookmarks, false))
        .join('')
    }
  }


export default new bookmarkView()
