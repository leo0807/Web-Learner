const { kMaxLength } = require('buffer');
var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');
const mysql = require('mysql');
// 连接数据库
const pool = mysql.createPool({
  connectionLimit:10,
  host: 'localhost',
  user: 'root',
  password: 'Aa416260!',
  database: 'book'
});
//  定义 schema, 查询和类型
var schema = buildSchema(`
  input AccountInput{
    name: String
    age: Int
    sex: String
    department: String 
  }
  type Account{
    name: String
    age: Int
    sex: String
    department: String 
  }
  type Mutation{
    createAccount(input: AccountInput): Account
    updateAccount(id: ID!, input: AccountInput): Account
    deleteAccount(id: ID!): Boolean
  }
  type Query{
    accounts: [Account]
  }
`);

//  定义查询对应的处理器
var root = {
  accounts() {
    return new Promise((resolve, reject) => {
      pool.query("select name, age, sex, department from account", (err, results)=>{
        if(err){
          console.log(err);
          return;
        }
        let arr = [];
        for(let i = 0; i < results.length; i++){
          arr.push({
            name: results[i].name,
            age: results[i].age,
            sex: results[i].sex,
            department: results[i].department,
          })
        }
        resolve(arr);
      })
      })
  },
  createAccount({ input }) {
    // 相当于数据库的保存
    const data = input;
    return new Promise((resolve, reject)=>{
    pool.query("insert into account set ? where name = ?", data, (err)=>{
      if(err){
        console.log(err);
        return;
      }
      resolve(data); 
    })
  })
    },
  updateAccount({ id, input }) {
    // 相当于数据库的更新
        const data = {
      name: input.name,
      sex: input.sex,
      age: input.age,
      department: input.department
    }
    return new Promise((resolve, reject)=>{
    pool.query("update account set ? where name = ?", [data, id], (err)=>{
      if(err){
        console.log(err);
        return;
      }
      resolve(data); 
    })
  })
  },
  deleteAccount({id}){
    return new Promise((resolve, reject)=>{
    pool.query("delete from account where name = ?", [id], (err)=>{
      if(err){
        console.log(err);
        return;
      }
      resolve(true); 
    })
  })
  }
};



var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,//调试模式
}));

// 公开文件夹，供用户访问静态资源
app.use(express.static('public/index.html'));

app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));