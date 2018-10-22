/**
 * Types of selectors
 * @enum {string}
 */
const selectors = {
  PROGRESS_REGRESSION: '.js-regression-bar',
  PROGRESS_BAR: '.js-progress-bar',
  LIKE_BTN: '.js-btn-like',
  DISLIKE_BTN: '.js-btn-dislike',
  VOTE_AGAIN: '.js-poll-reg',
  BTN_WRAPPER: '.js-poll-btns',
  SELF: '[data-poll-component]',
}
/**
 * Types of classes names
 * @enum {string}
 */
const classes = {
  ACTIVE: 'active',
  VISIBLE: 'visible',
  HIDE: 'hide',
}
/**
 * Types of events
 * @enum {string}
 */
const events = {
  CLICK: 'click',
  VOTED: 'voted',
}
/**
 * Animates the header on scroll Class
 * Extends Module section
 * @implements {Iterable<element>}
 */
class PollComponent {
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
     * Progress bar element
     * @type {HTMLElement}
     */
    this.progressBar = null;
    /**
     * Progress bar wrapper element
     * @type {HTMLElement}
     */
    this.progressWrapper = null;
    /**
     * storage name
     * @type {string}
     */
    this.localStorageName = null;
    /**
     * progres bar width
     * @type {int}
     */
    this.width = null;
    /**
     * votes count
     * @type {int}
     */
    this.count = null;
    /**
     * localstorage var
     * @type {object}
     */
    this.storage = null;
    /**
     * Buttons warpper
     * @type {HTMLElement}
     */
    this.btnWrapper = null;

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
   * bindEvents
  */
  bindEvents() {
    this.like.addEventListener(events.CLICK, (e) => {
      e.preventDefault();
      this.count++;

      e.target.classList.add(classes.ACTIVE);
      this.dislike.classList.remove(classes.ACTIVE);

      if(this.count >= 100) this.count = 100;
      this.vote(this.count);

      e.stopPropagation();
    });

    this.dislike.addEventListener(events.CLICK, (e) => {
      e.preventDefault();
      this.count--;

      e.target.classList.add(classes.ACTIVE);
      this.like.classList.remove(classes.ACTIVE);

      if(this.count <= 0) this.count = 0;
      this.vote(this.count);
      e.stopPropagation();
    });

    this.voteAgain.addEventListener(events.CLICK, (e) => {
      this.anotherVote(e);
    });
  }
  /**
   * vote again method
   * @param {int} int number
   *
   * calc the poll progres based on the votes
   * manupulate classes and styles
  */
  progress(votes) {
    this.width = votes / 100;
    let width = Math.round(this.width * 100);

    const interval = setInterval(() => {
      if (width >= 100) {
        this.progressBar.style.maxWidth = 100 + '%';
        clearInterval(interval);
      }
      else if(width <= 0) {
        clearInterval(interval);
      }
      else {
        this.progressBar.style.width = width + '%';
        this.progressBar.innerHTML = width + '%';
        this.progressWrapper.innerHTML = (100 - width) + '%';
        clearInterval(interval);
      }
    }, 10);
  }
  /**
   * vote again method
   * @param {int} int number
   *
   * save the votes into local storage
   * dispatch the vote event to document
   * manipulate classes
  */
  vote(votes) {
    const voted = new CustomEvent(events.VOTED,
      {'detail':
        {
          votes: votes,
          storage: this.localStorageName
        }
      }
    );

    this.voteAgain.classList.add(classes.VISIBLE);
    this.btnWrapper.classList.add(classes.HIDE);

    localStorage.setItem(this.localStorageName, votes);
    this.progress(votes);
    document.dispatchEvent(voted);
  }
  /**
   * vote again method
   * @param {e} e event
  */
  anotherVote(e) {
    e.preventDefault();
    this.voteAgain.classList.remove(classes.VISIBLE);
    this.btnWrapper.classList.remove(classes.HIDE);
  }
  /**
   * Init function
   */
  init() {
    this.localStorageName = this.element().dataset.pollComponent;
    this.progressBar = this.element().querySelector(selectors.PROGRESS_BAR);
    this.progressWrapper =
      this.element().querySelector(selectors.PROGRESS_REGRESSION);
    this.like = this.element().querySelector(selectors.LIKE_BTN);
    this.dislike = this.element().querySelector(selectors.DISLIKE_BTN);
    this.voteAgain = this.element().querySelector(selectors.VOTE_AGAIN);
    this.btnWrapper = this.element().querySelector(selectors.BTN_WRAPPER);
    this.storage = localStorage.getItem(this.localStorageName);
    this.count = this.storage ? this.storage : 0;

    if (this.storage) {
      this.progress(this.count);
    }

    this.bindEvents();
  }
}
/**
 * Initializes all the instance of the component
 * @return {Array.<PollComponent>}
 */
exports.init = function() {
  return [...document.querySelectorAll(selectors.SELF)]
      .map((el) => new PollComponent(el));
}
