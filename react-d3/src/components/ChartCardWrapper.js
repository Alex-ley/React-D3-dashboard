import React from 'react'
import { Link } from 'react-router-dom'
import VBarsChart from './charts/VBarsChart'
import HBarsChart from './charts/HBarsChart'
import PieChart from './charts/PieChart' //must import all chart components here and also add them to switch below

const ChartCardWrapper = (props) => {
    const { data, chart, render } = props;

    return (

      <div className="col l6 xl4" style={{"padding": "10px 10px"}}>
        <div className="card grey lighten-4">
          <div className="card-content">
            <span className="card-title">{chart.name}</span>
            {
              (() => {
                switch (chart.type) {
                  case 'VBarsChart':
                    return <VBarsChart options={chart.options} data={data} key={chart.key} render={render}/>;
                  case 'HBarsChart':
                    return <HBarsChart options={chart.options} data={data} key={chart.key} render={render}/>;
                  case 'PieChart':
                    return <PieChart options={chart.options} data={data} key={chart.key} render={render}/>;
                  default:
                    return null;
                }
              })()
            }
            <div className="card-action">
              <h5 className="card-title">Special title treatment</h5>
              <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
              <br/><Link to={'/chart/' + chart.id}>Chart Detail</Link>
            </div>
          </div>
        </div>
      </div>
    )
}

export default ChartCardWrapper;
