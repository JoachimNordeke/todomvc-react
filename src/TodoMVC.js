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

  componentDidMount() {
    const localState = JSON.parse(localStorage.getItem("todos"));
    if (localState !== null) {
      this.setState(localState);
    }
  }

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
        <TodoAction
          todos={this.state.todos}
          deleteCompleted={this.deleteCompleted}
        />
      </div>
    );
  }

  saveLocal = () => {
    localStorage.setItem("todos", JSON.stringify(this.state));
  };

  addTodo = e => {
    e.preventDefault();
    e.target.todoTitle.value = "";

    const newState = this.state;
    newState.todos.push(newState.newTodo);
    newState.newTodo = { title: null, isDone: false };
    this.setState(newState);

    this.isAllSelected();

    this.saveLocal();
  };

  deleteTodo = returnedTodo => {
    const newState = this.state;
    newState.todos = newState.todos.filter(todo => todo !== returnedTodo);
    this.setState(newState);

    this.isAllSelected();

    this.saveLocal();
  };
  deleteCompleted = () => {
    const newState = this.state;
    newState.todos = newState.todos.filter(todo => todo.isDone !== true);
    newState.selectAllChecked = false;
    this.setState(newState);

    this.isAllSelected();

    this.saveLocal();
  };
  toggleSelectAll = e => {
    const newState = this.state;
    newState.todos = newState.todos.map(todo => {
      todo.isDone = e.target.checked ? true : false;
      return todo;
    });
    this.setState(newState);

    this.isAllSelected();

    this.saveLocal();
  };

  isDoneSwitch = returnedTodo => {
    const newState = this.state;
    newState.todos = newState.todos.map(todo => {
      todo.isDone = todo === returnedTodo ? !todo.isDone : todo.isDone;
      return todo;
    });
    this.setState(newState);

    // this.setState({
    //   todos: this.state.todos.map(todo => {
    //     todo.isDone = todo === returnedTodo ? !todo.isDone : todo.isDone;
    //     return todo;
    //   })
    // });

    this.isAllSelected();

    this.saveLocal();
  };

  isAllSelected = () => {
    const newState = this.state;
    let allIsSelected = true;
    newState.todos.forEach(todo => {
      if (!todo.isDone) {
        allIsSelected = false;
      }
    });
    newState.selectAllChecked = allIsSelected;
    this.setState(newState);

    this.saveLocal();
  };
}

export default TodoMVC;
