var express = require('express');
var cors = require('cors');
var filereader = require('./filereader');
var moment = require('moment');

var app = express();

app.use(express.static('public'));
app.use(cors());

app.use(express.json());
app.use(express.urlencoded());

/*function calc_random(range) {
return Math.floor(Math.random() * (range.max + - range.min + 1)) + range.min
}

function getJSON(date = Date.now()) { 
    var trange = {
        min: 10,
        max: 35
    }
    var hrange = {
        min: 50,
        max: 90
    }                    
    var newTemp = calc_random(trange)
    var newHum = calc_random(hrange)
    return {
        "time": date,   
        "temp": newTemp, //in °C
        "hum" : newHum, //in %
    };
}*/

app.post('/', function (req, res) {
    var data = req.body
        data.date = Date.now()
        filereader.appendData(data);
        res.json({success:true});
}); 

app.get('/',function (req, res) {
    res.sendfile("index.html")
}) 

app.get('/index3.html',function (req, res) {
    res.sendfile("index3.html")
})

app.get('/json', function (req, res) {
    vals = filereader.loadData().dates
    res.json(vals.slice(-24)); //letzte 24 Messwerte
});

app.get('/lastjson', function (req, res) {
    vals = filereader.loadData().dates
    res.json(vals.pop()); //den letzten Messwert
});

app.get('/list', function (req, res){
    var data = filereader.loadData();

    function redList (newList, item) {
        const cropDate = (d) => {
            return moment(d).format('YYYY-MM-DD')
        }
        var date = cropDate(item.date)
        var dateItem = newList.find((findItem) => {
            return cropDate(findItem.date) === date;
        })
        if (dateItem == null) {
            dateItem = { 
                date:date,
                tempSum:0,
                humSum:0,
                count:0
            }
            newList.push(dateItem);
        }
        dateItem.tempSum += item.temp
        dateItem.humSum += item.hum
        dateItem.count++
        return newList
    }
    
    var filteredData = data.dates.reduce(redList, new Array())

    var mappedfilteredDate = filteredData.map(x => {
        return {
            temp: x.tempSum / x.count,
            hum: x.humSum / x.count,
            date: x.date
        }
    });
    
    
    res.json(mappedfilteredDate);
})

//mappedfilteredDate
app.listen(8080, function () {
    console.log('Example app listening on port 8080!');
});



[1,2,3,4,5,6,7].reduce((total, val) => {return total + val}, 0)