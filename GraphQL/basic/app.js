const { kMaxLength } = require('buffer');
var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');
//  定义 schema, 查询和类型
var schema = buildSchema(`
  type Account{
      name: String
      age: Int
      sex: String
      department: String
  }  

  type Query {
    hello: String
    accountName: String
    age: Int
    account: Account
  }
`);
//  定义查询对应的处理器
var root = {
    hello: () => {
        return 'Hello world!'
    },
    accountName: () => {
        return 'junxu'
    },
    age: () => {
         18
    },
    account: () => {
        return {
            name: 'Junxu',
            age: 18,
            sex: "male",
            department: "IT"
        }
    }
    };
 
var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));