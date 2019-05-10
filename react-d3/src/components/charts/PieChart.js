import React, { useRef, useLayoutEffect } from 'react'
import * as d3 from "d3";
// import {scaleLinear} from "d3-scale";

const VBarsChart = (props) => {
    const { chart, data } = props;
    console.log(data, chart);
    // var color = d3.scaleOrdinal(d3.schemeCategory10);
    // var margin = {top: 20, right: 40, bottom: 30, left: 40};
    var full_width = 600;
    // var width = full_width - margin.left - margin.right;
    var full_height = full_width * (2/3);
    // var height = full_height - margin.top - margin.bottom;
    var t = d3.transition()
        .duration(500);
    var r = Math.min(full_width, full_height) / 2; //100,  	//radius
      // color = d3.scale.category20c(); //V3
    // var color = d3.scaleOrdinal(d3.schemeCategory10);     //builtin range of colors V5

    const chartSlicesEl = useRef(null);
    const chartLabelsEl = useRef(null);
    const chartLinesEl = useRef(null);

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
        if (chartSlicesEl.current){
          var chart_slices = d3.select(chartSlicesEl.current);
          var chart_labels = d3.select(chartLabelsEl.current);
          var chart_lines = d3.select(chartLinesEl.current);
          var arc = d3.arc()              //this will create <path> elements for us using arc data
							.innerRadius(0)
							.outerRadius(r * 0.9);
							// .startAngle(0)
							// .endAngle(Math.PI * 2);

					var outerArc = d3.arc()
							.innerRadius(r * 0.8)
							.outerRadius(r);

			    var pie = d3.pie()           //this will create arc data for us given a list of values
							.value(function(d) { return d.value; })(data);    //we must tell it to access the value of each element in our data array
					console.log(pie);
					// var slices = chart_data.select(".slices");
			    var arcs = chart_slices.selectAll("path.slice")  //this selects all <g> elements with class slice (there aren't any yet)
			        .data(pie);               //associate the generated pie data (an array of arcs, each having startAngle, endAngle and value properties)
			    arcs.enter()                 //this will create <g> elements for every "extra" data element that should be associated with a selection. The result is creating a <g> for every object in the data array
			            .append("path")
									.merge(arcs)
									.transition(t)               //create a group to hold each slice (we will have a <path> and a <text> element associated with each slice)
				            .attr("class", "slice")    //allow us to style things in the slices (like text)
											// .append("path")
			                .attr("fill", function(d, i) { return d3.interpolateRainbow(i * (1 / data.length)); } ) //return color(i) //set the color for each slice to be chosen from the color function defined above
											.attr("stroke", function(d, i) { return d3.interpolateRainbow(i * (1 / data.length)); } )
											.attr("fill-opacity","0.6")
											.attr("d", arc); //this creates the actual SVG path using the associated data (pie) with the arc drawing function
					arcs.exit().remove();
					function midAngle(d){
								return d.startAngle + (d.endAngle - d.startAngle)/2;
					}
					// var labels = chart_data.select(".labels");
			    var text = chart_labels.selectAll("text.label")
											.data(pie);
										text.enter()
												.append("text")
												.merge(text)
												.transition(t)
													.attr("alignment-baseline", "middle")
													.attr("class","label")    //add a label to each slice
			                		.attr("transform", function(d) {  //set the label's origin to the center of the arc
							                //we have to make sure to set these before calling arc.centroid
							                d.innerRadius = 0;
							                d.outerRadius = r;
															var pos = outerArc.centroid(d);
															pos[0] = r * (midAngle(d) < Math.PI ? 1 : -1);
							                return "translate(" + pos + ")"; //this gives us a pair of coordinates like [50, 50]
			            				})
							            .attr("text-anchor", function(d){return midAngle(d) < Math.PI ? "start":"end";}) //center the text on it's origin
							            .text(function(d) { return d.data.name; }); //.text(function(d, i) { return data[i].name; });
										text.exit().remove();
					// var lines = chart_data.select(".lines");
					var poly = chart_lines.selectAll("polyline.line")
											.data(pie);
									poly.enter()
												.append("polyline")
												.merge(poly)
												.transition(t)
													.attr("fill", "none")
													.attr("class", "line")
													.attr("stroke", "black")
													.attr("points",function(d){
															var pos = outerArc.centroid(d);
															pos[0] = r * 0.95 * (midAngle(d) < Math.PI ? 1 : -1);
															return [arc.centroid(d), outerArc.centroid(d), pos];
													});
									poly.exit().remove();
    }};
    return (
      <div className="graph">
        <canvas width={full_width} height={full_height}></canvas>
        <svg viewBox={"0 0 " + full_width + " " + full_height} preserveAspectRatio="xMinYMin">
          <g className='chart_area' transform={"translate(" + full_width/2 + "," + full_height/2 +  ")"}>
            <g className='chart_slices'ref={chartSlicesEl}/>
            <g className='chart_labels'ref={chartLabelsEl}/>
            <g className='chart_lines' ref={chartLinesEl} />
          </g>
        </svg>
      </div>
    )
}

export default VBarsChart;
