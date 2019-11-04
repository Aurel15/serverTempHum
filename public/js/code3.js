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
      categories: ['01', '02', '03', '04', '05', '06', '07', '08', '09',
        '10', '11', '12','13','14','15','16','17','18','19','20','21',
        '22','23','24','25','26','27','28','29','30'
      ],
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
    xhttp.open("GET", "http://localhost:8080/list", false);
    xhttp.send();
    var res = JSON.parse(xhttp.responseText);
    
    // array.forEach(val => {foo}) === array.forEach(function (val) {})
    res.dates.forEach(val => {
      tdata.push({
        x: val.time,
        y: val.temp
      })
      hdata.push({
          x: val.time,
          y: val.hum
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