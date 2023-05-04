
import * as d3 from "https://cdn.skypack.dev/d3@7";


const height = 465
const marginY = 25
const width = 465
const marginX = 25

function jsonify(row, i){
	return {
		name : row.Name,
		survived : (row.Survived == 1) ? "Yes" : "No",
		sex : row.Sex,
		age : +row.Age,
		fare : +row.Fare,
		key : i
		}
}

 
function updateSVG(rows) {
	var ages = rows.map(row=>row.age);
	var fares = rows.map(row=>row.fare);
	var maxAge = d3.max(ages);
	var minAge = d3.min(ages);
	var maxFare = d3.max(fares);
	var minFare = d3.min(fares);
	
	// Set x, y and colors
	var xScale = d3.scaleLinear()
    .domain([0, maxFare]) // input
    .range([0, width]); // output
	
	var yScale = d3.scaleLinear()
	  .domain([0, maxAge])
	  .range([height, marginY]);
	
	d3.select("svg").append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(" + marginX + "," + 0 + ")")
    .call(d3.axisLeft(yScale)); // Create an axis component with d3.axisLeft
	
	d3.select("svg").append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(" + marginX + "," + height + ")")
    .call(d3.axisBottom(xScale)); // Create an axis component with
									// d3.axisBottom
	
	
	rows.forEach(row=>d3.select("svg").
	append("circle").
	attr("stroke", "black").
	attr("cy", marginY + (height-marginY)*(maxAge-row.age)/(maxAge-minAge)).
	attr("cx", marginX + (width-marginX)*(row.fare-minFare)/(maxFare-minFare)).
	attr("r", 5).
	attr("fill", (row.survived=="Yes")?"blue":"red").
	append("title").text(row.name + "\nFare: "+ row.fare + "\nAge:" + row.age ));
	
	
	
	d3.select("svg").append("text")
    .attr("x", 0)             
    .attr("y", marginY/2)
    .style("font-size", "16px")
    .style("text-decoration", "bold")  
    .text("Age/Fare Survival");
	

	d3.select("svg").append("circle").attr("cx",width-marginX).
		attr("cy",marginY/2).attr("r", 6).style("fill", "blue").style("stroke", "black")
	d3.select("svg").append("circle").attr("cx",width-marginX).
		attr("cy",marginY).attr("r", 6).style("fill", "red").style("stroke", "black")
	d3.select("svg").append("text").attr("x", width-marginX + 9).
		attr("y", marginY/2).text("Survival").style("font-size", "15px").
		attr("alignment-baseline","middle")
	d3.select("svg").append("text").attr("x", width-marginX + 9).
		attr("y", marginY).text("Victim").style("font-size", "15px").
		attr("alignment-baseline","middle")


	}

d3.csv("data/titanic.csv", row=>jsonify(row)).then(data=>updateSVG(data))
