partners = {
	'USA,china': [ 
		[-103, 44],  //source
		 [116, 39] //dest
	]
}

var x = [44] //lat
var y = [103] //lon
var z = ['USA,china'] //trading partners
var k = [0] // 0-1, for cycles

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
    k[i]+=0.1
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