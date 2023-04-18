import React from 'react';
import { connect } from 'react-redux';
import { createQuestion } from '../../../actions';
import QuestionForm from './QuestionForm';

class NewQuestion extends React.Component {

onSubmit = async (formValues) => {
  console.log('Form values before submitting:', formValues);

  const formData = new FormData();

  // Append formValues to formData
  for (const key in formValues) {
    formData.append(key, formValues[key]);
  }

  this.props.onSubmit(formData, this.props.title);
};

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
