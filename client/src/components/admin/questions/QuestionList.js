import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchQuestions, deleteQuestion } from '../../../actions';


class QuestionList extends React.Component {
  componentDidMount() {
    this.props.fetchQuestions();
  }


  renderList() {
    return this.props.questions
      .filter(question => question.subject === this.props.subject)
      .map(question => {
        return (
          <div className="item" key={question.id}>
          <div className="right floated content">
            {/* <Link to={`/admin/edit/question/${question.id}`} className="ui button">Edit</Link> */}
          	<Link to={{ pathname: `/admin/delete/question/${question.id}`, state: { question }}} className="ui negative button">Delete</Link>
          </div>
            <i className="large middle aligned icon book" />
            <div className="content">
              {question.title}
              <div className="description">{question.description}</div>
            </div>
          </div>
        );
      });
  }

  render() {
    return (
      <div>
        <h2>Questions</h2>
        <div className="ui middle aligned divided list">{this.renderList()}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    questions: Object.values(state.questions),
  };
};

export default connect(
  mapStateToProps,
  { fetchQuestions, deleteQuestion }
)(QuestionList);
