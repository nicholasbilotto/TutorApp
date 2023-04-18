import React from 'react';
import { connect } from 'react-redux';
import { createQuestion } from '../../../actions';
import QuestionForm from './QuestionForm';

class NewQuestion extends React.Component {
  render() {
    return (
      <div>
        <h3>Create a Question</h3>
        <QuestionForm createQuestion={this.props.createQuestion} subject={this.props.title} type="Question" title={this.props.title} />
        <div></div>
      </div>
    );
  }
}

export default connect(
  null,
  { createQuestion }
)(NewQuestion);