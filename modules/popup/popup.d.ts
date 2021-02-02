import Abstract from '../abstract/abstract';
import { Dictionary, Content as ContentType } from '../../types/typings';
export default class Popup extends Abstract {
    parent: HTMLElement | DocumentFragment;
    content: ContentType;
    elements: Dictionary<HTMLElement>;
    constructor(parent: HTMLElement | DocumentFragment, content: ContentType);
    loadPopup(): void;
    closePopup(): void;
    catchEvent(eventName: string): void;
}
