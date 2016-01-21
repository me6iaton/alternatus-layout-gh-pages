import SHOW_TAB from '../actions/tab'
import Component from '../utils/ReduxComponent'
import { createSelector } from 'reselect'

let $ = (selector) => {
  return Array.from(document.querySelectorAll(selector))
};
// $.bind(document);

export default class Tab extends Component {
  constructor({
    store,
    name,
    selectors = {
      navItem: '.tabs__nav .tabs__title',
      panel: '.tabs__content .tabs__panel'
    },
    activeClass = 'tabs__title--active'
  }) {
    super(store);
    this.name = name;
    this.activeClass = activeClass;
    this.selectors = selectors;
    this.navNodeList = $(selectors.navItem);
    this.panelNodeList = $(selectors.panel);

    // events
    this.navNodeList.forEach((el, index) => {
      el.addEventListener('click', (event) => {
        let index = this.navNodeList.indexOf(event.currentTarget);
        this.store.dispatch({type: "SHOW_TAB", name, index})
      })
    })

    // init component
    this.storeObserver.handleChange();
    // this.init();
  }
  selector(state){
    if(!this._selector){
      this._selector = createSelector(
        state => state.showTabs[this.name],
        (index) => index
      )
    }
    return this._selector(state)
  }
  render(index) {
    this.navNodeList.forEach((el, i) => {
      if(index === i){
        el.classList.add(this.activeClass);
      } else {
        el.classList.remove(this.activeClass);
      }
    });
    this.panelNodeList.forEach((el, i) => {
      if(index === i){
        el.style.display = '';
      } else {
        el.style.display = 'none';
      }
    });
  }
}
