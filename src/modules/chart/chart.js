import ChartJs from 'chart.js';
import create from '../utils/create';
import locale from '../main/locale';

export default class Chart {
  constructor(parent, dataModel) {
    this.parent = parent;
    this.dataModel = dataModel;
    this.elements = {};
    this.lang = 'en';

    this.indicatorList = locale.chart.selectItems;
    this.currentIndicator = this.indicatorList[0];
    this.getData();
    this.initConfig();
    this.loadBlocks();
    // https://www.chartjs.org/samples/latest/scales/logarithmic/line.html
    // https://www.chartjs.org/docs/latest/
  }

  loadBlocks() {
    const blockItem = create('div', 'block', null, this.parent);
    const blockHead = create('div', 'block__head', null, blockItem);
    const blockBody = create('div', 'block__body', null, blockItem);

    const select = create('select', 'chart-select', null, blockHead, ['id', 'chart-select']);
    locale.chart.selectItems.forEach((item) => {
      create('option', null, item[this.lang], select, ['value', item.id]);
    });

    const canvasBox = create('div', 'canvasBox', null, blockBody);
    this.elements.canvas = create('canvas', 'canvas', null, canvasBox, ['width', '200'], ['height', '70'], ['id', 'chart']);
    this.elements.ctx = this.elements.canvas.getContext('2d');
    this.chart = new ChartJs(this.elements.ctx, this.chartConfig);
  }

  initConfig() {
    this.chartConfig = {};
  }

  getData() {
    this.data = [];
    const userToken = localStorage.getItem('userToken');

    fetch('http://127.0.0.1/api/moves/getAll', {
    // fetch('https://f19m-rsclone-back.herokuapp.com/api/moves/getAll', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
    })
      .then((response) => {
        if (response.status !== 200) {
          // this.userToken = null;
          // localStorage.removeItem('userToken');
          // this.loadLoginForm();
          console.log('gg');
        } else {
          response.json().then((data) => {
            console.log(data);
          });
        }
      })
      .catch((errMsg) => { throw new Error(errMsg); });
  }
}
