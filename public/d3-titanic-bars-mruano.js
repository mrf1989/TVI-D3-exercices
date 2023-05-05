import * as d3 from "https://cdn.skypack.dev/d3@7";

// const data = [100, 50, 300, 40, 350, 250]; // assuming this is coming from the database

function jsonify(row) {
    return {
        survived: (row.Survived == 1) ? "Yes" : "No",
        sex: row.Sex,
        age: +row.Age,
        fare: +row.Fare
    }
}

function drawChart(rows) {
    const svgWidth = 600;
    const svgHeight = 600;
    const barPadding = 5;
    //const barWidth = svgWidth / rows.length;

    //const ages = rows.map(row => row.age);
    //const maxAge = d3.max(ages);
    //const minAge = d3.min(ages);

    const fares = rows.map(row => row.fare);
    const maxFare = d3.max(fares);
    const minFare = d3.min(fares);
    const numberOfMales = (rows.filter(row => row.survived == "Yes" && row.sex == "male")).length;
    const numberOfFemales = (rows.filter(row => row.survived == "Yes" && row.sex == "female")).length;
    const fareRageSize = Math.ceil((maxFare - minFare) / 6);
    const fareRanges = [minFare, minFare + fareRageSize, minFare + fareRageSize * 2, minFare + fareRageSize * 3, minFare + fareRageSize * 4, minFare + fareRageSize * 5, Math.ceil(maxFare)];
    const survived = rows.filter(row => row.survived == "Yes");
    const data = [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]];

    survived.forEach(row => {
        const fare = row.fare;
        if (fareRanges[0] <= fare && fare < fareRanges[1]) {
            row.sex == "male" ? data[0][0]++ : data[0][1]++;
        } else if (fareRanges[1] <= fare && fare < fareRanges[2]) {
            row.sex == "male" ? data[1][0]++ : data[1][1]++;
        } else if (fareRanges[2] <= fare && fare < fareRanges[3]) {
            row.sex == "male" ? data[2][0]++ : data[2][1]++;
        } else if (fareRanges[3] <= fare && fare < fareRanges[4]) {
            row.sex == "male" ? data[3][0]++ : data[3][1]++;
        } else if (fareRanges[4] <= fare && fare < fareRanges[5]) {
            row.sex == "male" ? data[4][0]++ : data[4][1]++;
        } else {
            row.sex == "male" ? data[5][0]++ : data[5][1]++;
        }

    });


    console.log(data);

    let svg = d3.select("svg");
    let width = svg
        .attr("width", svgWidth)
        .attr("height", svgHeight);




    svg
        .selectAll("rect")
        .data(rows)
        .enter()
        .append("rect")
        .attr("y", (d) => svgHeight - d)
        .attr("height", (d) => d)
        .attr("width", () => barWidth - barPadding)
        .attr("transform", (d, i) => {
            let translate = [barWidth * i, 0];
            return `translate(${translate})`;
        })
        .style("fill", "steelblue");
}

d3.csv("data/titanic_clean.csv", row => jsonify(row)).then(data => {
    drawChart(data);
});