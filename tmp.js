const sqlite3 = require('sqlite3');
const db =  new sqlite3.Database("./myDb.db", (err)=>{
    if(err != null) {console.log(err)}
});

function getAll(db){
    let arr = [];
    db.all("SELECT * FROM FOO", [], (err, rows) => {
        if(err != null) {
            console.log(err)
        }
        else{
            rows.forEach((row)=>{
                arr.push(row)
            })
        }
    });
    return arr;
}
