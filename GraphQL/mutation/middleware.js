const { kMaxLength } = require('buffer');
var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');
//  定义 schema, 查询和类型
var schema = buildSchema(`
  input AccountInput{
    name: String
    age: Int
    sex: String
    department: String 
  }
  type Account{
    input: String
    age: Int
    sex: String
    department: String 
  }
  type Mutation{
    createAccount(input: AccountInput): Account
    updateAccount(id: ID!, input: AccountInput): Account
  }
  type Query{
    accounts: [Account]
  }
`);
const fakeDb = {};
//  定义查询对应的处理器
var root = {
  accounts() {
    let arr = [];
    for (let key in fakeDb) {
      arr.push(fakeDb[key])
    }
    return arr;
  },
  createAccount({ input }) {
    // 相当于数据库的保存
    fakeDb[input.name] = input;
    return fakeDb[input.name];
  },
  updateAccount({ id, input }) {
    // 相当于数据库的更新
    const updatedAccount = Object.assign({}, fakeDb[input.name] = input);
    fakeDb[id] = updateAccount;
    return updatedAccount;
  },
};

const middleware = () => (req, res, next){
  if (req.url.indeOf('/graphql') && req.headers.cookie.indeOf('auth')) {
    res.send(JSON.stringify({
      error: "Authentication required"
    }))
    return;
  }
  next();
}

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,//调试模式
}));

// 公开文件夹，供用户访问静态资源
app.use(express.static('public/index.html'));

app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));