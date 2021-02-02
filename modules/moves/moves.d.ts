import Abstract from '../abstract/abstract';
import MovesUpdate from './moves-update';
import { UserToken, Dictionary, MoveItem, Move as MoveInterface } from '../../types/typings';
import DataModel from '../data-model/dataModel';
export default class Moves extends Abstract {
    parent: HTMLElement;
    elements: Dictionary<HTMLElement>;
    dataModel: DataModel;
    lang: string;
    userToken?: UserToken;
    moves: Array<MoveItem>;
    popUp?: MovesUpdate;
    constructor(lang: string, parent: HTMLElement, dataModel: DataModel);
    loadMovesHistory(): void;
    deleteCategory(category: MoveInterface): void;
    updateMovesBlock(): void;
    catchEvent(eventName: string): void;
}
