export declare type Dictionary<T> = {
    [key: string]: T;
};
export interface UserCategory {
    entries<T extends {
        [key: string]: any;
    }, K extends keyof T>(o: T): [keyof T, T[K]][];
    id: number;
    name: string;
    type: number;
    plan: number;
    summa: number;
    icoUrl: string;
}
export declare type UserCategoryKeys = keyof UserCategory;
export interface Tag {
    id: number;
    name: string;
    user: number;
}
export interface TagsArr {
    id: number;
    collection: number;
    tag: number;
}
export interface MoveItem {
    element: HTMLElement;
    info: Move;
}
export interface Move {
    id: number;
    user: number;
    catFrom: number;
    catTo: number;
    date: string;
    value: number;
    comment: string;
    tagArr: Array<TagsArr>;
    cat_from_ref: UserCategory;
    cat_to_ref: UserCategory;
}
export interface UserInfoUser {
    email: string;
    name: string;
    userCategories: Array<UserCategory>;
    tags: Array<Tag>;
    allMoves: Dictionary<Array<Move>>;
    tagsArr: Array<TagsArr>;
}
export interface Category {
    id: number;
    name: string;
    code: string;
    allowPlan: boolean;
}
export interface UserInfo {
    categories: Array<Category>;
    user: UserInfoUser;
}
export interface UserInfoResponse {
    data: UserInfo;
    token: string;
}
export declare type UserToken = string | null | undefined;
export interface ChartFilter {
    id: number;
    name: string;
    catType?: number;
    userCat?: number;
}
export interface ChartDataItem {
    x: Date;
    y: number;
    userCat?: number;
}
export interface ChartDataItemReal {
    x: Date;
    y: number;
}
export interface IputInfoMove {
    moveFrom: UserCategory | null;
    moveTo: UserCategory | null;
}
export declare type Content = string | number | null | boolean | HTMLElement | DocumentFragment;
export interface UserCatElem {
    id: number;
    type: number;
    summElem?: HTMLElement;
    planElem?: HTMLElement;
    icon?: HTMLElement;
    item: UserCategory;
}
