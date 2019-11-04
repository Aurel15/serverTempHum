var fs = require('fs')

function appendData (data) {
    fs.appendFile('log.txt', JSON.stringify(data)+'\n', function (err) {
        if (err) {
            console.log('save failed')
        } else {
            //append successful
        }
    });
}

function loadData ()  {
    var storage = {dates: []}
    data = fs.readFileSync('log.txt', 'utf8')
    for (element of data.split('\n')){
        if (element) {
            storage.dates.push(JSON.parse(element));
        }
    }
    return storage;
}


module.exports.appendData = appendData;
module.exports.loadData = loadData;