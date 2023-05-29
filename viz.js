
var a = [44, 44]
var b = [-103, -104]
var c = [54, 44]
var d = [123, 123]
var e = [44, 11]
var f = [103, 104]
var g = [0, 0]
var h = [0.01, 0.02]

Plotly.plot('graph', [{
type: 'scattergeo',
  x: e,
  y: f,
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

  for (var i = 0; i < a.length; i++) {
    g[i] += h[i]
    if (g[i]>1){
        g[i] = 0 
    }
    e[i] = a[i] * g[i] + c[i] * (1-g[i]) ;
    f[i] = b[i] * g[i] + d[i] * (1-g[i]) ;
    //console.log(e[i])
   //console.log(f[i])
  }
}

function update () {
  compute();
  
  Plotly.animate('graph', {
    data: [{lon: f, lat: e}]
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