import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Feed from './components/Feed'
import ChartCardWrapper from './components/ChartCardWrapper'
import { Route, BrowserRouter, Switch } from 'react-router-dom';

const App = (props) => {
  const { data, charts } = props;
  console.log(charts);
  return (
    <BrowserRouter>
    <div className="App">
      <Navbar />
      <header className="App-header">
        <div className="container black-text">
          <h5>Data Dashboard using React v16.8 and d3 v5</h5>
        </div>
      </header>
      <div className="App-body">
      <Switch>
        <Route exact path='/'render={(props) => <Feed {...props} charts={charts} data={data}/>} />
        <Route path='/chart/:id' component={ChartCardWrapper} />
      </Switch>
      </div>
    </div>
    </ BrowserRouter>
  );
}

export default App;
