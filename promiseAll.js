var message = ""

var promise1 = new Promise((resolve, reject)=>{
    setTimeout(() =>{
        message += " my"
        resolve(message)
    },2000)
})

var promise2 = new Promise((resolve, reject) =>{
    setTimeout(() => {
        message += " first"
        resolve(message)
    },2000)
})

var promise3 = new Promise((resolve, reject) => {
    setTimeout(()=>{
        message += " promise all"
        resolve(message)
    }, 2000)
})

function printResult(results){
    console.log("Results: ", results, "Message: ", message)
}

function main(){
    Promise.all([promise1, promise2, promise3]).then(printResult)
    Promise.all([promise2, promise1, promise3]).then(printResult)
    Promise.all([promise3, promise2, promise1]).then(printResult)
    console.log("\"\"" + message)
}

main()