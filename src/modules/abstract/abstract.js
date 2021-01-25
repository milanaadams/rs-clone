/* eslint-disable class-methods-use-this */
export default class Abstract {
  constructor() {
    this.evtArr = ['userLoggedIn', 'logOut', 'changeLang', 'removeIconBoard'];

    this.evtArr.forEach((evtName) => {
      document.addEventListener(evtName, (evt) => this.catchEvent(evtName, evt.detail));
    });
  }

  createCustomEvent(eventName, eventObj, timeOut) {
    const customEvt = new CustomEvent(eventName, {
      detail: eventObj,
    });

    if (timeOut) {
      setTimeout(() => document.dispatchEvent(customEvt), timeOut);
    } else {
      document.dispatchEvent(customEvt);
    }
  }

  catchEvent(eventName) {
    if (this.evtArr.indexOf(eventName) > -1) {
      throw new Error('Not implemented exception.');
    }
  }
}
