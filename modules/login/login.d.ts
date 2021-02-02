import Abstract from '../abstract/abstract';
export default class Login extends Abstract {
    parent: HTMLElement;
    login: boolean;
    elements: any;
    lang: string;
    token?: string;
    registerError?: HTMLElement;
    constructor(lang: string, parent: HTMLElement);
    generateForm(): void;
    processForm(...args: Array<HTMLInputElement>): void;
    removeErrorMsg(input: HTMLElement): void;
    switchForm(): void;
    logInUser(userEmail: HTMLInputElement, userPass: HTMLInputElement): void;
    registerUser(userEmail: HTMLInputElement, userPass: HTMLInputElement, userName: HTMLInputElement): void;
    showRegisteredSuccessfullyMsg(): void;
    catchEvent(eventName: string): void;
}
