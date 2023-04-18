import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, reset } from 'redux-form';
import { submitAnswer } from '../../actions';
import { Form, Radio, Button, Segment, Header, Image } from 'semantic-ui-react';

class Question extends React.Component {
onSubmit = formValues => {
  const updatedFormValues = {
    ...formValues,
    questionTitle: this.props.question.title, // Update the questionTitle with the current question's title
  };

  this.props.submitAnswer(updatedFormValues);

  if (this.props.isLastQuestion) {
    this.props.handleSubmitTest(updatedFormValues);
  } else {
    this.props.onSubmitAnswer();
    this.props.resetForm(); // Reset the form
  }
};
   render() {
    console.log(this.props.question)
    const { index, question, handleSubmit } = this.props;
    const { title, qtype, multipleChoiceInput, image } = question; // Assuming the imageUrl is stored in the question object
    const questionNumber = index + 1;
    const questionType = qtype === 'mc' ? 'multiple-choice' : 'open-ended';

    return (
      <Form onSubmit={handleSubmit(this.onSubmit)}>
        <Segment>
          <Header as="h3">
            Question {questionNumber}: {title}
          </Header>

          {image && (
            <Image src={image} alt={`Question ${questionNumber}`} centered size="medium" />
          )}

          {questionType === 'multiple-choice' && (
            <Segment>
              <Header as="h4">Select an answer:</Header>
              {multipleChoiceInput.split(',').map((choice, i) => (
                <Form.Field key={i}>
                  <Field
  component="input"
  type="radio"
  id={`${questionNumber}-${i}`}
  name={`${questionNumber}-answer`}
  value={choice} 
/>
                  <label htmlFor={`${questionNumber}-${i}`}>{choice.trim()}</label>
                </Form.Field>
              ))}
            </Segment>
          )}

          {questionType === 'open-ended' && (
            <Segment>
              <Header as="h4">Type your answer:</Header>
              <Field
                component={Form.Input}
                type="text"
                id={`${questionNumber}-answer`}
                name={`${questionNumber}-answer`}
              />
            </Segment>
          )}
        </Segment>

        {!this.props.isLastQuestion && (
          <Button primary type="submit">
            Submit
          </Button>
        )}
        {this.props.isLastQuestion && (
          <Button primary type="submit">
            Finish Test
          </Button>
        )}
      </Form>
    );
  }
}

//i love you

const mapStateToProps = (state, ownProps) => ({
  initialValues: {
    category: ownProps.category,
  },
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  submitAnswer: formValues => dispatch(submitAnswer(formValues)),
  resetForm: () => dispatch(reset('AnswerForm')),
});

Question = reduxForm({
  form: 'AnswerForm',
})(Question);

export default connect(mapStateToProps, mapDispatchToProps)(Question);
