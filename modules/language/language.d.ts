import Abstract from '../abstract/abstract';
export default class Language extends Abstract {
    locale: string[];
    language: string;
    constructor();
    switchLanguage(langToSwitch: number): void;
    loadLanguageSwitcher(): DocumentFragment;
    catchEvent(eventName: string): void;
}
