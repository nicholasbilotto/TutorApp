import React, { useEffect, useState } from 'react';
import Modal from '../../Modal'
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import history from '../../../history';
import { deleteStudent } from '../../../actions'


const DeleteStudent = (props) => {

	const location = useLocation();

	useEffect(() => {

	})

	const actions = (
		<React.Fragment>
			<button onClick={() => props.deleteStudent(props.match.params.id)}className="ui negative button">Delete</button>
         	<button onClick={() => history.go(-1)} className="ui button">Cancel</button>
		</React.Fragment>
		)
	return (
		<div>
			Deleting...
			<Modal 
				title={`Deleting ${location.state.student.title}`}
				description={`Are you sure you want to delete this student?`}
				actions={actions}
			/>
		</div>
		)
};

export default connect(
	null, { deleteStudent }
	)(DeleteStudent);