import React, { useRef, useLayoutEffect } from 'react'
import * as d3 from "d3";
// import {scaleLinear} from "d3-scale";

const VBarsChart = (props) => {
    const { chart, data } = props;
    console.log(data, chart);
    // var color = d3.scaleOrdinal(d3.schemeCategory10);
    var margin = {top: 20, right: 40, bottom: 30, left: 40};
    var full_width = 600;
    var width = full_width - margin.left - margin.right;
    var full_height = full_width * (2/3);
    var height = full_height - margin.top - margin.bottom;
    var t = d3.transition()
        .duration(500);
    var x = d3.scaleBand()
        .rangeRound([0, width])
        .padding(0.1);
    var y = d3.scaleLinear()
        .range([height, 0]);
    var xAxis = d3.axisBottom(x);
    var yAxis = d3.axisLeft(y)
        .ticks(8);

    const chartDataEl = useRef(null);
    const chartLabelsEl = useRef(null);
    const xAxisEl = useRef(null);
    const yAxisEl = useRef(null);

    useLayoutEffect(() => {
      console.log("data changed", props.data);
      render(props.data);
      return(() =>{ //clean up effect like componentWillUnmount
        console.log(props.data);
        }
      )
    },[props.render, props.data]); // By adding an empty array it is only run once (like componentDidMount)

    const render = (data) => {
      console.log(data, props.render);
        if (xAxisEl.current){
          console.log(xAxisEl.current);
          console.log(yAxisEl.current);
          console.log(data);
          var chart_data = d3.select(chartDataEl.current);
          var chart_labels = d3.select(chartLabelsEl.current);
          var chart_xAxis = d3.select(xAxisEl.current);
          var chart_yAxis = d3.select(yAxisEl.current);
          // d3.select(xAxisEl.current).call(xAxis);
          // d3.select(yAxisEl.current).call(yAxis);
          x.domain(data.map(function(d) { return d.name; }));
          y.domain([0, d3.max(data, function(d) { return d.value; })]);
          xAxis.scale(x);
          yAxis.scale(y);
          var oldX = chart_xAxis.selectAll(".x")
              .data(["dummy"]);
          var newX = oldX.enter().append("g")
              .attr("class", "x axis")
              .attr("font-size", "14");
          oldX.merge(newX).transition(t).call(xAxis);
          var oldY = chart_yAxis.selectAll(".y")
              .data(["dummy"]);
          var newY = oldY.enter().append("g")
              .attr("class", "y axis")
              .attr("font-size", "14");
          oldY.merge(newY).transition(t).call(yAxis);
          var bar = chart_data.selectAll(".bar")
              .data(data);
          bar.enter().append("rect")
              .attr("class", "bar")
              .merge(bar)
              .transition(t)
                .attr("x", function(d) { return x(d.name); })
                .attr("y", function(d) { return y(d.value); })
                .attr("fill", function(d, i) { return d3.interpolateRainbow(i * (1 / data.length)); } ) //return color(i)
                .attr("fill-opacity","0.6")
                .attr("height", function(d) { return height - y(d.value); })
                .attr("width", x.bandwidth());
          bar.exit().remove();
          var text = chart_labels.selectAll(".label")
              .data(data);
          text.enter()
              .append("text")
              .merge(text)
              .transition(t)
                .attr("class","label")
                .attr("x", (function(d) { return x(d.name) + (x.bandwidth()/2); })) //to horizontally align in the middle of the bar
                .attr("font-size", "12")
                .attr("text-anchor","middle") //to horizontally align in the middle of the bar
                .attr("y", function(d) { return y(d.value) - 15; })
                .attr("dy", ".75em")
                .text(function(d) { return d.value.toFixed(0); });
          text.exit().remove();
    }};
    return (
      <div className="graph">
        <canvas width={full_width} height={full_height}></canvas>
        <svg viewBox={"0 0 " + full_width + " " + full_height} preserveAspectRatio="xMinYMin">
          <g className='chart_area' transform={"translate(" + margin.left + "," + margin.top + ")"}>
            <g className='chart_data'ref={chartDataEl}/>
            <g className='chart_labels'ref={chartLabelsEl}/>
            <g className='xAxis' ref={xAxisEl} transform={`translate(0, ${height})`}/>
            <g className='yAxis' ref={yAxisEl}/>
          </g>
        </svg>
      </div>
    )
}

export default VBarsChart;
