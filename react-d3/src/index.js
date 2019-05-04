import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const myData = [{
   "name": "Jan",
   "value": 300
},
{
   "name": "Feb",
   "value": 1000
},
{
  "name": "Mar",
  "value": 600
},
{
  "name": "Apr",
  "value": 1400
},
{
  "name": "May",
  "value": 800
},
{
  "name": "Jun",
  "value": 950
}];

const myCharts = [{
   "type": "VBarsChart",
   "name": "Vertical Bar Chart",
   "id": 0,
   "options": {}
},
{
  "type": "HBarsChart",
  "name": "Horizontal Bar Chart",
  "id": 1,
  "options": {}
}];

ReactDOM.render(<App data={myData} charts={myCharts}/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
