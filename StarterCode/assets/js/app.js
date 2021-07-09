//Set height and width
var width = parseFloat(d3.select('#scatter').style('width'));
var height = .66*width;

//Select html ID and set boundries
var svg = d3
    .select('#scatter')
    .append('svg')
    .style('width',width)
    .style('height',height);

// X axis label
xText = svg.append('g').attr('transform',`translate(${width/2},${.85*height})`);
xText.append('text').text('In Poverty (%)').attr('class','active');

// Y axis label
yText = svg
.append('g')
.attr('transform',`translate(${.1*width},${height/2})rotate(-90)`);
yText.append('text').text('Lacks Healthcare (%)').attr('class','active');

// Reading in data, and defining
d3.csv('assets/data/data.csv').then(data =>{
    var poverty = data.map(data=>+data.poverty);
    var healthcare = data.map(data=>+data.healthcare);
    var abbr = data.map(data=>data.abbr);
    var margin = 20;
    var labelArea = 110;

    // X scale
    var x = d3.scaleLinear()
    .domain([d3.min(poverty)-1,d3.max(poverty)+1])
    .range([ margin + labelArea, width - margin]);
    
    // X axis
    svg.append('g')
        .call(d3.axisBottom(x))
        .attr('class','xAxis')
        .attr('transform','translate(0,'+(height-margin-labelArea)+')');
    
    // Y Scale
    var y = d3.scaleLinear()
        .domain([d3.min(healthcare)-1,d3.max(healthcare)+1])
        .range([ height-margin-labelArea, margin]);
        
    // Y axis
    svg.append('g')
        .attr('class','yAxis')
        .attr('transform','translate('+(margin+labelArea)+',0)')
        .call(d3.axisLeft(y));
    
    // Add dots for scatter
    svg.selectAll(".dot")
        .data(data)
        .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 12)
        .attr("cx", function (d) { return x(d.poverty); } )
        .attr("cy", function (d) { return y(d.healthcare); } )
        .style("fill", "#81b3ff");

    // Add text to dots
    svg.selectAll(".text")
        .data(data)
        .enter()
        .append("text")
        .attr("x", function (d) { return x(d.poverty); } )
        .attr("y", function (d) { return y(d.healthcare)+4; } )
        .text(function (d) { return (d.abbr); } )
        .style("fill", "#FFFFFF")
        .attr("font-size", 10)
        .attr('class','active')
});

