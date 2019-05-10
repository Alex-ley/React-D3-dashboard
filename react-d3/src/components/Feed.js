import React, { useState, useEffect } from 'react'
import ChartCardWrapper from './ChartCardWrapper'

const Feed = (props) => {
    const { data, render } = props;
    const [charts, setCharts] = useState(props.charts);
    useEffect(()=> {
      console.log("charts.length", props.charts.length);
      setCharts(props.charts);
    },[props.render, props.charts])
    console.log(props);
    return (
      <div className="dashboard container">
        <div className="row">
        { charts && charts.map((chart, i) => {
          return (
            <ChartCardWrapper chart={chart} data={data} render={render} key={chart.id}/>
          )
        })}
        </div>
      </div>
    )
}

export default Feed;
