/* 

API returns entire iris dataset
http://tranquil-peak-82564.herokuapp.com/api/v1.0/data/iris/

API returns n=10 entries from dataset, useful for debugging
http://tranquil-peak-82564.herokuapp.com/api/v1.0/data/iris/limit/10/

data is in this format
{"sepal_length":5.1,"sepal_width":3.5,"petal_length":1.4,"petal_width":0.2,"species":"setosa"}

*/

// on load data {

	// crossfilter
  
  // dimensions for sepal_length, sepal_width, petal_length, petal_width, species
  
  // unique values for species (hint: underscore.js)

	// bar charts for sepal_length, sepal_width, petal_length, petal_width, species 

	// render
  
// } end load data


d3.json("https://tranquil-peak-82564.herokuapp.com/api/v1.0/data/iris/", function(remote_json){
	
  window.remote_json = remote_json;
  
  // crossfilter
  var cf            = crossfilter(remote_json);
  
  // dimension
  // round to the nearest .5
  var sepal_length  = cf.dimension(function(d){return Math.round(d.sepal_length * 2)/2; }); 
  var species       = cf.dimension(function(d){return d.species; });
  
  var sepal_width   = cf.dimension(function(d){return Math.round(d.sepal_width * 2)/2;});
  var petal_length  = cf.dimension(function(d){return Math.round(d.petal_length * 2)/2;});
  var petal_width   = cf.dimension(function(d){return Math.round(d.petal_width * 2)/2;});

  
  var sepal_length_sum = sepal_length.group().reduceSum(function(d){ return d.sepal_length; });
  var species_sum      = species.group().reduceCount();
  var sepal_width_sum  = sepal_width.group().reduceSum(function(d){ return d.sepal_width; });
  var petal_length_sum = petal_length.group().reduceSum(function(d){ return d.petal_length; });
  var petal_width_sum  = petal_width.group().reduceSum(function(d){ return d.petal_width; });


  window.species_names = _.chain(remote_json).pluck("species").uniq().value();
 
 
  var sepal_length_chart = dc
    .barChart("#sepal_length_chart")
    .width(250)
    .height(200)
    .dimension(sepal_length)
    .group(sepal_length_sum)
    .centerBar(true)
    .x( d3.scale.linear().domain([3,10]) )
    .xUnits(dc.units.fp.precision(.5));
  
  var species_chart = dc
    .barChart("#species_chart")
    .width(250)
    .height(200)
    .dimension(species)
    .group(species_sum)
    .centerBar(true)
    .x(d3.scale.ordinal().domain(species_names))
    .xUnits(dc.units.ordinal)
  
   var sepal_width_chart = dc
    .barChart("#sepal_width_chart")
    .width(250)
    .height(200)
    .dimension(sepal_width)
    .group(sepal_width_sum)
    .centerBar(true)
    .x( d3.scale.linear().domain([1,5]) )
    .xUnits(dc.units.fp.precision(.5));
    
   var petal_length_chart = dc
    .barChart("#petal_length_chart")
    .width(250)
    .height(200)
    .dimension(petal_length)
    .group(petal_length_sum)
    .centerBar(true)
    .x( d3.scale.linear().domain([0, 8]) )
    .xUnits(dc.units.fp.precision(.5));
   
   var petal_width_chart = dc
    .barChart("#petal_width_chart")
    .width(250)
    .height(200)
    .dimension(petal_width)
    .group(petal_width_sum)
    .centerBar(true)
    .x( d3.scale.linear().domain([0,4]) )
    .xUnits(dc.units.fp.precision(.5));
  
  var showButton = function(){
    
    if(species_chart.filters().length > 0
    	|| sepal_length_chart.filters().length > 0
      || sepal_width_chart.filters().length > 0
      || petal_length_chart.filters().length > 0
    	|| petal_width_chart.filters().length > 0){
        
        d3.select(".btn-btn")
        	.remove();
        
        d3.select("#resetButton")
          .append("button")
          .attr("type","button")
          .attr("class","btn-btn")
          .append("div")
          .attr("class","label")
          .text(function(d) { return "Reset";})
          .on("click", function(){
              species_chart.filter(null);
              sepal_length_chart.filter(null);
              sepal_width_chart.filter(null);
              petal_length_chart.filter(null);
              petal_width_chart.filter(null);
              dc.redrawAll();
          });
        
    	} else {
        
      	d3.select(".btn-btn")
      		.remove();
    	}
	};

  species_chart.on('filtered', function(){showButton();});
  sepal_length_chart.on('filtered', function(){showButton();});
  sepal_width_chart.on('filtered', function(){showButton();});
  petal_length_chart.on('filtered', function(){showButton();});
  petal_width_chart.on('filtered', function(){showButton();});
  
  dc.renderAll();
  
});