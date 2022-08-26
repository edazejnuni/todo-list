import React, { Component } from 'react'
import TodoForm from './TodoForm'
import Todo from './Todo'

/*
    TodoMVC
    1.add todo
    2. display todos
    3. cross off todo
    4. show number of active todos
    5. filter all/active/complete
    6. delete todo
    7. delete all complete
        7.1 only show if atleast one is complete
    8. button to toggle all on/off
*/

export default class TodoList extends Component {

    state = {
        todos: [],
        todoToShow:"all",
        toggleAllComplete: true
    }
    addTodo = (todo) =>{
        this.setState(state =>({
                todos: [todo, ...state.todos]
            }
        ))
    }
    toggleComplete = (id) => {
        this.setState(state => ({
            todos: state.todos.map(todo => {
                //supppose to update
                if(todo.id === id){
                    return {
                        ...todo,
                        complete: !todo.complete
                    }
                } else {
                    return todo;
                }
            })
        })
        )
    }
    updateTodoToShow = (s) =>{
        this.setState({
            todoToShow: s
        })
    }
    handleDeleteTodo = (id) =>{
        this.setState(state => ( {
                todos: state.todos.filter(todo => todo.id !== id)
            }
        ))
    }
    removeAllTodoThatareComplete = () =>{
        this.setState(state=>({
                todos: state.todos.filter(todo => !todo.complete)
            }
        ))
    }
  render(){

    let todos = [];

    if(this.state.todoToShow === "all"){
        todos = this.state.todos;
    }
    else if(this.state.todoToShow === "active"){
        todos = this.state.todos.filter(todo => !todo.complete)
    }
    else if(this.state.todoToShow === "complete"){
        todos = this.state.todos.filter(todo => todo.complete)
    }

   
    return (
        <div>
            <TodoForm onSubmit={this.addTodo}/>
            {todos.map(todo => (
                <Todo 
                toggleComplete={()=> this.toggleComplete(todo.id)} 
                key={todo.id} 
                onDelete={()=> this.handleDeleteTodo(todo.id)}
                todo={todo} />
            ))
            }
            <div>todos left: {this.state.todos.filter(todo => !todo.complete).length}</div>
            <button onClick={()=>this.updateTodoToShow("all")}>all</button>
            <button onClick={()=>this.updateTodoToShow("active")}>active</button>
            <button onClick={()=>this.updateTodoToShow("complete")}>complete</button>
            {this.state.todos.filter(todo =>todo.complete).length ? <div>
                <button onClick={this.removeAllTodoThatareComplete}>remove all complete todos</button>    
            </div> : null}
            <div>
                <button
                onClick={()=> 
                    this.setState((state)=>({
                    todos: state.todos.map(todo=>({
                        ...todo,
                        complete:state.toggleAllComplete
                    })),
                    toggleAllComplete:  !state.toggleAllComplete
                }))}
                >toggle all complete: {`${this.state.toggleAllComplete}`}</button>
            </div>
        </div>
      )
  }
}
 