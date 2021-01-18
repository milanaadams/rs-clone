import Abstract from '../abstract/abstract';

export default class Language extends Abstract {
  constructor() {
    super();
    this.locale = ['en', 'ru'];
    [this.language] = [this.locale[0]];
  }

  switchLanguage() {
    if (this.language === this.locale[0]) {
      [this.language] = [this.locale[1]];
    } else {
      [this.language] = [this.locale[0]];
    }
    this.createCustomEvent('changeLang');
  }

  loadLanguageSwitcher() {
    if (this.language === this.locale[0]) return 'Switch to Russian';
    return 'Switch to English';
  }

  catchEvent(eventName) {
    if (this.evtArr.indexOf(eventName) === -1) {
      throw new Error('Wrong custom event name.');
    }
  }
}
