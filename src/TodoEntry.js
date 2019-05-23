import React, { Component } from 'react';

class TodoEntry extends Component {
  constructor(props){
    super(props);
    this.state = {todoTitle: ''}
  }
  render() {
    return (
          <form onSubmit={this.props.addTodo.bind(this, this.state.todoTitle)}>
          <div className="todo-entry">
            <input type="checkbox" id="checkAll" />
            <label for="checkAll" style={this.allVisible()}>❯</label>
            <input type="text" placeholder="What needs to be done?" onChange={this.updateStateTitle} />
          </div>
        </form>
    );
  }

updateStateTitle = (e) => {
  this.setState({
    todoTitle: e.target.value
  })
}

  allSelected = () => {
    this.props.todos.forEach(todo => {
      if (!todo.isDone)
      {
        return false;
      }
    });

    return true;
  }

  allVisible = () => {
    if (this.props.todos.length === 0)
    {
      return {
        visibility: 'hidden'
      }
    }
    else {
      return {
        visibility: 'visible'
      }
    }
  }
}

export default TodoEntry;