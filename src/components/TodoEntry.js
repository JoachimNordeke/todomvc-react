import React, { Component } from "react";

class TodoEntry extends Component {
  render() {
    return (
      <div>
      <form onSubmit={this.props.addTodo}>
        <div className="todo-entry">
          <input
            type="checkbox"
            id="checkAll"
            onChange={this.props.toggleSelectAll}
            checked={this.props.selectAllChecked}
          />
          <label htmlFor="checkAll" style={this.allVisible()}>
            ❯
          </label>
          <input
            type="text"
            placeholder="What needs to be done?"
            name="todoTitle"
            autoFocus
          />
        </div>
      </form>
      </div>
    );
  }

  allVisible = () => {
    return this.props.todos.length === 0
      ? { visibility: "hidden" }
      : { visibility: "visible" };
  };
}

export default TodoEntry;
