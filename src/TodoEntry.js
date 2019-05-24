import React, { Component } from "react";

class TodoEntry extends Component {
  render() {
    return (
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
            onChange={this.updateNewTodo}
            name="todoTitle"
          />
        </div>
      </form>
    );
  }

  updateNewTodo = e => {
    this.props.newTodo.title = e.target.value;
  };

  allSelected = () => {
    this.props.todos.forEach(todo => {
      if (!todo.isDone) {
        return false;
      }
    });

    return true;
  };

  allVisible = () => {
    return this.props.todos.length === 0
      ? { visibility: "hidden" }
      : { visibility: "visible" };
  };
}

export default TodoEntry;
