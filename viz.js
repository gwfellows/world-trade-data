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

window.onresize = function(){ location.reload(); }

const width  = document.getElementById('outer').offsetWidth
const height = document.getElementById('outer').offsetHeight

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
        projection: {

        type: 'albers'

      },
        scope: 'world',
        resolution: 5,
        showrivers: false,
        showcountries: true,
        showlakes: false,
        showland: false,
        countrycolor: '#d3d3d3',
        countrywidth: 1.5,
        subunitcolor: '#d3d3d3'
    }

}, {showSendToCloud:true})

function compute () {

  for (var i = 0; i < a.length; i++) {
    g[i] += 0.01//h[i]
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
        margin: {t:0, b:0, l:0, r:0},
        width: width-50,
        height: height-50,
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