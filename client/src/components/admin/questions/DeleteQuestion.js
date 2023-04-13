import React, { useEffect, useState } from 'react';
import Modal from '../../Modal'
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import history from '../../../history';
import { deleteQuestion } from '../../../actions'


const DeleteQuestion = (props) => {

	const location = useLocation();

	useEffect(() => {

	})

	const actions = (
		<React.Fragment>
			<button onClick={() => props.deleteQuestion(props.match.params.id)}className="ui negative button">Delete</button>
         	<button onClick={() => history.go(-1)} className="ui button">Cancel</button>
		</React.Fragment>
		)
	return (
		<div>
			Deleting...
			<Modal 
				title={`Deleting ${location.state.question.title}`}
				description={`Are you sure you want to delete this question?`}
				actions={actions}
			/>
		</div>
		)
};

export default connect(
	null, { deleteQuestion }
	)(DeleteQuestion);