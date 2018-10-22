/**
 * Types of selectors
 * @enum {string}
 */
const selectors_ = {
  CHARACTER_DESC: '.js-character-desc',
  SELF: '[data-character-component]',
};
/**
 * Types of classes names
 * @enum {string}
 */
const classes_ = {
  WELL_DONE: 'well-done',
};
/**
 * Types of events
 * @enum {string}
 */
const events_ = {
  VOTED: 'voted',
};
/**
 * simple class to listen the poll
 * @implements {Iterable<element>}
 */
class CharacterComponent {
  /**
   * @param {element} element return the module/section elemet
   */
  constructor(element) {
    /**
     * The element
     * @type {HTMLElement}
     * @private
     */
    this.element_ = element;
    /**
     * The element name
     * @type {string}
     */
    this.name = null;
    /**
     * storage the element
     * @type {object}
     */
    this.storage = null;
    /**
     * Html element
     * @type {HTMLElement}
     * @private
     */
    this.character = null;

    this.init();
  }
  /**
   * Gets the element.
   * @return {HTMLElement}
   */
  element() {
    return this.element_;
  }
  /**
   * binding events
   */
  bindEvents() {
    document.addEventListener(events_.VOTED, (e) => {
      if(e.detail.storage == this.name) {
        this.character.innerHTML = this.character.dataset.thanksVote;

        if(e.detail.votes >= 51 ) {
          this.element().classList.add(classes_.WELL_DONE);
        } else {
          this.element().classList.remove(classes_.WELL_DONE);
        }
      }
    }, false);
  }
  /**
    * Init function
  */
  init() {
    this.name = this.element().dataset.characterComponent;
    this.storage = localStorage.getItem(this.name);
    this.character = this.element().querySelector(selectors_.CHARACTER_DESC);

    if(this.storage >= 51 ) {
      this.element().classList.add(classes_.WELL_DONE);
    } else {
      this.element().classList.remove(classes_.WELL_DONE);
    }

    this.bindEvents();
  }
}
/**
 * Initializes all the instance of the component
 * @return {Array.<CharacterComponent>}
 */
exports.init = function() {
  return [...document.querySelectorAll(selectors_.SELF)]
      .map((el) => new CharacterComponent(el));
}
