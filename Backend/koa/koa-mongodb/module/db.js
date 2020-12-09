const MongoClient = require('mongodb').MongoClient;
const Config = require('./config');
const ObjectID = require('mongodb').ObjectID;

class DB{

    // 实现单例模式
    // 解决实例不共享的问题
    static getInstance() {
        if (!DB.instance) {
            DB.instance = new DB();
        }
        return DB.instance;
    }
    constructor() {
        this.dbCLient = ''; //存放db对象
        this.connect();//初始化时候连接数据库
    }
    connect() {
        return new Promise( (resolve, reject) =>{
            if (!this.dbCLient) {
                MongoClient.connect(Config.url, { useUnifiedTopology: true }, (err, client)=>{
                    if (err) {
                        reject(db);
                    } else {
                        const db = client.db(Config.dbName);//数据库对象
                        this.dbCLient = db;
                        resolve(this.dbCLient);
                    }
                })
            } else {
                resolve(this.dbCLient)
            }
        })

    }
    find(collectionName, json) {
        return new Promise( (resolve, reject)=>{
            this.connect().then(function (db) {
                const result = db.collection(collectionName).find(json);
                result.toArray(function (err, docs) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(docs);
                    }
                })
            })
        })
    }
    insert(collectionName, json) {
        return new Promise((resolve, reject) => {
            this.connect().then((db) => {
                db.collection(collectionName).insertOne(json, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                })
            })
        })
    }
    update(collectionName, json1, json2) {
        return new Promise((resolve, reject) => {
            this.connect().then((db) => {
                db.collection(collectionName).updateOne(json1, { $set: json2 }, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                })
            })
        })
    }
    remove(collectionName, json) {
        return new Promise((resolve, reject) => {
            this.connect().then((db) => {
                db.collection(collectionName).removeOne(json, (err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                    })
                })
            })
    }
    getObjectID(id) {
        return new ObjectID(id);
    }
}
// const myDb = DB.getInstance();
// myDb.find('user', {}).then(function (data) {
//     console.log(data);
// })
module.exports = DB.getInstance();