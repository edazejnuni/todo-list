import React, { Component } from 'react'
import shortid from 'shortid'

export default class TodoForm extends Component {
    state = {
        text:" "
    }

    handleChange = event =>{
        this.setState({
            [event.target.name] : event.target.value
        })
    }
    handleSubmit = event =>{
        event.preventDefault()
        //submit the form
        this.props.onSubmit({
            id: shortid.generate(),
            text: this.state.text,
            complete: false
        })
        this.setState({
            text:""
        })
    }
  render(){
    return (
        <div>
            <form onSubmit={this.handleSubmit}>
                <input 
                name="text"
                value={this.state.text} 
                placeholder="todo..."
                onChange={this.handleChange}
                />
                <button onClick={this.handleSubmit}>add todo</button>
            </form>
        </div>
      )
  }
}