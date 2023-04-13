import React from 'react';
import { Redirect } from 'react-router-dom';

class AdminLogin extends React.Component {
	constructor(props) {
    	super(props);
    	this.state = {username: '', password: '', redirect: false};

    	this.handleUser = this.handleUser.bind(this);
    	this.handlePass = this.handlePass.bind(this);
    	this.handleSubmit = this.handleSubmit.bind(this);
  	}

  	handleUser(event) {
    	this.setState({username: event.target.value});
  	}

  	handlePass(event) {
    	this.setState({password: event.target.value});
  	}


  	handleSubmit(event) {
  		event.preventDefault();
    	if(this.state.username === "admin" && this.state.password === "please") {
    		console.log('ur in')
    		this.setState({ redirect: true })
    		};
  
  	}

	render () {


		return (
				<div>
					 { this.state.redirect ? (<Redirect push to="/admin/edit"/>) : null }
					<div style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						margin: "17em"
					}}>
						<div className="ui raised padded text container segment">
							<form onSubmit={this.handleSubmit} class="ui form">
			  					<div class="field">
			    					<label>Username</label>
			    					<input type="text" name="name" value={this.state.username} onChange={this.handleUser} autocomplete="off" />
			  					</div>
			  					<div class="field">
			    					<label>Password</label>
			    					<input type="password" name="name" value={this.state.password} onChange={this.handlePass} autocomplete="off" />
			  					</div>
			  					<button class="ui button" type="submit">Sign In</button>
							</form>
						</div>
					</div>
				</div>
		);
	}
}

export default AdminLogin;
