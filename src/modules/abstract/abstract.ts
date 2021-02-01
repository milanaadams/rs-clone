/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable class-methods-use-this */
export default class Abstract {
  evtArr: string[];

  constructor() {
    this.evtArr = ['userLoggedIn', 'logOut', 'changeLang', 'removeIconBoard', 'updateDataModel', 'updateMovesBlock'];

    this.evtArr.forEach((evtName) => {
      document.addEventListener(evtName, (evt) => this.catchEvent(evtName, (<CustomEvent>evt).detail));
    });
  }

  createCustomEvent(eventName: string,
    eventObj: any|null = null,
    timeOut: number|null = null): void {
    const customEvt = new CustomEvent(eventName, {
      detail: eventObj,
    });

    if (timeOut) {
      setTimeout(() => document.dispatchEvent(customEvt), timeOut);
    } else {
      document.dispatchEvent(customEvt);
    }
  }

  catchEvent(eventName: string, detail: any): void {
    if (this.evtArr.indexOf(eventName) > -1) {
      throw new Error('Not implemented exception.');
    }
  }
}
