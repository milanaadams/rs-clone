import Abstract from '../abstract/abstract';
import Categories from '../categories/categories';
import Chart from '../chart/chart';
import Moves from '../moves/moves';
import Language from '../language/language';
import DataModel from '../data-model/dataModel';
import { UserToken, Dictionary } from '../../types/typings';
export default class UserDashboard extends Abstract {
    parent: HTMLElement;
    elements: Dictionary<HTMLElement>;
    headerInfo: HTMLElement;
    dataModel: DataModel;
    langObj: Language;
    lang: string;
    userToken?: UserToken;
    incomeBlock?: Categories;
    chartBlock?: Chart;
    movesHistoryBlock?: Moves;
    constructor(lang: Language, parent: HTMLElement, headerInfo: HTMLElement, dataModel: DataModel);
    loadHeaderInfo(): void;
    loadDropdownHeaderMenu(): void;
    loadDashboard(): void;
    catchEvent(eventName: string): void;
}
