import Popup from '../popup/popup';
import Abstract from '../abstract/abstract';
import { Dictionary, UserCategory } from '../../types/typings';
export default class NewUserCategory extends Abstract {
    catId: number;
    lang: string;
    elements: Dictionary<HTMLElement | HTMLInputElement>;
    icon: string;
    args: Array<any>;
    updateToCategory?: UserCategory;
    addCatPopup?: Popup;
    itemName?: string;
    itemAmount?: string;
    icons?: Array<string>;
    iconBoard?: HTMLElement;
    constructor(lang: string, catId: number, ...args: any[]);
    loadForm(): void;
    processForm(): void;
    selectIcon(): void;
    sendToServer(): void;
    sendUpdate(): void;
    catchEvent(eventName: string): void;
}
