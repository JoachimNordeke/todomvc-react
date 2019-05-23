import React, { Component } from "react";

class TodoItem extends Component {
  render() {
    return (
      <li>
        <label className={this.checkboxStyle()}>
          <input type="checkbox" className="todo-check" onChange={this.props.isDoneSwitch.bind(this, this.props.todo.id)} />

          <span className="check">{this.check()}</span>
        </label>

        <label className="todo-text" id="todo-text">
          {this.props.todo.title}
        </label>

        <input type="text" hidden />

        <button onClick={this.props.deleteTodo.bind(this, this.props.todo.id)}>
          ×
        </button>
      </li>
    );
  }

  check = () => {
    if (this.props.todo.isDone) {
      return "✓";
    }
  };
  checkboxStyle = () => {
    if (this.props.todo.isDone) {
      return "checkboxchecked-label";
    } else {
      return "checkbox-label";
    }
  };
}

export default TodoItem;
