const express = require('express');
const { build, buildSchema } = require('graphql');
const graphqlHTTP = require('express-graphql');
// 定义schema, 查询和类型
const schema = buildSchema(`
    type Query {
        hello: String
    }
`)
// 定义查询对应的处理器
const root = {
    hello: () => {
        return 'hello world';
    }
}

const app = express();

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    grahiql: true
}))

app.listen(3000, () => console.log('server is running at port 3000'));