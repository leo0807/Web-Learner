const App = require('./app.js');

const app = new App();

app.on('/', (req, res)=>{
    res.setHeader("content-type", "text/html;charset=utf-8");
    res.end("<h1> This is Home Page.</h1>");
})

app.on('/domestic', (req, res)=>{
    res.setHeader("content-type", "text/html;charset=utf-8");
    res.end("<h1> This is domestic news Page.</h1>");
})

app.run(80, ()=>{
    console.log('Server is running at port 80');
})

