import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { fetchQuestion, editQuestion } from '../../../actions';
import QuestionForm from './QuestionForm';

class EditQuestion extends React.Component {
  componentDidMount() {
    this.props.fetchQuestion(this.props.match.params.id);
    console.log(this.props.question)
  }

  onSubmit = formValues => {
    this.props.editQuestion(this.props.match.params.id, formValues);
  };

  render() {
    if (!this.props.question) {
      return <div>Loading...</div>;
    }
    console.log(this.props.question)

    return (
      <div>
        <h3>Edit a Question</h3>
        <QuestionForm
          initialValues={_.pick(this.props.question, 'title', 'description')}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { question: state.questions[ownProps.match.params.id] };
};

export default connect(
  mapStateToProps,
  { fetchQuestion, editQuestion }
)(EditQuestion);
