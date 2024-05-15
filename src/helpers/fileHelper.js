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
    async findByEmail(fileName, userEmail){
        return new Promise ((res,rej) => {
            fs.readFile(fileName, 'utf8', (err, data) => {
            if (err) {
              console.error(err);
              rej(err)
            }
            const isExist = JSON.parse(data).find(item => item.email == userEmail)
            res(isExist)
          })
          
    })
    }
    sortByQuery(query, todosArray){
      let sortedData;
      console.log(query);
      // console.log("Started array:", todosArray);
      if (query === 'title') {
        sortedData = todosArray.sort((a, b) => a.title.localeCompare(b.title));
        console.log("Поали в title");
      } else if (query === 'isComplited') {
        console.log("Попали в булево");
        sortedData = todosArray.sort((a, b) => b.isActive - a.isActive);
      } else {
        sortedData = todosArray;
      }
    // console.log("Sorted array", sortedData);
     return sortedData 
    }
}




module.exports = new fileHelper()