import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Feed from './components/Feed'
import ChartCardWrapper from './components/ChartCardWrapper'
import { Route, BrowserRouter, Switch } from 'react-router-dom';

const App = () => {
  // const { data, charts, random, addChart} = props;
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
  },
  {
    "type": "PieChart",
    "name": "Pie Chart",
    "id": 2,
    "options": {}
  }];

  const [data, setData] = useState(myData);
  const [charts, setCharts] = useState(myCharts);
  const [render, setRender] = useState(0);

  const random = function() {
    for (var i = 0; i < data.length; i++) {
      var tempData = data;
      tempData[i].value = Math.floor(Math.random() * 1000);
      setData(tempData);
    }
    console.log("random");
    console.log(myData);
    setRender(r => r + 1);
    console.log(render);
  }

  const addChart = function() {
    var tempCharts = charts
    const len = charts.length;
    tempCharts.push({
      "type": "VBarsChart",
      "name": "Vertical Bar Chart",
      "id": len,
      "options": {}
    });
    setCharts(tempCharts);
    setRender(r => r + 1);
  }

  console.log(charts);
  return (
    <BrowserRouter>
    <div className="App">
      <Navbar />
      <header className="App-header">
        <div className="container black-text">
          <h5>Data Dashboard using React v16.8 and d3 v5</h5>
          <button className="btn waves-effect waves-light" onClick={random}>Randomize</button>
          <button className="btn waves-effect waves-light" onClick={addChart}>Add Chart</button>
        </div>
      </header>
      <div className="App-body">
      <Switch>
        <Route exact path='/'render={(props) => <Feed {...props} render={render} data={data} addChart={addChart} charts={charts}/>} />
        <Route path='/chart/:id' component={ChartCardWrapper} />
      </Switch>
      </div>
    </div>
    </ BrowserRouter>
  );
}

export default App;
