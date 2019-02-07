var request = require('request')
var userDetails
function getData(url) {
    var options = {
        url: url,
        headers: {
            "User-Agent": 'request'
        }
    }
    return new Promise(function (resolve, reject) {
        request.get(options, (err, resp, body) => {
            if (err) reject(err)
            else resolve(body)
        })
    })
}

function errHandler(err) {
    console.log(err)
}

function main() {
    var url = 'https://api.github.com/users/narenaryan'
    var dataPromise = getData(url)
    dataPromise.then(JSON.parse, errHandler).then(function (result) {
        var secondPromise = getData(result.followers_url).then(JSON.parse, errHandler)
        return secondPromise
    }, errHandler).then((data) => { console.log("Follower data", data.slice(0,3)) }, errHandler)
}

main()