import React, { Component } from 'react';
import TodoItem from './TodoItem';

class TodoList extends Component {
    render() {
        return (
            <div className="todo-list">
                <ul>
                    {this.props.todos.map(todo => {
                        return <TodoItem key={todo.id} todo={todo} deleteTodo={this.props.deleteTodo} isDoneSwitch={this.props.isDoneSwitch} />
                    })}
                </ul>
            </div>
        );
    }
}

export default TodoList;