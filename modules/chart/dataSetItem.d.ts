export default class DataSetItem {
    label: string;
    data: Array<any>;
    fill: boolean;
    borderColor: string;
    backgroundColor: string;
    borderWidth: number;
    constructor(label: string, data: Array<any>, fill: boolean | undefined, borderColor: string, backgroundColor: string, borderWidth: number);
}
