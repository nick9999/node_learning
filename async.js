function printhello(){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve("Hello")
        },2000)
    })
}

function printWorld(){
    return new Promise((resolve, reject)=>{
        setTimeout(() => {
            resolve(" World")
        },2000)
    })
}
async function main(){
    var msg =  await printhello()
    msg += await printWorld()
    console.log("Message received", msg)
}

async function main1(){
    var [a,b] = await Promise.all([printhello(), printWorld()])
    console.log("message received", a+b)
}
main1()