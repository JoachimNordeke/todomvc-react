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
      <section>
        <TodoEntry
          todos={this.state.todos}
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
          clearCompleted={this.clearCompleted}
          viewMode={this.state.viewMode}
        />
      </section>
    );
  }

  saveLocal = () => {
    localStorage.setItem("todos", JSON.stringify(this.state));
  };

  addTodo = e => {
    e.preventDefault();
    let newTitle = e.target.todoTitle.value.trim();
    e.target.todoTitle.value = ""; //resets the input

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
  };

  updateTodo = (returnedTodo, newTitle) => {
    if (newTitle.trim() !== "") {
      const newArray = this.state.todos;
      newArray.find(todo => todo === returnedTodo).title = newTitle.trim();
      this.setState({ todos: newArray }, () => {
        this.saveLocal();
      });
    } else {
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

  clearCompleted = () => {
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
    const newArray = this.state.todos.map(todo => {
      todo.isDone = e.target.checked ? true : false;
      return todo;
    });
    this.setState({ todos: newArray }, () => {
      this.isAllSelected();
      this.saveLocal();
    });
  };

  isDoneSwitch = returnedTodo => {
    const newArray = this.state.todos.map(todo => {
      todo.isDone = todo === returnedTodo ? !todo.isDone : todo.isDone;
      return todo;
    });
    this.setState({ todos: newArray }, () => {
      this.isAllSelected();
      this.saveLocal();
    });
  };

  isAllSelected = () => {
    let allIsSelected = true;
    this.state.todos.forEach(todo => {
      if (!todo.isDone) {
        allIsSelected = false;
      }
    });
    this.setState({ selectAllChecked: allIsSelected }, () => {
      this.saveLocal();
    });
  };

  displayByHash = () => {
    if (window.location.hash === "#/all" || window.location.hash === "") {
      this.setState({ viewMode: "all" }, () => this.saveLocal());
    } else if (window.location.hash === "#/active") {
      this.setState({ viewMode: "active" }, () => this.saveLocal());
    } else if (window.location.hash === "#/completed") {
      this.setState({ viewMode: "completed" }, () => this.saveLocal());
    }
  };
}

export default TodoMVC;
