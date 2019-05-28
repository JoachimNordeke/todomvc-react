import React, { Component } from "react";
import TodoEntry from "./components/TodoEntry";
import TodoList from "./components/TodoList";
import TodoAction from "./components/TodoAction";

class TodoMVC extends Component {
  state = {
    selectAllChecked: false,
    todos: [],
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
    this.setState({viewMode: "all"});
    this.saveLocal();
  }
  activeViewMode = () => {
    this.setState({viewMode: "active"});
    this.saveLocal();
  }
  completedViewMode = () => {
    this.setState({viewMode: "completed"});
    this.saveLocal();
  }

  saveLocal = () => {
    localStorage.setItem("todos", JSON.stringify(this.state));
  };

  addTodo = e => {
    e.preventDefault();
    let newTitle = e.target.todoTitle.value.trim();
    e.target.todoTitle.value = "";

    if (newTitle !== "") {
      let newTodo = {
        id: this.newTodoId(),
        title: newTitle,
        isDone: false
      };

      this.setState(
        state => {
          const todos = state.todos.push(newTodo);
          return todos;
        }, 
        () => {
          this.isAllSelected();
          this.saveLocal();
        }
      );
    }
  };

  newTodoId = () => {
    return this.state.todos.length === 0
      ? 0
      : this.state.todos[this.state.todos.length - 1].id + 1;
  }

  updateTodo = (returnedTodo, newTitle) => {
    if (newTitle.trim() !== ""){
      const newArray = this.state.todos;
      newArray.find(todo => todo === returnedTodo).title = newTitle.trim();
      this.setState({todos: newArray}, () => {
        this.saveLocal();
      });
    }
    else {
      this.deleteTodo(returnedTodo);
    }
  };

  deleteTodo = returnedTodo => {
    const newArray = this.state.todos.filter(todo => todo !== returnedTodo);
    this.setState({ todos: newArray }, () => {
      this.isAllSelected();
      this.saveLocal();
    });
  };
  
  deleteCompleted = () => {
    this.setState(
      state => {
        state.todos = state.todos.filter(todo => todo.isDone !== true);
      },
      () => {
        this.isAllSelected();
        this.saveLocal();
      }
    );
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
