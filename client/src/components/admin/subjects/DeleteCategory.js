import React, { useEffect, useState } from 'react';
import Modal from '../../Modal'
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import history from '../../../history';
import { deleteCategory } from '../../../actions'


const DeleteCategory = (props) => {

	const location = useLocation();

	useEffect(() => {

	})

	const actions = (
		<React.Fragment>
			<button onClick={() => props.deleteCategory(props.match.params.id)}className="ui negative button">Delete</button>
         	<button onClick={() => history.go(-1)} className="ui button">Cancel</button>
		</React.Fragment>
		)
	return (
		<div>
			Deleting...
			<Modal 
				title={`Deleting ${location.state.category.title}`}
				description={`Are you sure you want to delete this category?`}
				actions={actions}
			/>
		</div>
		)
};

export default connect(
	null, { deleteCategory }
	)(DeleteCategory);