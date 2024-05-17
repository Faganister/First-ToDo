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
      if (query === 'title') {
        sortedData = todosArray.sort((a, b) => a.title.localeCompare(b.title));
      } else if (query === 'isCompleted') {
        console.log("Попали в булево");
        sortedData = todosArray.sort((a, b) => {
          return (a.isCompleted === b.isCompleted) ? 0 : a.isCompleted ? -1 : 1;
      });
      } else {
        sortedData = todosArray;
      }
     return sortedData 
    }
}




module.exports = new fileHelper()