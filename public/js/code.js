var data = []
var data2 = []
var TICKINTERVAL = 4600 // in ms
let XAXISRANGE = TICKINTERVAL * 24 // Anzahl Messwerte

function loadInitialData() {
    xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/json", false);
    xhttp.send();
    var res = JSON.parse(xhttp.responseText);
    res.forEach(val => {
        data.push({
            x: val.date,
            y: val.temp
        })
        data2.push({
            x: val.date,
            y: val.hum
        })
    })
}
loadInitialData()


function getNewSeries(res) {
    if (data[data.length - 1].x != res.date) {
        for(var i = 0; i< data.length - 1 - (XAXISRANGE / TICKINTERVAL); i++) {
            // IMPORTANT
            // we reset the x and y of the data which is out of drawing area
            // to prevent memory leaks
            data[i].x = res.date - XAXISRANGE - TICKINTERVAL
            data[i].y = 0
            data2[i].x = res.date - XAXISRANGE - TICKINTERVAL
            data2[i].y = 0
        }
        
        data.push({
            x: res.date,
            y: res.temp
        })
        data2.push({
            x: res.date,
            y: res.hum
        })

        chart.updateSeries([
            {
                data: data
            },
            {
                data: data2
            }
        ])
    }
}

function resetData(){
    // Alternatively, you can also reset the data at certain intervals to prevent creating a huge series 
    data = data.slice(data.length - 10, data.length);
    data2 = data2.slice(data2,length - 10, data2.length);
}

var options = {
    chart: {
        height: 350,
        type: 'area',
        animations: {
            enabled: true,
            easing: 'linear',
            dynamicAnimation: {
                speed: 1000
            }
        },
        toolbar: {
            show: false
        },
        zoom: {
            enabled: false
        }
    },
    
    dataLabels: {
        enabled: false
    },
    stroke: {
        curve: 'smooth'
    },
    series: [
        {
            data: data
        },
        {
            data: data2
        }        
    ],
    title: {
        text: '"grün:%, blau:°C" ... Tagesdiagramm für teperatur .',
        align: 'center'
    },
    markers: {
        size: 0
    },
    xaxis: {
        type: 'datetime',
        range: XAXISRANGE,
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
        }
    ],
    legend: {
        show: false
    }
}

var chart = new ApexCharts(
    document.querySelector("#chart"),
    options
);

chart.render();

window.setInterval(function () {
    
    xhttp = new XMLHttpRequest();
    //xhttp.open("GET", "http://localhost:8080/json", false);
    xhttp.open("GET", "/lastjson", false);
    xhttp.send();
    var res = JSON.parse(xhttp.responseText);
    
    document.querySelector("#temperature").innerHTML = res.temp
    document.querySelector("#humidity").innerHTML = res.hum

    getNewSeries(res); // update Diagram
}, TICKINTERVAL)

