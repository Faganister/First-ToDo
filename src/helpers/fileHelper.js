const fs = require("fs")
class fileHelper{
    readFile(fileName){
        return new Promise ((res,rej) => {
            fs.readFile(fileName, 'utf8', (err, data) => {
            if (err) {
              console.error(err);
              rej(err)
            }
            res(JSON.parse(data))
          })
    })
}
    writeFile(fileName, data){
        return new Promise ((res,rej) =>{
                fs.writeFile(fileName, JSON.stringify(data), (err)=>{
                    if(err){
                        console.error(err)
                        rej(err)
                    }
                    res("Success")
                })
              })
        }
}




module.exports = new fileHelper()