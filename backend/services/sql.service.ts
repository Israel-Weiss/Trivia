const mysql = require('mysql2');


function query(sql: string) {
    return new Promise((resolve, reject) => {
        const conDb = mysql.createConnection({
            host: "localhost",
            user: "user",
            password: "password",
            database: 'questionsProject'
        })
        conDb.connect((err: any) => {
            if (err) throw err
            conDb.query(sql, (err: any, result: any) => {
                if (err) reject(err)
                console.log('result', result)
                resolve(result)
            })
            conDb.end()
        })
    })
}

export {
    query
}












