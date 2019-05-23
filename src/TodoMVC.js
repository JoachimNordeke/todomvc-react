import React, { Component } from 'react';
import TodoEntry from './TodoEntry';
import TodoList from './TodoList';
import TodoAction from './TodoAction';

class TodoMVC extends Component {
  state = {
    todos: [
      {
        id: 1,
        title: 'Do something cool',
        isDone: false
      },
      {
        id: 2,
        title: 'Buy milk',
        isDone: false
      },
      {
        id: 3,
        title: 'Take out trash',
        isDone: false
      }
    ]
  };

  render() {
    return (
      <div>
        <TodoEntry todos={this.state.todos} toggleSelectAll={this.toggleSelectAll} addTodo={this.addTodo} />
        <TodoList todos={this.state.todos} deleteTodo={this.deleteTodo} isDoneSwitch={this.isDoneSwitch} />
        <TodoAction todos={this.state.todos} />
      </div>
    );
  }

  addTodo = (title) => {
    let newTodoArray = this.state.todos;
    newTodoArray.push({id: 1, title: title, isDone: false });
   this.setState({ todos: newTodoArray });
  }
  deleteTodo = (id) => {
    this.setState({ todos: [...this.state.todos.filter(todo => todo.id !== id)] });
  }
  toggleSelectAll = () => {
    alert('toggleSelectAll called')
  }
  isDoneSwitch = (id) => {
    this.setState({ todos: this.state.todos.map(todo => {
      if (todo.id === id){
        todo.isDone = !todo.isDone
      }
      return todo;
    }) });
  }
}

export default TodoMVC;