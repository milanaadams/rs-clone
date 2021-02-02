export default class Abstract {
    evtArr: string[];
    constructor();
    createCustomEvent(eventName: string, eventObj?: any | null, timeOut?: number | null): void;
    catchEvent(eventName: string, detail: any): void;
}
