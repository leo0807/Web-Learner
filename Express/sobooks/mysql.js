const mysql = require("mysql");

const options = {
    user: 'root',
    host: "localhost",
    port: "3306", //optianal, the default setting is 3306
    password: "Aa416260!",
    database: "book",
    // insecureAuth : true
}
const con = mysql.createConnection(options);

con.connect((err) => {
    if (err) throw err;
    console.log("successful");
});

function sqlQuery(strSql, arr) {
    return new Promise((resolve, reject) => {
        con.query(strSql, arr, (err, results) => {
            if (err) reject(err);
            else resolve(results);
        })
    })
}
module.exports = sqlQuery;