import Abstract from '../abstract/abstract';
import * as t from '../../types/typings';
export default class DataModel extends Abstract {
    currentToken: string | null;
    user: string;
    email: string;
    categories: Array<t.Category>;
    blocks: Array<t.Category>;
    userCategories: Array<t.UserCategory>;
    allMoves: t.Dictionary<Array<t.Move>>;
    userToken?: string | undefined | null;
    constructor(data: t.UserInfo);
    getAllCagetoryByType(type: number): Array<t.UserCategory>;
    updateDataModel(): void;
    catchEvent(eventName: string): void;
}
