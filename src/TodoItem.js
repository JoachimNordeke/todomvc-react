import React, { Component } from "react";

class TodoItem extends Component {
  constructor(props) {
    super(props);

    this.textInput = React.createRef();

    this.state = {};
  }

  render() {
    return (
      <li>
        <label className={this.checkboxStyle()}>
          <input
            type="checkbox"
            className="todo-check"
            onChange={this.props.isDoneSwitch.bind(this, this.props.todo)}
          />

          <span className="check">{this.check()}</span>
        </label>

        <label
          ref={this.todoLabel}
          className="todo-text"
          id={this.labelStyle()}
          onDoubleClick={this.dblClickTodo}
        >
          {this.props.todo.title}
        </label>

        <input ref={this.textInput} type="text" hidden />

        <button
          onClick={this.props.deleteTodo.bind(this, this.props.todo)}
          onMouseDown={e => {
            e.target.style.outline = "none";
          }}
        >
          ×
        </button>
      </li>
    );
  }

  dblClickTodo = e => {
    e.target.style.display = "none";

    this.textInput.current.hidden = false;
    this.textInput.current.value = e.target.textContent;
    this.textInput.current.focus();
  };

  labelStyle = () => {
    if (this.props.todo.isDone) {
      return "todo-text-checked";
    } else {
      return "todo-text";
    }
  };
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
