import Popup from '../popup/popup';
import Abstract from '../abstract/abstract';
import { UserToken, Dictionary, UserCategory, IputInfoMove } from '../../types/typings';
import DataModel from '../data-model/dataModel';
export default class MoneyMove extends Abstract {
    lang: string;
    currentCategory: UserCategory;
    dataModel: DataModel;
    inputInfo: IputInfoMove;
    elements: Dictionary<HTMLElement | HTMLInputElement>;
    userToken?: UserToken;
    categoriesFrom?: Array<UserCategory>;
    categoriesTo?: Array<UserCategory>;
    popup?: Popup;
    constructor(lang: string, category: UserCategory, dataModel: DataModel);
    loadTransferForm(): void;
    loadToAndFromCategories(): void;
    loadSelectOptions(category: Array<UserCategory>, parent: HTMLElement | HTMLInputElement, selectedId: number): void;
    processForm(): void;
    generateMoneyMove(catFrom: number, catTo: number, transactionDate: string, amount: number, userComment: string): void;
    catchEvent(eventName: string): void;
}
