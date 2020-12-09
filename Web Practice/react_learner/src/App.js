import React,{Component} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Todos from './components/Todos';
import Header from './components/layout/Header';
import AddTodo from './components/AddTodo';
import About from './components/pages/About';

import axios from 'axios';

class App extends Component{
  state = {
    todos:[]
  }

  componentDidMount(){
    axios.get('https://jsonplaceholder.typicode.com/todos').then(res => this.setState({todos:res.data}))
  }

  markComplete = (id) =>{
    this.setState({todos: this.state.todos.map(todo => {
      if(id === todo.id){
        todo.completed =! todo.completed
      }

      return todo;
    })})
  }

  //Delete 
  delTodo = (id) =>{
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`).then(this.setState({
      todos:[...this.state.todos.filter(todo => todo.id !== id)]
    }));
  }

  //Add
  addTodo = (title) =>{
    axios.post('https://jsonplaceholder.typicode.com/todos',{
      title,
      completed:false
    }).then(res => this.setState({todos:[...this.state.todos, res.data]}));
  }
  
  render(){
  console.log(this.state.todos)
  return (
    <Router>
      <div className="App">
        <div className="container">
          <Header />
          <Route exact path="/" render={props => (
            <React.Fragment>
              <AddTodo addTodo={this.addTodo} />
              <Todos todos={this.state.todos} markComplete={this.markComplete} delTodo ={this.delTodo} /> 
            </React.Fragment>
          )} />
          <Route path="/about" component={About} />          
        </div>
      </div>
    </Router>
  );
  }
}

export default App;
