var request = require('request')
var userDetails
function initialize() {
    var options = {
        url: 'https://api.github.com/users/narenaryan',
        headers: {
            "User-Agent": 'request'
        }
    }
    return new Promise(function (resolve, reject) {
        request.get(options, (err, resp, body) => {
            if (err) reject(err)
            else resolve(JSON.parse(body))
        })
    })
}

function main() {
    var initializePromise = initialize()
    initializePromise.then(function (result) {
        userDetails = result
        console.log("Got user details", userDetails)
    }, function (err) {
        console.log(err)
    })
}

main()