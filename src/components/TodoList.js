import React, { Component } from "react";
import TodoItem from "./TodoItem";

class TodoList extends Component {
  render() {
    return (
      <div className="todo-list">
        <ul>
          {this.props.todos.map(this.toggleView)}
        </ul>
      </div>
    );
  }

  toggleView = todo => {
    if (this.props.viewMode === "active") {
      if (!todo.isDone) {
        return (
          <TodoItem
            key={this.getId(todo)}
            todo={todo}
            deleteTodo={this.props.deleteTodo}
            isDoneSwitch={this.props.isDoneSwitch}
          />
        );
      }
    }
    else if (this.props.viewMode === "completed") {
      if (todo.isDone) {
        return (
          <TodoItem
            key={this.getId(todo)}
            todo={todo}
            deleteTodo={this.props.deleteTodo}
            isDoneSwitch={this.props.isDoneSwitch}
          />
        );
      }
    }
    else {
      return (
        <TodoItem
          key={this.getId(todo)}
          todo={todo}
          deleteTodo={this.props.deleteTodo}
          isDoneSwitch={this.props.isDoneSwitch}
        />
      );
    }
  }

  getId = t => {
    for (let i = 0; i < this.props.todos.length; i++) {
      if (t === this.props.todos[i]) {
        return i;
      }
    }
  };
}

export default TodoList;
