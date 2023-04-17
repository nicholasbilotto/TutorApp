import React from 'react';
import { connect } from 'react-redux';
import { Image } from 'semantic-ui-react';
import {
  fetchStudent,
  fetchCategories,
  editCategory,
  fetchQuestions,
  fetchAnswers,
} from '../../../actions';

class ReviewTest extends React.Component {

	componentDidMount() {
	  this.props.fetchStudent(this.props.match.params.id);
	  this.props.fetchCategories();
	  this.props.fetchQuestions(); // Make sure this is fetchQuestions (plural) instead of fetchQuestion (singular)
	  this.props.fetchAnswers();
	}

  renderTest() {
    const category = this.props.categories.find(
      (category) => category.id === parseInt(this.props.match.params.testid),
    );
    return category.title;
  }

renderQuestionsAndAnswers() {
  console.log(this.props.questions);

  const testQuestions = this.props.questions.filter(
    (question) => question.Category[0] === this.renderTest(),
  );

  return testQuestions.map((question, index) => {
    const answer = this.props.answers.find(
      (answer) => answer.questionTitle === question.title,
    );

    return (
      <div key={index}>
        <br></br>
        <h4>
          Question {index + 1}: {question.title}
        </h4>
        {question.image && (
          <Image src={question.image} alt={`Question ${index + 1}`} centered size="medium" />
        )}
        <p>Answer: {answer ? answer[`${index + 1}-answer`] : 'N/A'}</p>
        <br></br>
      </div>
    );
  });
}

  render() {
    if (!this.props.student || !this.props.categories || !this.props.questions || !this.props.answers) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <h3>
          {this.props.student.title}'s answers to {this.renderTest()}
        </h3>
        {this.renderQuestionsAndAnswers()}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    student: state.students[ownProps.match.params.id],
    categories: Object.values(state.categories),
		questions: Object.values(state.questions),
		answers: Object.values(state.answers),
  };
};

export default connect(mapStateToProps, {
  fetchStudent,
  fetchCategories,
  editCategory,
  fetchQuestions,
  fetchAnswers,
})(ReviewTest);
