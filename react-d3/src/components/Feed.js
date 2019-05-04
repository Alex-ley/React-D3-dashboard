import React from 'react'
import { Link } from 'react-router-dom'
import ChartCardWrapper from './ChartCardWrapper'

const Feed = (props) => {
    const { data, charts } = props;
    console.log(props);
    return (
      <div className="dashboard container">
        <div className="row">
        { charts && charts.map((chart, i) => {
          return (
            <Link to={'/chart/' + chart.id} key={chart.id}>
              <ChartCardWrapper chart={chart} data={data} />
            </Link>
          )
        })}
        </div>
      </div>
    )
}

export default Feed;
