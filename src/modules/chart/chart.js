import ChartJs from 'chart.js';
import create from '../utils/create';
import locale from '../main/locale';
import config from '../../config'
import DataSetItem from './dataSetItem'

export default class Chart {
  constructor(parent, dataModel) {
    this.parent = parent;
    this.dataModel = dataModel;
    this.elements = {};
    this.lang = 'en';
    this.indicatorList = locale.chart.selectItems;
   
    this.currentIndicator = this.indicatorList[0];

    this.filter = {
      dateTrunc: 'day',
      dateFrom: '',
      dateTo: '',
      catType: 3,
    };

    this.getData();
    this.chartSettingsInit();
    this.loadBlocks();
     

    // https://www.chartjs.org/samples/latest/scales/logarithmic/line.html
    // https://www.chartjs.org/docs/latest/
  }

  chartSettingsInit() {
    this.timeFormat = 'DD/MM/YYYY';

    const chartSettings = {
      responsive: true,
      title:      {
          display: true,
          text:    "Chart.js Time Scale"
      },
      scales:     {
          xAxes: [{
              type:       "time",
              time:       {
                  format: this.timeFormat,
                  tooltipFormat: 'll'
              },
              scaleLabel: {
                  display:     true,
                  labelString: 'Date'
              }
          }],
          yAxes: [{
              scaleLabel: {
                  display:     true,
                  labelString: 'value'
              }
          }]
      }
  }

    this.chartConfig = chartSettings;
  }

  loadBlocks() {
    const blockItem = create('div', 'block', null, this.parent);
    const blockHead = create('div', 'block__head', null, blockItem);
    const blockBody = create('div', 'block__body', null, blockItem);

    const select = create('select', 'chart-select', null, blockHead, ['id', 'chart-select']);
    locale.chart.selectItems.forEach((item) => {
      create('option', null, item[this.lang], select, ['value', item.id]);
    });



    // this.speedData = {
    //   labels: [5,10,15,20,25,30,35],
    //   datasets: [{
    //     label: "Car Speed",
    //     data: [0, 59, 75, 20, 20, 55, 40],
    //     fill: false
    //   }]
    // };
     

    this.chartData = {};

 


    const canvasBox = create('div', 'canvasBox', null, blockBody);
    this.elements.canvas = create('canvas', 'canvas', null, canvasBox, ['width', '200'], ['height', '70'], ['id', 'chart']);
    this.elements.ctx = this.elements.canvas.getContext('2d');
    this.chart = new ChartJs(this.elements.ctx,  {
      type: 'line',
      data: this.chartData,
      options: this.chartConfig
  });
  }



  prepareData(data){
    console.log(data);
    const color = ChartJs.helpers.color;

   
    const dataSetData = data.map(el=> {
      const obj = {
      y: el.sum,
      x: new Date(el.date)
    };
    return obj;
  });
    const dataSet = new DataSetItem('Test', dataSetData, false, 'red', 'red', 2);

    this.chartData.datasets = []
    this.chartData.datasets.push(dataSet)
    
    
    this.chart.update();
  }

  getData() {
    this.data = [];
    const userToken = localStorage.getItem('userToken');

   
    fetch(`${config.server}/api/moves/getDataByCatType`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify({
        filter: this.filter,
      }),
    })
      .then((response) => {
        if (response.status !== 200) {
          // this.userToken = null;
          // localStorage.removeItem('userToken');
          // this.loadLoginForm();
          console.log('gg');
        } else {
          response.json().then((data) => {
            this.prepareData(data);
          });
        }
      })
      .catch((errMsg) => { throw new Error(errMsg); });
  }
}
