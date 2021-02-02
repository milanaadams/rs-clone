import Popup from '../popup/popup';
import Abstract from '../abstract/abstract';
import { UserToken, Dictionary, Move as MoveInterface } from '../../types/typings';
export default class MovesUpdate extends Abstract {
    lang: string;
    move: MoveInterface;
    elements: Dictionary<HTMLElement | HTMLInputElement>;
    popup?: Popup;
    userToken?: UserToken;
    constructor(lang: string, move: MoveInterface);
    loadMoveUpdateForm(): void;
    processForm(): void;
    updateMoneyMove(transactionDate: string, amount: number, userComment: string): void;
    catchEvent(eventName: string): void;
}
