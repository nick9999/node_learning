var fs = require('fs')
var path = require('path')
var ans = []
module.exports = function (dirPath, extName, callback){
    fs.readdir(dirPath, (err,fileNames) =>{
        if(err) return callback(err)
        for(var i=0;i<fileNames.length;i++){
            if(path.extname(fileNames[i]).split(".")[1]==extName) ans.push(fileNames[i])
        }
        return callback(null, ans)
    })
}
