import React from 'react';
import { connect } from 'react-redux';
import { createQuestion } from '../../../actions';
import QuestionForm from './QuestionForm';


class NewQuestion extends React.Component {

  onSubmit = (formValues) => {
    this.props.createQuestion(formValues), this.props.title);
    return(
      <div></div>
      )
  }

  render() {
    return (
      <div>
        <h3>Create a Question</h3>
        <QuestionForm onSubmit={this.onSubmit} subject={this.props.title} type="Question" title={this.props.title} />
        <div></div>
      </div>
    );
  }
}

export default connect(
  null,
  { createQuestion }
)(NewQuestion);