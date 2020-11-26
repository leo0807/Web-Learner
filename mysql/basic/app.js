const { log } = require("console");
const mysql = require("mysql");
// Set the configuration
const options = {
    host: "localhost",
    port: "3306", //optianal, the default setting is 3306
    password: "Aa416260!",
    database: "MyDatabase"
}
// Create Connection Object
const con = mysql.createConnection(options);
// Begin to connect
con.connect((err) => {
    // if the connection is failed
    if (err) {
        console.log("The connection is failed");
    } else {
        console.log("success");
    }
})

// Execute the database query

// Create TABLE 'user'
const createSql = `
    CREATE TABLE 'user'(
        'id' int NOT NULL AUTO_INCREMENT,
        'username' varchar(255) NULL,
        'password' varchar(255) NULL,
        'mail' varchar(255) NULL,
        PRIMARY KEY ('id')
    )
`;
con.query(deleteSql, (err, results) => {
    
});


const strSql = "select * from user";
con.query(strSql, (err, results, fields) => {
    
});
// delete table
const deleteSql = "drop table from user";
con.query(deleteSql, (err, results) => {
    
});
// delete database
const databaseDelete = "drop databse MyDatabase";
con.query(databaseDelete, (err, results) => {
    
});
// Create Database
const strSql4 = "create database mall";
con.query(strSql4, (err, results) => {
    
});

// Insert data
// ID can be ignored
const insertSql = "insert into user (id, username, password, mail) values(1, leo0807, 123456, 123@456.com)";
con.query(insertSql, (err, results) => {
    
});