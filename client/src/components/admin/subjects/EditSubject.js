import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { Route, NavLink, Link } from 'react-router-dom';
import { fetchSubject } from '../../../actions';
import NewCategory from './NewCategory';
import NewQuestion from '../questions/NewQuestion';
import QuestionList from '../questions/QuestionList';
import CategoryList from './CategoryList';


class EditSubject extends React.Component {
  componentDidMount() {
    this.props.fetchSubject(this.props.match.params.id);
  }

  render() {
    const { subject } = this.props;

    if (!subject) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <h3>Editing {subject.title}</h3>
          <div className="ui tabular menu">
            <NavLink className="item" activeClassName="active" exact to={`/admin/edit/subject/${this.props.match.params.id}`}>{subject.title} Categories</NavLink>
            <NavLink className="item" activeClassName="active" to={`/admin/edit/subject/${this.props.match.params.id}/newcategory`}>New {subject.title} Category</NavLink>
            <NavLink className="item" activeClassName="active" to={`/admin/edit/subject/${this.props.match.params.id}/questions`}>All {subject.title} Questions</NavLink>
            <NavLink className="item" activeClassName="active" to={`/admin/edit/subject/${this.props.match.params.id}/newquestion`}>New {subject.title} Question</NavLink>
          </div>
          <div className="ui segment">
            <Route exact path={`/admin/edit/subject/${this.props.match.params.id}`} render={() => <CategoryList subject={subject.title} />} />
            <Route path={`/admin/edit/subject/${this.props.match.params.id}/newcategory`} render={() => <NewCategory title={subject.title} />} />
            <Route path={`/admin/edit/subject/${this.props.match.params.id}/questions`} render={() => <QuestionList subject={subject.title} />} />
            <Route path={`/admin/edit/subject/${this.props.match.params.id}/newquestion`} render={() => <NewQuestion title={subject.title} />} />
          </div>
          <Link to="/admin/edit" className="ui button">{`<- Back to Home`}</Link>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { subject: state.subjects[ownProps.match.params.id] };
};

export default connect(
  mapStateToProps,
  { fetchSubject }
)(EditSubject);


