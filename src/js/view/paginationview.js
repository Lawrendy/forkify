import view from "../view";
import icons from 'url:../.../img/icons.svg'

class paginationView extends  View {
    #parentElement = document.querySelector('.pagination');
//handling the click
addHandlerClick(handler) { //for two cllick
    this.#parentElement.addEventListener('click', function(e) {
        const btn = e.target.closest('.btn--inline')
        if(!btn) return 
        const goToPage = +btn.dataset.goto

        handler(goToPage)
    })
}

#generateMarkup() {
    const curPage = this.#data.page
    //computing number of pages we have
    const numPages =Math.ceil(this.#data.results.length / this.#data.resultsPerPage)

    //page 1 and there are other pages
if(curPage === 1 && numPages > 1) {
return `
<button data-goto ="${curPage +1}" class="btn--inline pagination__btn--next">
<span>Page ${curPage +1}</span>
<svg class="search__icon">
  <use href="${icons}#icon-arrow-right"></use>
</svg>
</button>
`
}

//  last page
if(curPage === numPages  && numPages > 1) {
    return `
    <button data-goto ="${curPage  - 1}" class="btn--inline pagination__btn--prev">
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-left"></use>
    </svg>
    <span>Page ${curPage - 1}</span>
  </button>
 
  `
}
// other page
if(curPage < numPages) {
    return `
    <button data-goto ="${curPage - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1} </span>
          </button>
          <button data-goto ="${curPage +1}" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button> 
          `
}
//page 1, and there are  no other page
return ''
}
}

export default new paginationView()