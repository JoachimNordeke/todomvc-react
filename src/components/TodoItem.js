import React, { Component } from "react";

class TodoItem extends Component {
  constructor(props) {
    super(props);

    this.checkbox = React.createRef();
    this.textInput = React.createRef();
    this.todoLabel = React.createRef();
    this.button = React.createRef();
  }

  render() {
    return (
      <li>
        <label ref={this.checkbox} className={this.checkboxStyle()}>
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

        <input ref={this.textInput} type="text" hidden onKeyPress={this.saveTodoTitle} onBlur={this.saveTodoTitle} />

        <button
          onClick={this.props.deleteTodo.bind(this, this.props.todo)}
          ref={this.button}
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
    this.checkbox.current.style.visibility = "hidden";
    this.button.current.style.display = "none";

    this.textInput.current.hidden = false;
    this.textInput.current.value = e.target.textContent;
    this.textInput.current.focus();
    this.newTodoTitle = e.target.value;
  };
  saveTodoTitle = e => {
    if (e.key === 'Enter' || e.type === "blur") {
      this.todoLabel.current.style.display = "block";
      e.target.hidden = true;
      this.checkbox.current.style.visibility = "visible";
      this.button.current.style.display = "block";

      this.props.updateTodo(this.props.todo, e.target.value);
    }
  }

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
