import React from 'react'; 
import { Redirect } from 'react-router-dom';
import NewStudent from './students/NewStudent';
import StudentList from './students/StudentList';
import NewSubject from './subjects/NewSubject';
import SubjectList from './subjects/SubjectList';

class AdminEdit extends React.Component {
	constructor(props) {
    	super(props);
	 	this.state = {active1: true, active2: false, active3: false, active4: false };
	 }


	componentDidMount() {
		const current = this.props.location.pathname; 
		
		switch(current) {
			case '/admin/edit/students':
				this.toggle1(); 
				break;
			case '/admin/edit/newstudent':
				this.toggle2();
				break;
			case '/admin/edit/subjects':
				this.toggle3();
				break;
			case '/admin/edit/newsubject':
				this.toggle4();
				break;
		}
	}

	toggle1 = () => {
		this.setState({active1: true, active2: false, active3: false, active4: false});
		this.props.history.push('/admin/edit/students');
	}

	toggle2 = () => {
		this.setState({active1: false, active2: true, active3: false, active4: false});
		this.props.history.push('/admin/edit/newstudent');
	}

	toggle3 = () => {
		this.setState({active1: false, active2: false, active3: true, active4: false});
		this.props.history.push('/admin/edit/subjects');
	}

	toggle4 = () => {
		this.setState({active1: false, active2: false, active3: false, active4: true});
		this.props.history.push('/admin/edit/newsubject');
	}




	render() {
		return (
			<div>
				<div class="ui tabular  menu">
		  			<a class={`item ${this.state.active1 ? 'active' : ''}`} onClick={this.toggle1}>
		    			Students
		  			</a>
		  			<a class={`item ${this.state.active2 ? 'active' : ''}`} onClick={this.toggle2}>
		    			New Student
		  			</a>
		  			<a class={`item ${this.state.active3 ? 'active' : ''}`} onClick={this.toggle3}>
		    			Subjects
		  			</a>
		  			<a class={`item ${this.state.active4 ? 'active' : ''}`} onClick={this.toggle4}>
		    			New Subject
		  			</a>
		 		 </div>
		 		 <div class={`ui bottom ${this.state.active1 ? 'active' : ''} tab`}>
	  				<StudentList />
				</div>
				<div class={`ui bottom ${this.state.active2 ? 'active' : ''} tab`}>
	  				<NewStudent />
				</div>
				<div class={`ui bottom ${this.state.active3 ? 'active' : ''} tab`}>
	  				<SubjectList />
				</div>
				<div class={`ui bottom ${this.state.active4 ? 'active' : ''} tab`}>
	  				<NewSubject />
				</div>
			</div>
			);
	}
}

export default AdminEdit;