var co2Graph = function() {
    console.log('change graph');
    d3.selectAll("body > *").remove();
    d3.select('body').append('input').attr('type','button').attr('class', 'button').attr('value', '<- Energy Consumption').on('click', function(){energyGraph()})

  // Variables
  d3.csv('narrative_visualization_data.csv', function (data) {
  var body = d3.select('body')
  var margin = { top: 50, right: 50, bottom: 50, left: 50 }
  var h = 800 - margin.top - margin.bottom
  var w = 800 - margin.left - margin.right
  var formatPercent = d3.format('')
  // Scales
  // var colorScale = d3.scale.category20()
    var myColor = d3.scale.linear().domain([
      d3.min([0,d3.min(data,function (d) { return d.co2_emissions })]),
      d3.max([0,d3.max(data,function (d) { return d.co2_emissions })])
      ]).range(["white", "red"])

  var xScale = d3.scale.linear()
    .domain([
      d3.min([0,d3.min(data,function (d) { return d.urban_pop_growth })]),
      d3.max([0,d3.max(data,function (d) { return d.urban_pop_growth })])
      ])
    .range([0,w])
  var yScale = d3.scale.linear()
    .domain([
      d3.min([0,d3.min(data,function (d) { return d.co2_emissions })]),
      d3.max([0,d3.max(data,function (d) { return d.co2_emissions })])
      ])
    .range([h,0])
  // SVG
  var svg = body.append('svg')
      .attr('height',h + margin.top + margin.bottom)
      .attr('width',w + margin.left + margin.right)
    .append('g')
      .attr('transform','translate(' + margin.left + ',' + margin.top + ')')

    svg.append("text")
        .attr("x", (w / 2))             
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")  
        .style("font-size", "16px") 
        .text("CO2 Emissions by Urban Population Growth (2014)");

    svg.append('text').attr('x', 30).attr('y', 150).style('font-size', '14px').text(function(d) { return 'Similarly to energy consumption,'});
  svg.append('text').attr('x', 30).attr('y', 175).style('font-size', '14px').text('We can see a positive correlation');
  svg.append('text').attr('x', 30).attr('y', 200).style('font-size', '14px').text('between Urban Population Growth and Carbon Dioxide Emissions');
  svg.append('text').attr('x', 30).attr('y', 225).style('font-size', '14px').text('Hover over a data point to find out more!');

  // X-axis
  var xAxis = d3.svg.axis()
    .scale(xScale)
    .tickFormat(formatPercent)
    .ticks(5)
    .orient('bottom')
  // Y-axis
  var yAxis = d3.svg.axis()
    .scale(yScale)
    .tickFormat(formatPercent)
    .ticks(5)
    .orient('left')
  // Circles
  var circles = svg.selectAll('circle')
      .data(data)
      .enter()
    .append('circle')
      .attr('cx',function (d) { return xScale(d.urban_pop_growth) })
      .attr('cy',function (d) { return yScale(d.co2_emissions) })
      .attr('r','10')
      .attr('stroke','black')
      .attr('stroke-width',1)
      .attr('fill',function (d,i) { return myColor(d.co2_emissions) })
      .on('mouseover', function () {
        d3.select(this)
          .transition()
          .duration(500)
          .attr('r',20)
          .attr('stroke-width',3)
      })
      .on('mouseout', function () {
        d3.select(this)
          .transition()
          .duration(500)
          .attr('r',10)
          .attr('stroke-width',1)
      })
    .append('title') // Tooltip
      .text(function (d) { return d.country_name +
                           '\nUrban Population Growth (annual %): ' + formatPercent(d.urban_pop_growth) +
                           '\nCO2 Emissions (metric tons per capita): ' + formatPercent(d.co2_emissions) })
// X-axis
  svg.append('g')
      .attr('class','axis')
      .attr('transform', 'translate(0,' + w + ')')
      .call(xAxis)

   .append('text') // X-axis Label
      .attr('class','label')
      .attr('y',18)
      .attr('x',w/2)
      .attr('dy','1em')
      .style('text-anchor','middle')
      .text('Urban Population Growth (annual %)')


  // Y-axis
  svg.append('g')
      .attr('class', 'axis')
      .call(yAxis)
 .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x",0 - (h / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text('CO2 emissions (metric tons per capita)');

  d3.select('body').append('input').attr('type','button').attr('class', 'button').attr('value', 'What about the effect on renewable energy? ->').on('click', function(){renewableGraph()})

  })}

  var energyGraph = function() {
    d3.selectAll("body > *").remove();

d3.csv('energy_usage_urbanization.csv', function (data) {
  // Variables
  var body = d3.select('body')
  var margin = { top: 50, right: 50, bottom: 50, left: 50 }
  var h = 800 - margin.top - margin.bottom
  var w = 800 - margin.left - margin.right
  var formatPercent = d3.format('')
  // Scales
  // var colorScale = d3.scale.category20()
    var myColor = d3.scale.linear().domain([
      d3.min([0,d3.min(data,function (d) { return d.energy_usage })]),
      d3.max([0,d3.max(data,function (d) { return d.energy_usage })])
      ]).range(["white", "blue"])
  var xScale = d3.scale.linear()
    .domain([
      d3.min([0,d3.min(data,function (d) { return d.urban_pop_growth })]),
      d3.max([0,d3.max(data,function (d) { return d.urban_pop_growth })])
      ])
    .range([0,w])
  var yScale = d3.scale.linear()
    .domain([
      d3.min([0,d3.min(data,function (d) { return d.energy_usage })]),
      d3.max([0,d3.max(data,function (d) { return d.energy_usage })])
      ])
    .range([h,0])
  // SVG
  var svg = body.append('svg')
      .attr('height',h + margin.top + margin.bottom)
      .attr('width',w + margin.left + margin.right)
    .append('g')
      .attr('transform','translate(' + margin.left + ',' + margin.top + ')')

    svg.append("text")
        .attr("x", (w / 2))             
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")  
        .style("font-size", "16px") 
        .text("Energy Consumption by Urban Population Growth (2014)");

  svg.append('text').attr('x', 400).attr('y', 500).style('font-size', '14px').text(function(d) { return 'How does urbanization impact energy usage?'});
  svg.append('text').attr('x', 370).attr('y', 525).style('font-size', '14px').text('This scatterplot of countries shows the positive correlation');
  svg.append('text').attr('x', 370).attr('y', 550).style('font-size', '14px').text('between urban population growth and energy usage per capita');
  svg.append('text').attr('x', 400).attr('y', 575).style('font-size', '14px').text('Hover over a data point to find out more!');
  // X-axis
  // X-axis
  var xAxis = d3.svg.axis()
    .scale(xScale)
    .tickFormat(formatPercent)
    .ticks(5)
    .orient('bottom')
  // Y-axis
  var yAxis = d3.svg.axis()
    .scale(yScale)
    .tickFormat(formatPercent)
    .ticks(5)
    .orient('left')
  // Circles
  var circles = svg.selectAll('circle')
      .data(data)
      .enter()
    .append('circle')
      .attr('cx',function (d) { return xScale(d.urban_pop_growth) })
      .attr('cy',function (d) { return yScale(d.energy_usage) })
      .attr('r','10')
      .attr('stroke','black')
      .attr('stroke-width',1)
      .attr('fill',function (d,i) { return myColor(d.energy_usage) })
      .on('mouseover', function () {
        d3.select(this)
          .transition()
          .duration(500)
          .attr('r',20)
          .attr('stroke-width',3)
      })
      .on('mouseout', function () {
        d3.select(this)
          .transition()
          .duration(500)
          .attr('r',10)
          .attr('stroke-width',1)
      })
    .append('title') // Tooltip
      .text(function (d) { return d.country_name +
                           '\nUrban Population Growth (annual %): ' + formatPercent(d.urban_pop_growth) +
                           '\nEnergy use (kg of oil equivalent per capita): ' + formatPercent(d.energy_usage) })
  // X-axis
  svg.append('g')
      .attr('class','axis')
      .attr('transform', 'translate(0,' + w + ')')
      .call(xAxis)

   .append('text') // X-axis Label
      .attr('class','label')
      .attr('y',18)
      .attr('x',w/2)
      .attr('dy','1em')
      .style('text-anchor','middle')
      .text('Urban Population Growth (annual %)')


  // Y-axis
  svg.append('g')
      .attr('class', 'axis')
      .call(yAxis)
 .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x",0 - (h / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Energy use (kg of oil equivalent per capita)");    

d3.select('body').append('input').attr('type','button').attr('class', 'button').attr('x',0).attr('value', 'Does this correlation also apply to CO2 Emissions? ->').on('click', function(){co2Graph()})
})
  // Variables
}

var renewableGraph = function() {
d3.csv('narrative_visualization_data.csv', function (data) {
  d3.selectAll("body > *").remove();
  // Variables
  var body = d3.select('body')
  var margin = { top: 50, right: 50, bottom: 50, left: 50 }
  var h = 800 - margin.top - margin.bottom
  var w = 800 - margin.left - margin.right
  var formatPercent = d3.format('')
  // Scales
  // var colorScale = d3.scale.category20()
   var myColor = d3.scale.linear().domain([
      d3.min([0,d3.min(data,function (d) { return d.renewable_energy_usage })]),
      d3.max([0,d3.max(data,function (d) { return d.renewable_energy_usage })])
      ]).range(["white", "green"])
  var xScale = d3.scale.linear()
    .domain([
      d3.min([0,d3.min(data,function (d) { return d.urban_pop_growth })]),
      d3.max([0,d3.max(data,function (d) { return d.urban_pop_growth })])
      ])
    .range([0,w])
  var yScale = d3.scale.linear()
    .domain([
      d3.min([0,d3.min(data,function (d) { return d.renewable_energy_usage })]),
      d3.max([0,d3.max(data,function (d) { return d.renewable_energy_usage })])
      ])
    .range([h,0])

  d3.select('body').append('input').attr('type','button').attr('class', 'button').attr('value', '<- CO2 Emissions').on('click', function(){co2Graph()})
  // SVG
  var svg = body.append('svg')
      .attr('height',h + margin.top + margin.bottom)
      .attr('width',w + margin.left + margin.right)
    .append('g')
      .attr('transform','translate(' + margin.left + ',' + margin.top + ')')

    svg.append("text")
        .attr("x", (w / 2))             
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")  
        .style("font-size", "16px") 
        .text("Renewable Energy Usage by Urban Population Growth (2014)");

  svg.append('text').attr('x', 370).attr('y', 50).style('font-size', '14px').text('On the other hand, we can see a negative correlation');
  svg.append('text').attr('x', 370).attr('y', 75).style('font-size', '14px').text('between Urban Population Growth and Renewable Energy Usage.');
  svg.append('text').attr('x', 370).attr('y', 100).style('font-size', '14px').text('Hover over a data point to find out more!');

  // X-axis
  var xAxis = d3.svg.axis()
    .scale(xScale)
    .tickFormat(formatPercent)
    .ticks(5)
    .orient('bottom')
  // Y-axis
  var yAxis = d3.svg.axis()
    .scale(yScale)
    .tickFormat(formatPercent)
    .ticks(5)
    .orient('left')
  // Circles
  var circles = svg.selectAll('circle')
      .data(data)
      .enter()
    .append('circle')
      .attr('cx',function (d) { return xScale(d.urban_pop_growth) })
      .attr('cy',function (d) { return yScale(d.renewable_energy_usage) })
      .attr('r','10')
      .attr('stroke','black')
      .attr('stroke-width',1)
      .attr('fill',function (d,i) { return myColor(d.renewable_energy_usage) })
      .on('mouseover', function () {
        d3.select(this)
          .transition()
          .duration(500)
          .attr('r',20)
          .attr('stroke-width',3)
      })
      .on('mouseout', function () {
        d3.select(this)
          .transition()
          .duration(500)
          .attr('r',10)
          .attr('stroke-width',1)
      })
    .append('title') // Tooltip
      .text(function (d) { return d.country_name +
                           '\nUrban Population Growth (annual %): ' + formatPercent(d.urban_pop_growth) +
                           '\nRenewable energy consumption (% of total final energy consumption): ' + formatPercent(d.renewable_energy_usage) })
  // X-axis
  svg.append('g')
      .attr('class','axis')
      .attr('transform', 'translate(0,' + w + ')')
      .call(xAxis)

   .append('text') // X-axis Label
      .attr('class','label')
      .attr('y',18)
      .attr('x',w/2)
      .attr('dy','1em')
      .style('text-anchor','middle')
      .text('Urban Population Growth (annual %)')


  // Y-axis
  svg.append('g')
      .attr('class', 'axis')
      .call(yAxis)
 .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x",0 - (h / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Renewable energy consumption (% of total final energy consumption)");    

})
}



d3.csv('energy_usage_urbanization.csv', function (data) {

  // Variables
  var body = d3.select('body')
  var margin = { top: 50, right: 50, bottom: 50, left: 50 }
  var h = 800 - margin.top - margin.bottom
  var w = 800 - margin.left - margin.right
  var formatPercent = d3.format('')
  // Scales
  // var colorScale = d3.scale.category20()
  var myColor = d3.scale.linear().domain([
      d3.min([0,d3.min(data,function (d) { return d.energy_usage })]),
      d3.max([0,d3.max(data,function (d) { return d.energy_usage })])
      ]).range(["white", "blue"])
  var xScale = d3.scale.linear()
    .domain([
      d3.min([0,d3.min(data,function (d) { return d.urban_pop_growth })]),
      d3.max([0,d3.max(data,function (d) { return d.urban_pop_growth })])
      ])
    .range([0,w])
  var yScale = d3.scale.linear()
    .domain([
      d3.min([0,d3.min(data,function (d) { return d.energy_usage })]),
      d3.max([0,d3.max(data,function (d) { return d.energy_usage })])
      ])
    .range([h, 0])
  // SVG
  var svg = body.append('svg')
      .attr('height',h + margin.top + margin.bottom)
      .attr('width',w + margin.left + margin.right)
    .append('g')
      .attr('transform','translate(' + margin.left + ',' + margin.top + ')')

  svg.append("text")
        .attr("x", (w / 2))             
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")  
        .style("font-size", "16px") 
        .text("Energy Consumption by Urban Population Growth (2014)");

  svg.append('text').attr('x', 400).attr('y', 500).style('font-size', '14px').text(function(d) { return 'How does urbanization impact energy usage?'});
  svg.append('text').attr('x', 370).attr('y', 525).style('font-size', '14px').text('This scatterplot of countries shows the positive correlation');
  svg.append('text').attr('x', 370).attr('y', 550).style('font-size', '14px').text('between urban population growth and energy usage per capita');
  svg.append('text').attr('x', 400).attr('y', 575).style('font-size', '14px').text('Hover over a data point to find out more!');
  // X-axis
  var xAxis = d3.svg.axis()
    .scale(xScale)
    .tickFormat(formatPercent)
    .ticks(5)
    .orient('bottom')
  // Y-axis
  var yAxis = d3.svg.axis()
    .scale(yScale)
    .tickFormat(formatPercent)
    .ticks(5)
    .orient('left')
  // Circles
  var circles = svg.selectAll('circle')
      .data(data)
      .enter()
    .append('circle')
      .attr('cx',function (d) { return xScale(d.urban_pop_growth) })
      .attr('cy',function (d) { return yScale(d.energy_usage) })
      .attr('r','10')
      .attr('stroke','black')
      .attr('stroke-width',1)
      .attr('fill',function (d,i) { return myColor(d.energy_usage) })
      .on('mouseover', function () {
        d3.select(this)
          .transition()
          .duration(500)
          .attr('r',20)
          .attr('stroke-width',3)
      })
      .on('mouseout', function () {
        d3.select(this)
          .transition()
          .duration(500)
          .attr('r',10)
          .attr('stroke-width',1)
      })
    .append('title') // Tooltip
      .text(function (d) { return d.country_name +
                           '\nUrban Population Growth (annual %): ' + formatPercent(d.urban_pop_growth) +
                           '\nEnergy use (kg of oil equivalent per capita: ' + formatPercent(d.energy_usage) })
  // X-axis
  svg.append('g')
      .attr('class','axis')
      .attr('transform', 'translate(0,' + w + ')')
      .call(xAxis)

   .append('text') // X-axis Label
      .attr('class','label')
      .attr('y',18)
      .attr('x',w/2)
      .attr('dy','1em')
      .style('text-anchor','middle')
      .text('Urban Population Growth (annual %)')


  // Y-axis
  svg.append('g')
      .attr('class', 'axis')
      .call(yAxis)
 .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x",0 - (h / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Energy use (kg of oil equivalent per capita)");   

d3.select('body').append('input').attr('type','button').attr('class', 'button').attr('x',0).attr('value', 'Does this correlation also apply to CO2 Emissions? ->').on('click', function(){co2Graph()})
// d3.select('body').append('text').text('Does this correlation also apply to Carbon Dioxide output?'); 
})