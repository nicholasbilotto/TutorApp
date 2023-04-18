import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchQuestions, fetchCategories, editCategory, submitAnswer } from '../../actions';
import Question from './Question';
import { Container } from 'semantic-ui-react';

class Test extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        currentQuestionIndex: 0,
        currentTest: [],
      };
  }

async componentDidMount() {
  try {
    await Promise.all([
      this.props.fetchQuestions(),
      this.props.fetchCategories(),
    ]);
    await this.getQuestions();
  } catch (error) {
    console.error("Error fetching questions and categories:", error);
  }
}

  onSubmitAnswer = () => {
    this.handleNextQuestion();
  };

async getQuestions() {
  const { questions, categories } = this.props;

  const tid = categories.find(
    (category) => category.id === parseInt(this.props.match.params.testid),
  );


  const testName = tid.title;

  const test = questions.filter((question) => {
    return question.Category && question.Category.includes(testName);
  });

  this.setState({ currentTest: test });
}

  handleNextQuestion = () => {
    const { currentTest, currentQuestionIndex } = this.state;

    if (currentQuestionIndex < currentTest.length - 1) {
      this.setState({ currentQuestionIndex: currentQuestionIndex + 1 });
    }
  };

handleSubmitTest = (formValues) => {
  const { categories } = this.props;

  // this.props.submitAnswer(formValues);

  const updatedCategory = {
    ...this.props.categories.find(category => category.id === parseInt(this.props.match.params.testid)),
    completed: true,
    status: 'inactive'
  };

  this.props.editCategory(parseInt(this.props.match.params.testid), updatedCategory);

  this.props.history.push(`/student/${this.props.match.params.id}`);
}


   render() {
    const { currentTest, currentQuestionIndex } = this.state;
    const isLastQuestion = currentQuestionIndex === currentTest.length - 1;

    if (!currentTest || currentTest.length === 0) {
      return <div>Loading...</div>;
    }

    const { questions, categories } = this.props;
    const tid = categories.find(
      category => category.id === parseInt(this.props.match.params.testid)
    );
    const testName = tid.title;

    console.log(currentTest[currentQuestionIndex].image)

    return (
      <Container>
        <Question
          onSubmitAnswer={this.onSubmitAnswer}
          index={currentQuestionIndex}
          question={currentTest[currentQuestionIndex]}
          isLastQuestion={isLastQuestion}
          handleSubmitTest={this.handleSubmitTest}
          category={testName}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    questions: Object.values(state.questions),
    categories: Object.values(state.categories)
  };
};

export default withRouter(connect(mapStateToProps, { fetchQuestions, fetchCategories, editCategory, submitAnswer })(Test));
