import React from 'react';
import { connect } from 'react-redux';
import { createCategory } from '../../../actions';
import Form from '../Form';

class NewCategory extends React.Component {

  onSubmit = formValues => {
    this.props.createCategory(formValues, this.props.title);
    return (
      <div> 
      </div>
      )
  };

  render() {
    return (
      <div>
        <h3>Create a Category</h3>
        <Form onSubmit={this.onSubmit} type="Category" />
      </div>
    );
  }
}

export default connect(
  null,
  { createCategory }
)(NewCategory);