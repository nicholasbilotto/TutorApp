import React, { useEffect, useState } from 'react';
import Modal from '../../Modal'
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import history from '../../../history';
import { deleteSubject} from '../../../actions'


const DeleteSubject = (props) => {

	const location = useLocation();

	useEffect(() => {

	})

	const actions = (
		<React.Fragment>
			<button onClick={() => props.deleteSubject(props.match.params.id)}className="ui negative button">Delete</button>
         	<button onClick={() => history.go(-1)} className="ui button">Cancel</button>
		</React.Fragment>
		)
	return (
		<div>
			Deleting...
			<Modal 
				title={`Deleting ${location.state.subject.title}`}
				description={`Are you sure you want to delete this subject?`}
				actions={actions}
			/>
		</div>
		)
};

export default connect(
	null, { deleteSubject }
	)(DeleteSubject);