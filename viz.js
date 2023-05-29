partners = {
	'USA,china': [ 
		[-103, 44],  //source
		 [116, 39] //dest
	],
	'USA,china2': [ 
		[-103, 44-10],  //source
		 [116, 39-10] //dest
	]
}

var x = [44, 44] //lat
var y = [103, 103] //lon
var z = ['USA,china', 'USA,china2'] //trading partners
var k = [0, 0] // 0-1, for cycles
var s = [0.1, 0.2] //step

/*
need to make table
source_lat
source_lon
dest_lat
dest_lon
current_lat      starts at source lat
current_lon     starts at source_lon
k_factor          starts at 0
step                proportional to trade volume
*/

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

}, {showSendToCloud:true})

function compute () {

  for (var i = 0; i < x.length; i++) {
    k[i]+=s[i]
    if (k[i]>1){
        k[i] = 0 
    }
    x[i] = partners[z[i]][1][0] * k[i] + partners[z[i]][0][0] * (1-k[i]) ;
    y[i] = partners[z[i]][1][1] * k[i] + partners[z[i]][0][1] * (1-k[i]) ;
  }
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