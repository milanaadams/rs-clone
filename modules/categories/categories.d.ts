import NewUserCategory from './newUserCategory';
import Abstract from '../abstract/abstract';
import MoneyMove from '../money-move/money-move';
import DataModel from '../data-model/dataModel';
import { Dictionary, Category, UserToken, UserCategory } from '../../types/typings';
export default class Categories extends Abstract {
    parent: HTMLElement;
    dataModel: DataModel;
    elements: Dictionary<HTMLElement>;
    received: number;
    budget: number;
    lang: string;
    userToken?: UserToken;
    popup?: MoneyMove;
    popUp?: NewUserCategory;
    constructor(lang: string, parent: HTMLElement, dataModel: DataModel);
    loadBlocks(): void;
    getTotalAmount(catType: number, field: 'plan' | 'summa'): number;
    loadCategories(currentCat: Category, parent: HTMLElement): void;
    updateCategory(category: UserCategory): void;
    deleteCategory(category: UserCategory): void;
    catchEvent(eventName: string): void;
}
