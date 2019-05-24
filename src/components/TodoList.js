import React, { Component } from "react";
import TodoItem from "./TodoItem";

class TodoList extends Component {
  render() {
    return (
      <div className="todo-list">
        <ul>
          {this.props.todos.map(todo => {
            return (
              <TodoItem
                key={this.getId(todo)}
                todo={todo}
                deleteTodo={this.props.deleteTodo}
                isDoneSwitch={this.props.isDoneSwitch}
              />
            );
          })}
        </ul>
      </div>
    );
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
