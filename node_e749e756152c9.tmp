var express = require('express');
var cors = require('cors');
var filereader = require('./filereader');

var app = express();

app.use(express.static('public'));
app.use(cors());

app.use(express.json());
app.use(express.urlencoded());

function calc_random(range) {
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
}
app.post('/', function (req, res) {
    var data = req.body
    data.date = Date.now()
    filereader.appendData(data);
    res.json({success:true});
});

app.get('/',function (req, res) {
    res.sendfile("index.html")
}) 

app.get('/json', function (req, res) {
    res.json(getJSON());
});

app.get('/list', function (req, res){
    var data = filereader.loadData();
    res.json(data);
})

app.listen(8080, function () {
    console.log('Example app listening on port 8080!');
});