import React, { Component } from "react";
import TodoEntry from "./TodoEntry";
import TodoList from "./TodoList";
import TodoAction from "./TodoAction";

class TodoMVC extends Component {
  state = {
    selectAllChecked: false,
    todos: [],
    newTodo: {
      title: null,
      isDone: false
    }
  };

  render() {
    return (
      <div>
        <TodoEntry
          todos={this.state.todos}
          newTodo={this.state.newTodo}
          toggleSelectAll={this.toggleSelectAll}
          selectAllChecked={this.state.selectAllChecked}
          addTodo={this.addTodo}
        />
        <TodoList
          todos={this.state.todos}
          deleteTodo={this.deleteTodo}
          isDoneSwitch={this.isDoneSwitch}
        />
        <TodoAction todos={this.state.todos} deleteCompleted={this.deleteCompleted} />
      </div>
    );
  }

  addTodo = e => {
    e.preventDefault();
    e.target.todoTitle.value = "";

    let newTodoArray = this.state.todos;
    newTodoArray.push(this.state.newTodo);
    this.setState({ newTodo: { title: null, isDone: false } });
    this.setState({ todos: newTodoArray });
  };
  
  deleteTodo = returnedTodo => {
    this.setState({
      todos: [...this.state.todos.filter(todo => todo !== returnedTodo)]
    });
  };
  deleteCompleted = () => {
    this.setState({
      todos: [...this.state.todos.filter(todo => todo.isDone !== true)],
      selectAllChecked: false
    });
  }
  toggleSelectAll = e => {
    this.setState({
      todos: [...this.state.todos.map(todo => {
        todo.isDone = e.target.checked ? true : false;
        return todo;
      })]
    });
    this.isAllSelected();
  };

  isDoneSwitch = returnedTodo => {
    this.setState({
      todos: this.state.todos.map(todo => {
        todo.isDone = todo === returnedTodo ? !todo.isDone : todo.isDone;
        return todo;
      })
    });
    this.isAllSelected();
  };

  isAllSelected = () => {
    let allIsSelected = true;
    this.state.todos.forEach(todo => {
      if (!todo.isDone)
      {
        allIsSelected = false;
      }
    });
    this.setState({selectAllChecked: allIsSelected});
  }
}

export default TodoMVC;
