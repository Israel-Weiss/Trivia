const mysql = require('mysql2');

function query(sql: string) {
    return new Promise((resolve, reject) => {
        const conDb = mysql.createConnection({
            host: "localhost",
            user: "user",
            password: "password",
            database: 'questionsProject'
        })
        conDb.connect((err: Error | null) => {
            if (err) throw err
            conDb.query(sql, (err: Error | null, result: any ) => {
                if (err) reject(err)
                resolve(result)
            })
            conDb.end()
        })
    })
}

export {
    query
}












