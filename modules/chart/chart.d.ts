import ChartJs from 'chart.js';
import Abstract from '../abstract/abstract';
import DataModel from '../data-model/dataModel';
import { Dictionary } from '../../types/typings';
import Language from '../language/language';
export default class Chart extends Abstract {
    lang: Language;
    parent: HTMLElement;
    elements: Dictionary<HTMLElement | CanvasRenderingContext2D | HTMLCanvasElement | null>;
    dataModel: DataModel;
    filter?: any;
    chartConfig?: any;
    chartData?: any;
    chart?: ChartJs;
    selectItems: Array<Dictionary<string>>;
    selectTimes: Array<Dictionary<string>>;
    constructor(lang: Language, parent: HTMLElement, dataModel: DataModel);
    chartSettingsInit(): void;
    loadBlocks(): void;
    selectHandler(evt: Event): void;
    switchAppLang(): void;
    prepareData(data: any): void;
    getData(): void;
    catchEvent(eventName: string): void;
}
