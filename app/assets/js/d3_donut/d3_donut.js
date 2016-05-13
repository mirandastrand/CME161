var DataSet = function() {
  this.data = {
    "name": "Donut",
    "children": [{
      "id": "0001",
      "type": "donut",
      "name": "Cake",
      "ppu": 0.55,
      "children": [{
        "name": "Batters",
        "children": [{
          "id": "1001",
          "name": "Regular"
        }, {
          "id": "1002",
          "name": "Chocolate"
        }, {
          "id": "1003",
          "name": "Blueberry"
        }, {
          "id": "1004",
          "name": "Devil's Food"
        }]
      }, {
        "name": "Toppings",
        "children": [{
          "id": "5001",
          "name": "None"
        }, {
          "id": "5002",
          "name": "Glazed"
        }, {
          "id": "5005",
          "name": "Sugar"
        }, {
          "id": "5007",
          "name": "Powdered Sugar"
        }, {
          "id": "5006",
          "name": "Chocolate with Sprinkles"
        }, {
          "id": "5003",
          "name": "Chocolate"
        }, {
          "id": "5004",
          "name": "Maple"
        }]
      }]
    }, {
      "id": "0002",
      "type": "donut",
      "name": "Raised",
      "ppu": 0.55,
      "children": [{
        "name": "Batters",
        "children": [{
          "id": "1001-2",
          "name": "Regular"
        }]
      }, {
        "name": "Toppings",
        "children": [{
          "id": "5001-2",
          "name": "None"
        }, {
          "id": "5002-2",
          "name": "Glazed"
        }, {
          "id": "5005-2",
          "name": "Sugar"
        }, {
          "id": "5003-2",
          "name": "Chocolate"
        }, {
          "id": "5004-2",
          "name": "Maple"
        }]
      }]
    }, {
      "id": "0003",
      "type": "donut",
      "name": "Old Fashioned",
      "ppu": 0.55,
      "children": [{
        "name": "Batters",
        "children": [{
          "id": "1001-3",
          "name": "Regular"
        }, {
          "id": "1002-3",
          "name": "Chocolate"
        }]
      }, {
        "name": "Toppings",
        "children": [{
          "id": "5001-3",
          "name": "None"
        }, {
          "id": "5002-3",
          "name": "Glazed"
        }, {
          "id": "5003-3",
          "name": "Chocolate"
        }, {
          "id": "5004-3",
          "name": "Maple"
        }]
      }]
    }, {
      "id": "0004",
      "type": "bar",
      "name": "Bar",
      "ppu": 0.75,
      "children": [{
        "name": "Batters",
        "children": [{
          "id": "1001-4",
          "name": "Regular"
        }, ]
      }, {
        "name": "Toppings",
        "children": [{
          "id": "5003-4",
          "name": "Chocolate"
        }, {
          "id": "5004-4",
          "name": "Maple"
        }]
      }, {
        "name": "Fillings",
        "children": [{
          "id": "7001-4",
          "name": "None",
          "addcost": 0
        }, {
          "id": "7002-4",
          "name": "Custard",
          "addcost": 0.25
        }, {
          "id": "7003-4",
          "name": "Whipped Cream",
          "addcost": 0.25
        }]
      }]
    }, {
      "id": "0005",
      "type": "twist",
      "name": "Twist",
      "ppu": 0.65,
      "children": [{
        "name": "Batters",
        "children": [{
          "id": "1001-5",
          "name": "Regular"
        }, ]
      }, {
        "name": "Toppings",
        "children": [{
          "id": "5002-5",
          "name": "Glazed"
        }, {
          "id": "5005-5",
          "name": "Sugar"
        }, ]
      }]
    }, {
      "id": "0006",
      "type": "filled",
      "name": "Filled",
      "ppu": 0.75,
      "children": [{
        "name": "Batters",
        "children": [{
          "id": "1001-6",
          "name": "Regular"
        }, ]
      }, {
        "name": "Toppings",
        "children": [{
          "id": "5002-6",
          "name": "Glazed"
        }, {
          "id": "5007-6",
          "name": "Powdered Sugar"
        }, {
          "id": "5003-6",
          "name": "Chocolate"
        }, {
          "id": "5004-6",
          "name": "Maple"
        }]
      }, {
        "name": "Fillings",
        "children": [{
          "id": "7002-6",
          "name": "Custard",
          "addcost": 0
        }, {
          "id": "7003-6",
          "name": "Whipped Cream",
          "addcost": 0
        }, {
          "id": "7004-6",
          "name": "Strawberry Jelly",
          "addcost": 0
        }, {
          "id": "7005-6",
          "name": "Rasberry Jelly",
          "addcost": 0
        }]
      }]
    }]
  }
}

var data_min = (new DataSet()).data;

var height = 740,
  width = 1100;

var svg = d3
  .select("#hierarchy")
  .append("svg")
  .attr("height", height)
  .attr("width", width)
  .append("g")
  .attr("transform", "translate(50,0)");

var tree = d3
  .layout
  .tree()
  .size([height, width - 200]);
  
var diagonal = d3
	.svg
  .diagonal()
	.projection(function(d) { return [d.y, d.x]; });


function findAddedCost(source) {
	if (source.addcost > 0) {
    return true;
  } else if (source.children || source._children) {
    var c = source.children ? source.children : source._children;
    for (var i = 0; i < c.length; i++) {
      if (findAddedCost(c[i])) {
        return true;
      }
    }
  }
  return false;
}

var linkFilter = function(d) {
  return findAddedCost(d.target)
}

data_min.x0 = height / 2;
data_min.y0 = 0;

var i = 0;
var duration = 750;

update(data_min);

function update(source) {

  var nodes = tree.nodes(data_min);
  var links = tree.links(nodes);

  var node = svg.selectAll("g.node")
    .data(nodes, function(d) {
      return d.id || (d.id = ++i);
    });

  var nodeEnter = node
  .enter()
  .append("g")
    .attr("class", "node")
    .attr("transform", function(d) {
      return "translate(" + source.y0 + "," + source.x0 + ")";
    })
    .on("click", click);

  nodeEnter.append("circle")
    .attr("r", function(d) {
      return d._children ? 9 : 7;
    })
    .style("stroke", function(d) {
    	return d._children ? "brown" : "chocolate";
    })
    .style("stroke-width", function(d) {
      return d._children ? 8 : 6;
    });

  nodeEnter.append("text")
    .attr("x", function(d) {
      return d.children || d._children ? -13 : 13;
    })
    .attr("dy", ".35em")
    .attr("text-anchor", function(d) {
      return d.children || d._children ? "end" : "start";
    })
    .text(function(d) {
    	var text = d.name;
      if (typeof(d.ppu) !== 'undefined') {
      	if (d.ppu <= 0.55) {
        	text += " $";
        } else {
        	text += " $$";
        }
      }
      if (typeof(d.addcost) !== 'undefined') {
      	if (d.addcost > 0) {
        	text += " $$$";
        }
      }
      return text;
    })
    .style("fill-opacity", 1e-6)
    .style("font", "14px arial")
    .style("fill", "brown")
    .style("stroke-width", "1px");



  var nodeUpdate = node.transition()
    .duration(duration)
    .attr("transform", function(d) {
      return "translate(" + d.y + "," + d.x + ")";
    })

	
  nodeUpdate.select("circle")
  	.filter(function(d) {
      return findAddedCost(d)
    })
    .style("fill", function(d) {
      return d._children ? "red" : "#faa";
    });
    
  nodeUpdate.select("circle")
  	.filter(function(d) {
      return !findAddedCost(d)
    })
    .style("fill", "#fff");
  nodeUpdate.select("circle")
    .attr("r", function(d) {
      return d._children ? 9 : 7;
    })
    .style("stroke", function(d) {
    	return d._children ? "brown" : "chocolate";
    })
    .style("stroke-width", function(d) {
      return d._children ? 8 : 6;
    });

  nodeUpdate.select("text")
    .style("fill-opacity", 1)
    .style("font", "12px arial")
    .style("fill", "brown")
    .style("stroke-width", ".02px");
    

  var nodeExit = node.exit().transition()
    .duration(duration)
    .attr("transform", function(d) {
      return "translate(" + source.y + "," + source.x + ")";
    })
    .remove();

  nodeExit.select("circle")
    .attr("r", 1);

  nodeExit.select("text")
    .style("fill-opacity", 1e-6);


  var link = svg.selectAll("path.link")
    .data(links, function(d) {
      return d.target.id;
    });

  link.enter().insert("path", "g")
    .attr("class", "link")
    .attr("d", function(d) {
      var o = {
        x: source.x0,
        y: source.y0
      };
      return diagonal({
        source: o,
        target: o
      });
    })
    .style("fill", "none")
    .style("stroke-width", "4px");

  link.transition()
    .duration(duration)
    .attr("d", diagonal);

  link.exit().transition()
    .duration(duration)
    .attr("d", function(d) {
      var o = {
        x: source.x,
        y: source.y
      };
      return diagonal({
        source: o,
        target: o
      });
    })
    .remove();

link.filter(linkFilter).style("stroke", "red");
link.filter(function(d){return !linkFilter(d);}).style("stroke", "pink");

  nodes.forEach(function(d) {
    d.x0 = d.x;
    d.y0 = d.y;
  });
}

function click(d) {
  if (d.children) {
    d._children = d.children;
    d.children = null;
  } else {
    d.children = d._children;
    d._children = null;
  }
  update(d);
}