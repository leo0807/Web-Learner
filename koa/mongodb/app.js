const MongoClient = require('mongodb').MongoClient;
// 定义数据库链接地址以及数据库名称
const url = 'mongodb://localhost:27017';
const dbName = 'koad';
// nodejs链接数据库

MongoClient.connect(url, function (err, client) {
    const db = client.db(dbName);//数据库对象
    console.log('Successfully connected');
    db.collection('user').insertOne({ 'username': 'junxu', 'age': 23, 'sex': 'male', 'status': 1 },
        function (err, result) {
            if (!err) {
                console.log('successfully insert');
            }
        })
    // 查询数据
    const result = db.collection('user').find({});
    result.toArray((err, docs) => {
        console.timeEnd('start');
        console.log(docs);
    })
    client.close();//关闭链接
})