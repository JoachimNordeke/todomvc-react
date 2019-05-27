import React, { Component } from "react";
import TodoEntry from "./components/TodoEntry";
import TodoList from "./components/TodoList";
import TodoAction from "./components/TodoAction";

class TodoMVC extends Component {
  state = {
    selectAllChecked: false,
    todos: [],
    newTodo: {
      title: null,
      isDone: false
    },
    viewMode: "all"
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
          viewMode={this.state.viewMode}
        />
        <TodoAction
          todos={this.state.todos}
          deleteCompleted={this.deleteCompleted}
          showAll={this.showAll}
          activeViewMode={this.activeViewMode}
          completedViewMode={this.completedViewMode}
          allViewMode={this.allViewMode}
        />
      </div>
    );
  }
  
  allViewMode = () => {
    this.setState({viewMode: "all"})
  }
  completedViewMode = () => {
    this.setState({viewMode: "completed"})
  }
  activeViewMode = () =>
  {
    this.setState({viewMode: "active"})
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

  showAll = () => {

  }
}

export default TodoMVC;
