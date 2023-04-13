import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchQuestions, deleteQuestion, } from '../../../actions';

class EditCategory extends React.Component {
  componentDidMount() {
    this.props.fetchQuestions();
    console.log(this.props.questions)
  }


renderList() {
  return this.props.questions
    .filter(question => Array.isArray(question.Category) && question.Category.includes(this.props.location.state.category.title))
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
        <h2>Editing the {this.props.location.state.category.title} Category</h2>
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
)(EditCategory);
