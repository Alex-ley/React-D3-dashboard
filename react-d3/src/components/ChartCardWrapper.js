import React from 'react'
import VBarsChart from './charts/VBarsChart'
import HBarsChart from './charts/HBarsChart' //must import all chart components here and also add them to switch below

const ChartCardWrapper = (props) => {
    const { data, chart } = props;

    return (

      <div className="col l6 xl4" style={{"padding": "10px 10px"}}>
        <div className="card grey lighten-4">
          <div className="card-content">
            <span className="card-title">{chart.name}</span>
            {
              (() => {
                switch (chart.type) {
                  case 'VBarsChart':
                    return <VBarsChart options={chart.options} data={data}/>;
                  case 'HBarsChart':
                    return <HBarsChart options={chart.options} data={data}/>
                  default:
                    return null;
                }
              })()
            }
            <div className="card-action">
              <h5 className="card-title">Special title treatment</h5>
              <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
              <button >Randomize Data</button>
            </div>
          </div>
        </div>
      </div>
    )
}

export default ChartCardWrapper;
