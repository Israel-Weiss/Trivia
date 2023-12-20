const mysql = require('mysql2');


// createDb('questionsProject')
async function createDb(dbName) {
    const con = await mysql.createConnection({
        host: "localhost",
        user: "user",
        password: "password"
    })
    con.connect(async (err) => {
        if (err) throw err
        console.log("Connected sql!")
        await con.execute(`CREATE DATABASE ${dbName}`)
        console.log('Database created')


        con.end((err) => {
            if (err) throw err
            console.log('end connect');
        })
    })
}
const sqlTable = 'CREATE TABLE questions(id INT PRIMARY KEY AUTO_INCREMENT, type VARCHAR(99) NOT NULL, quest VARCHAR(255) NOT NULL, answers JSON NOT NULL, correct VARCHAR(255))'
createTable(sqlTable)
function createTable(sql) {
    const conDb = mysql.createConnection({
        host: "localhost",
        user: "user",
        password: "password",
        database: "questionsProject"
    })
    conDb.connect((err) => {
        if (err) throw err
        console.log('Connected', 'questionsProject')
        conDb.query(sql, (err, resoult) => {
            if (err) throw err
            console.log('Table created')
        })
        conDb.end()
    })
}



