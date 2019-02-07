//The first async I/O
var fs = require('fs')
function output(filePath) {
    fs.readFile(filePath, (err, data) => {
        if (err) console.log("Error occured during file reading", err)
        console.log(data.toString().split("\n").length - 1)
    })
}
output(process.argv[2])

//Filtered LS
var fs = require('fs')
var path = require('path')
function output(dirPath, extName) {
    fs.readdir(dirPath, (err, fileNames) => {
        if (err) console.log(err)
        for (var i = 0; i < fileNames.length; i++) {
            if (path.extname(fileNames[i]).split(".")[1] == extName) console.log(fileNames[i])
        }
    })
}
output(process.argv[2], process.argv[3])

//Module understanding
var mymodule = require("./mymodule")
mymodule(process.argv[2], process.argv[3], (err, data) => {
    if (err) console.log(err)
    for (x in data) console.log(data[x])
})

//HTTP Client
var http = require('http')
http.get(process.argv[2], function (response) {
    response.setEncoding('utf8')
    response.on('data', function (data) {
        console.log(data)
    })
    response.on('error', console.error)
}).on('error', console.error)

//HTTP Collect
//approach 1 
var http = require('http')
var ans = ''
var getAns = function (callback) {
    http.get(process.argv[2], function (response) {
        response.setEncoding('utf8')
        response.on('data', function (data) {
            ans += data
        })
        response.on('end', () => {
            return callback()
        })
    })
}
getAns(() => {
    console.log(ans.length)
    console.log(ans)
})

// approach 2
var http = require('http')
var bl = require('bl')
http.get(process.argv[2], function (response) {
    response.pipe(bl(function (err, data) {
        if (err) return console.error(err)
        data = data.toString()
        console.log(data.length)
        console.log(data)
    }))
})

// Juggling async
var http = require('http')
var bl = require('bl')
var urls = []
var ans = []
var cnt = 0
function getResponse(idx) {
    http.get(urls[idx], function (response) {
        response.pipe(bl(function (err, data) {
            if (err) console.log(err)
            data = data.toString()
            ans[idx] = data
            cnt++
            if (cnt == 3) ans.forEach(function (resp) { console.log(resp) })
        }))
    })
}
for (var i = 2; i < process.argv.length; i++) {
    urls.push(process.argv[i])
}

for (var i = 0; i < 3; i++) getResponse(i)

// Time server
var net = require('net')

function addZero(val) {
    return val < 10 ? "0" + val : val
}

var server = net.createServer(function (socket) {
    var date = new Date()
    var dateString = date.getFullYear() + "-" + addZero(date.getMonth() + 1) + "-" + addZero(date.getDate()) + " " + addZero(date.getHours()) + ":" + addZero(date.getMinutes()) + "\n"
    socket.write(dateString)
    socket.end()
})


server.listen(Number(process.argv[2]))

// HTTP file server 
var http = require('http')
var fs = require('fs')
var port = Number(process.argv[2])
var fileLocation = process.argv[3]
var server = http.createServer(function (req, res) {
    fs.createReadStream(fileLocation).pipe(res)
})
server.listen(port)

// Http upper case 
var http = require('http')
var map = require('through2-map')
var server = http.createServer(function (request, response) {
    if (request.method == "POST") {
        request.pipe(map(function (chunk) {
            return chunk.toString().toUpperCase()
        })).pipe(response)
    }
    else response.writeHead(405)
})
server.listen(Number(process.argv[2]))

// Http json server 
var http = require('http')
var url = require('url')

function unixTime(time) {
    return { "unixtime": time.getTime() }
}

function parseTime(time) {
    return {
        "hour": time.getHours(),
        "minute": time.getMinutes(),
        "second": time.getSeconds()
    }
}

var server = http.createServer((request, response) => {
    if (request.method == "GET") {
        response.writeHead(200, { 'Content-Type': 'application/json' })
        url = url.parse(request.url, true)
        if (url.pathname == "/api/parsetime") {
            response.end(JSON.stringify(parseTime(new Date(url.query.iso))))
        }
        else if (url.pathname == "/api/unixtime") {
            response.end(JSON.stringify(unixTime(new Date(url.query.iso))))
        }
        else {
            response.writeHead(404)
        }
    }
    else response.writeHead(405)
})
server.listen(Number(process.argv[2]))