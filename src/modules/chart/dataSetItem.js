export default class DataSetItem {
  constructor(label, data, fill = false, borderColor, backgroundColor, borderWidth) {
    this.label = label;
    this.data = data;
    this.fill = fill;
    this.borderColor = borderColor;
    this.backgroundColor = backgroundColor;
    this.borderWidth = borderWidth;
  }
}
