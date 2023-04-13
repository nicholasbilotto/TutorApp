import React from 'react';
import { connect } from 'react-redux';
import { createStudent } from '../../../actions';
import Form from '../Form';

class NewStudent extends React.Component {

  onSubmit = formValues => {
    this.props.createStudent(formValues);

  };

  render() {
    return (
      <div>
        <h3>Create a Student</h3>
        <Form onSubmit={this.onSubmit} type="Student" />

      </div>
    );
  }
}

export default connect(
  null,
  { createStudent}
)(NewStudent);