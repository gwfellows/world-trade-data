//import Math


var mdata = JSON.parse(data)
var a = mdata['a']
var b = mdata['b']
var c = mdata['c']
var d = mdata['d']
var e = mdata['e']
var f = mdata['f']
var g = mdata['g']
var h = mdata['h']


var hs = []
for (item of h){
    hs.push(Math.sqrt(item*200)+3);
}

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
    g[i] += 0.05//h[i]
    if (g[i]>1){
        g[i] = 0 
    }
    e[i] = a[i] * (1-g[i]) + c[i] * g[i] ;
    f[i] = b[i] * (1-g[i]) + d[i] * g[i] ;
    //console.log(e[i])
   //console.log(f[i])
  }
}

function update () {
  compute();
  
  Plotly.animate('graph', {
    data: [{lon: f, lat: e,
    
    marker: {
        size: hs,
        opacity: 0.5,
        line: 0
    }
    
    }],
    layout: {
        margin: {t:50, b:0, l:0, r:0},
        autosize: true,
    }
  }, {
    transition: {
      duration: 0,
      easing: 'cubic-in-out'
    },
    frame: {
      duration: 0,
      redraw: true,
    }
  });
  
  requestAnimationFrame(update);
}

requestAnimationFrame(update);