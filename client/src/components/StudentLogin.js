import React from 'react';
import { connect } from 'react-redux';
import { fetchStudents } from '../actions'

class StudentLogin extends React.Component {
	constructor(props) {
    	super(props);
    	this.state = {value: ''};

    	this.handleChange = this.handleChange.bind(this);
    	this.handleSubmit = this.handleSubmit.bind(this);
  	}

  	componentDidMount() {
   	 	this.props.fetchStudents();
  	}

  	handleChange(event) {
    	this.setState({value: event.target.value});
  	}

  	handleSubmit(event) {
    	event.preventDefault();
    	this.props.students.map(student => {
    		if (student.title.toLowerCase() === this.state.value.toLowerCase()){
    			this.props.history.push(`/student/${student.id}`)
    		} else {
    			return (
    				<div> 	
    					That student does not exist
    				</div>
    				)
    		}
    	})
    	//compare to student list here 
    	//redirect to student page if user exists
  	}

	render () {
		return (
				<div style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					margin: "17em"
				}}>
					<div className="ui raised padded text container segment">
						<form onSubmit={this.handleSubmit} class="ui form">
		  					<div class="field">
		    					<label>Type your name here...</label>
		    					<input type="text" name="name" value={this.state.value} onChange={this.handleChange} autocomplete="off" />
		  					</div>
		  					<button class="ui button" type="submit">Go!</button>
						</form>
					</div>
				</div>
		);
	}
}

const mapStateToProps = state => {
  return {
    students: Object.values(state.students),
  };
};

export default connect(mapStateToProps, { fetchStudents })(StudentLogin);