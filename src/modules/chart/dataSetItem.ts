/* eslint-disable @typescript-eslint/lines-between-class-members */
export default class DataSetItem {
  label: string;
  data : Array<any>;
  fill: boolean;
  borderColor: string;
  backgroundColor: string;
  borderWidth: number;

  constructor(label: string, data: Array<any>,
    fill = false,
    borderColor: string,
    backgroundColor:
    string, borderWidth: number) {
    this.label = label;
    this.data = data;
    this.fill = fill;
    this.borderColor = borderColor;
    this.backgroundColor = backgroundColor;
    this.borderWidth = borderWidth;
  }
}
