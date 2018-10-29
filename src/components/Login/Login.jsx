import React, { Component } from 'react';
import { updateUsername, updatePassword } from './LoginActions'

export default class Login extends Component {
	constructor(props) {
        super(props);
        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
    }

    handleUsername(e){
        const { dispatch } = this.props;
        dispatch( updateUsername(e.target.value));
    }

    handlePassword(e){
        const { dispatch } = this.props;
        dispatch(updatePassword(e.target.value))
    }

    submitLogin(e){
        e.preventDefault();
    }

    render(){
        return(
            <div className='container'>
                <div>
                    <h1 className='header glitch' id='header'>Login</h1>
                </div>
                <form onSubmit={ this.submitLogin }>
                    <div className='grid'>
                        <label className='label' htmlFor='username'>Username:</label>
                        <input  className='input' id='username' name='username' type='text' onChange={this.handleUsername} />
                        <label className='label' htmlFor='password'>Password:</label>
                        <input className='input' id='password' name='password' type='password' onChange={this.handlePassword} />
                    </div>
                    <div>
                        <button className='submit' id='submit'>Submit</button>
                    </div>
                </form>
            </div>
        )
    }
}
