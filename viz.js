/*var n = 100;
var x = [], y = [], z = [];
var dt = 0.015;

for (i = 0; i < n; i++) {
  x[i] = -73//Math.random() * 2 - 1;
  y[i] = 45//Math.random() * 2 - 1;
  z[i] = 45//30 + Math.random() * 10;
}*/

partners = {
	'USA,china': {
		start: [-73, 45],
		end: [-83, 55]
	}
}

var x = [-73] //lat
var y = [45] //lon
var z = ['USA,China'] //trading partners

Plotly.plot('graph', [{
type: 'scattergeo',
  x: x,
  y: z,
  mode: 'markers',
}], {
    geo: {
        scope: 'world',
        resolution: 50,
        showrivers: true,
        rivercolor: '#fff',
        showlakes: true,
        lakecolor: '#fff',
        showland: true,
        landcolor: '#EAEAAE',
        countrycolor: '#d3d3d3',
        countrywidth: 1.5,
        subunitcolor: '#d3d3d3'
    }
  //xaxis: {range: [-40, 40]},
  //yaxis: {range: [0, 60]},
}, {showSendToCloud:true})

function compute () {
/*
  var s = 10, b = 8/3, r = 28;
  var dx, dy, dz;
  var xh, yh, zh;
  for (var i = 0; i < n; i++) {
    dx = s * (y[i] - x[i]);
    dy = x[i] * (r - z[i]) - y[i];
    dz = x[i] * y[i] - b * z[i];

    xh = x[i] + dx * dt * 0.5;
    yh = y[i] + dy * dt * 0.5;
    zh = z[i] + dz * dt * 0.5;

    dx = s * (yh - xh);
    dy = xh * (r - zh) - yh;
    dz = xh * yh - b * zh;

    x[i] += dx * dt;
    y[i] += dy * dt;
    z[i] += dz * dt;
  }*/
}

function update () {
  compute();
  
  Plotly.animate('graph', {
    data: [{lon: x, lat: y}]
  }, {
    transition: {
      duration: 0,
    },
    frame: {
      duration: 0,
      redraw: true,
    }
  });
  
  requestAnimationFrame(update);
}

requestAnimationFrame(update);