import Abstract from '../abstract/abstract';
import '../utils/assets';
import Login from '../login/login';
import DataModel from '../data-model/dataModel';
import UserDashboard from '../user-dashboard/userDashboard';
import Language from '../language/language';
import { UserToken as UserTokenType } from '../../types/typings';
export default class Main extends Abstract {
    userToken: UserTokenType;
    elements: any;
    lang: Language;
    currentLang: string;
    loginForm?: Login;
    dataModel?: DataModel;
    userDashboard?: UserDashboard;
    constructor(lang: Language);
    generateLayout(): void;
    loadContent(): void;
    loadLoginForm(): void;
    logOut(): void;
    switchAppLang(): void;
    catchEvent(eventName: string): void;
}
