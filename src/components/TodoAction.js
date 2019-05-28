import React, { Component } from "react";

class TodoAction extends Component {
  render() {
    return (
      <div className="todo-action" hidden={this.hideSection()}>
        <ul>
          <li id="left">
            <p>
              {this.incompleteTodos()} item{this.hasS()} left
            </p>
          </li>
          <li>
            <ul>
              <li>
                <a id="all" className={this.setStyleAll()} href="#/all" onClick={this.props.allViewMode}>
                  All
                </a>
              </li>
              <li>
                <a id="active" className={this.setStyleActive()} href="#/active" onClick={this.props.activeViewMode}>
                  Active
                </a>
              </li>
              <li>
                <a id="completed" className={this.setStyleCompleted()} href="#/completed" onClick={this.props.completedViewMode}>
                  Completed
                </a>
              </li>
            </ul>
          </li>
          <li>
            <button onClick={this.props.deleteCompleted} style={this.hidden()}>
              Clear completed
            </button>
          </li>
        </ul>
      </div>
    );
  }

  setStyleAll = () => {
    if (this.props.viewMode === "all") {
      return "selected-link"
    }
  }


  setStyleActive = () => {
    if (this.props.viewMode === "active") {
      return "selected-link"
    }
  }

  setStyleCompleted = () => {
    if (this.props.viewMode === "completed") {
      return "selected-link"
    }
  }

  hideSection = () => {
    return this.props.todos.length === 0 ? true : false;
  };

  hidden = () => {
    let anyCompleted = false;
    this.props.todos.forEach(todo => {
      if (todo.isDone) {
        anyCompleted = true;
        return;
      }
    });
    if (anyCompleted) {
      return { visibility: "visible" };
    } else {
      return { visibility: "hidden" };
    }
  };

  incompleteTodos = () => {
    let counter = 0;
    this.props.todos.forEach(todo => {
      if (!todo.isDone) {
        counter++;
      }
    });
    return counter;
  };

  hasS = () => {
    if (this.incompleteTodos() !== 1) {
      return "s";
    }
  };
}

export default TodoAction;
