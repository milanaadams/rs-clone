/* eslint-disable @typescript-eslint/lines-between-class-members */
import Abstract from '../abstract/abstract';
import create from '../utils/create';

export default class Language extends Abstract {
  locale: string[];
  language: string;

  constructor() {
    super();
    this.locale = ['en', 'ru', 'bel'];
    [this.language] = [this.locale[0]];
  }

  switchLanguage(langToSwitch: number): void {
    /* if (this.language === this.locale[0]) {
      [this.language] = [this.locale[1]];
    } else {
      [this.language] = [this.locale[0]];
    } */
    this.language = this.locale[langToSwitch];
    this.createCustomEvent('changeLang');
  }

  loadLanguageSwitcher(): DocumentFragment {
    /* if (this.language === this.locale[0]) return 'Switch to Russian';
    return 'Switch to English'; */
    const fragment = document.createDocumentFragment();
    this.locale.forEach((lang, index) => {
      const langItem = create('span', 'header__dropdown-menu__language', lang.toUpperCase(), fragment);
      if (lang === this.language) langItem.classList.add('header__dropdown-menu__language--active');
      else langItem.addEventListener('click', () => { this.switchLanguage(index); });
    });
    return fragment;
  }

  catchEvent(eventName) {
    if (this.evtArr.indexOf(eventName) === -1) {
      throw new Error('Wrong custom event name.');
    }
  }
}
