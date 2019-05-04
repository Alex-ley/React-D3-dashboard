import React, { useRef, useLayoutEffect } from 'react'
import * as d3 from "d3";
// import {scaleLinear} from "d3-scale";

const VBarsChart = (props) => {
    const { data, chart } = props;
    console.log(data);
    var color = d3.scaleOrdinal(d3.schemeCategory10);
    var margin = {top: 20, right: 30, bottom: 30, left: 40};
    var full_width = 600;
    var width = full_width - margin.left - margin.right;
    var full_height = full_width * (2/3);
    var height = full_height - margin.top - margin.bottom;
    var t = d3.transition()
        .duration(500);
    var x = d3.scaleLinear()
        .range([0, width]);
    var y = d3.scaleBand()
        .rangeRound([0, height]) //to flip the category order use [height, 0]
        .padding(0.1);
    var xAxis = d3.axisBottom(x)
        .ticks(8);
    var yAxis = d3.axisLeft(y);
    y.domain(data.map(function(d) { return d.name; }));
    x.domain([0, d3.max(data, function(d) { return d.value; })]);
    xAxis.scale(x);
    yAxis.scale(y);

    const xAxisEl = useRef(null);
    const yAxisEl = useRef(null);
    useLayoutEffect(() => {
        if (xAxisEl.current){
          console.log(xAxisEl.current);
          console.log(yAxisEl.current);
          d3.select(xAxisEl.current).call(xAxis);
          d3.select(yAxisEl.current).call(yAxis);
        }
      return(() =>{ //clean up effect like componentWillUnmount
        console.log(xAxisEl.current);
        console.log(yAxisEl.current);
        }
      )
    },[]); // By adding an empty array it is only run once (like componentDidMount)

    return (
      <div className="graph">
        <canvas width={full_width} height={full_height}></canvas>
        <svg viewBox={"0 0 " + full_width + " " + full_height} preserveAspectRatio="xMinYMin">
          <g className='chart_area' transform={"translate(" + margin.left + "," + margin.top + ")"}>
            <g className='chart_data'/>
            <g className='xAxis' ref={xAxisEl} transform={`translate(0, ${height})`}/>
            <g className='yAxis' ref={yAxisEl}/>
          </g>
        </svg>
      </div>
    )
}

export default VBarsChart;
