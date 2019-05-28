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

    window.onhashchange = this.displayByHash;
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
          updateTodo={this.updateTodo}
          viewMode={this.state.viewMode}
        />
        <TodoAction
          todos={this.state.todos}
          deleteCompleted={this.deleteCompleted}
          showAll={this.showAll}
          activeViewMode={this.activeViewMode}
          completedViewMode={this.completedViewMode}
          allViewMode={this.allViewMode}
          viewMode={this.state.viewMode}
        />
      </div>
    );
  }

  allViewMode = () => {
    let newState = this.state;
    newState.viewMode = "all";
    this.setState(newState);

    this.saveLocal();
  }
  completedViewMode = () => {
    let newState = this.state;
    newState.viewMode = "completed";
    this.setState(newState);

    this.saveLocal();
  }
  activeViewMode = () => {
    let newState = this.state;
    newState.viewMode = "active";
    this.setState(newState);

    this.saveLocal();
  }

  saveLocal = () => {
    localStorage.setItem("todos", JSON.stringify(this.state));
  };

  addTodo = e => {
    e.preventDefault();
    e.target.todoTitle.value = "";

    if (this.state.newTodo.title !== null && this.state.newTodo.title.trim() !== ""){
        const newState = this.state;
        newState.newTodo.title = newState.newTodo.title.trim();
        newState.todos.push(newState.newTodo);
        newState.newTodo = { title: null, isDone: false };
        this.setState(newState);
    
        this.isAllSelected();
    
        this.saveLocal();
    }
  };

  updateTodo = (returnedTodo, newTitle) => {
    const newState = this.state;
    newState.todos.find(todo => todo === returnedTodo).title = newTitle;
    this.setState(newState);

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

  displayByHash = () => {

    if (window.location.hash === "#/all" || window.location.hash === "") {
      let newState = this.state;
      newState.viewMode = "all";
      this.setState(newState);
      this.saveLocal();
    }
    else if (window.location.hash === "#/active") {
      let newState = this.state;
      newState.viewMode = "active";
      this.setState(newState);
      this.saveLocal();
    }
    else if (window.location.hash === "#/completed" ) {
      let newState = this.state;
      newState.viewMode = "completed";
      this.setState(newState);
      this.saveLocal();
    }
  }
}

export default TodoMVC;
