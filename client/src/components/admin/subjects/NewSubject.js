import React from 'react';
import { connect } from 'react-redux';
import { createSubject } from '../../../actions';
import Form from '../Form';

class NewSubject extends React.Component {

  onSubmit = formValues => {
    this.props.createSubject(formValues);
    return (
      <div> 
      </div>
      )
  };

  render() {
    return (
      <div>
        <h3>Create a Subject</h3>
        <Form onSubmit={this.onSubmit} type="Subject" />
      </div>
    );
  }
}

export default connect(
  null,
  { createSubject}
)(NewSubject);