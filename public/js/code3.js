var tdata = []
var hdata = []

var options = {
    chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: false
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      width: [5, 7, 5],
      curve: 'straight',
      dashArray: [0, 8, 5]
    },
    series: [{
        name: "Temperatur",
        data: tdata //"#temperature"
      },
      {
        name: "Feuchtigkeit",
        data: hdata //"#humidity"
      },
      
    ],
    title: {
      text: '',
      align: 'left'
    },
    legend: {
      tooltipHoverFormatter: function(val, opts) {
        return val + ' - ' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + ''
      }
    },
    markers: {
      size: 6,
    
      hover: {
        sizeOffset: 6
      }
    },
    xaxis: {
      categories: [
        {
          max: 30,
          min: 0,
        }
      ],
      type: 'datetime',
      labels: {
          format: 'HH:mm:ss'
      }
    },
      yaxis: [
        {
          max: 45,
          min: -5,
          labels:{
              formatter: function (value) {return value + "°C"}
          }
      },
      {
        opposite: true,
          max: 100,
          min:0,
          labels:{
              formatter: function (value) {return value + "%"}
          },
      },
    ],
    grid: {
      borderColor: 'black',
    }
}
  
  var chart = new ApexCharts(
    document.querySelector("#chart"),
    options
  );
  
  chart.render();
  
  window.onload = function () {
    
    xhttp = new XMLHttpRequest();
    //xhttp.open("GET", "http://localhost:8080/list", false);
    xhttp.open("GET", "/list", false);
    xhttp.send();
    var res = JSON.parse(xhttp.responseText);
    console.log(res)

    // array.forEach(val => {foo}) === array.forEach(function (val) {})
    res.forEach(val => {
      var date = new Date(val.date).getTime()
      tdata.push({
        x: date,
        y: Math.round(val.temp)
      })
      hdata.push({
          x: date,
          y: Math.round(val.hum)
      })
    });

    chart.updateSeries([
        {
            data: tdata
        },
        {
            data: hdata
        }
    ])
}