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
            key={todo.id}
            todo={todo}
            deleteTodo={this.props.deleteTodo}
            isDoneSwitch={this.props.isDoneSwitch}
            updateTodo={this.props.updateTodo}
          />
        );
      }
    }
    else if (this.props.viewMode === "completed") {
      if (todo.isDone) {
        return (
          <TodoItem
            key={todo.id}
            todo={todo}
            deleteTodo={this.props.deleteTodo}
            isDoneSwitch={this.props.isDoneSwitch}
            updateTodo={this.props.updateTodo}
          />
        );
      }
    }
    else {
      return (
        <TodoItem
          key={todo.id}
          todo={todo}
          deleteTodo={this.props.deleteTodo}
          isDoneSwitch={this.props.isDoneSwitch}
          updateTodo={this.props.updateTodo}
        />
      );
    }
  }
}

export default TodoList;
