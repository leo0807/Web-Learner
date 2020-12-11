import React from 'react';
import ReactDOM from 'react-dom';
import TodoList from './TodoList';
import { Provider } from 'react-redux';
import store from './store';
// 被Provide所包裹的组件可以访问store中的state 提供器
const App = (<Provider store={store}> 
  {/* 绑定store */}
  <TodoList />
</Provider>)

ReactDOM.render(App,
  document.getElementById('root')
);

