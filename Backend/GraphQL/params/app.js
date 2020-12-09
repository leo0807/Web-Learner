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
    salary(city: String): Int
  }
  type Query{
    getClassMates(classNo: Int!): [String]
    account(username: String): Account
  }
`);
//  定义查询对应的处理器
var root = {
  // 否则参数为arguments.classNo
  getClassMates({ classNo }) {
    const obj = {
      31: ['张三', '李四'],
      32: ['张大三', '李大四'],
    }
    return obj[classNo]
  },
  account({ username }) {
    const name = username;
    const sex = 'male';
    const age = 18;
    const department = 'IT';
    const salary = ({ city }) => {
      if (city === 'Beijing' || city === 'shanghai') {
        return 20000;
      } else {
        return 3000;
      }
    }

    return {name, sex, age, department, salary}
  }

};
 
var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,//调试模式
}));
app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));