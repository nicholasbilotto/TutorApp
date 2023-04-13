import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchSubjects, deleteSubject } from '../../../actions';


class SubjectList extends React.Component {
  componentDidMount() {
    this.props.fetchSubjects();
  }

  renderAdmin(subject) {
    if (subject.userId === this.props.currentUserId) {
      return (
        <div className="right floated content">
          <Link to={`/subject/edit/${subject.id}`} className="ui button primary">
            Edit
          </Link>
          <button className="ui button negative">Delete</button>
        </div>
      );
    }
  }


  renderList() {
    return this.props.subjects.map(subject => {
      return (
        <div className="item" key={subject.id}>
        <div className="right floated content">
          <Link to={`/admin/edit/subject/${subject.id}`} className="ui button">Edit</Link>
        	 <Link to={{ pathname: `/admin/delete/subject/${subject.id}`, state: { subject }}} className="ui negative button">Delete</Link>
        </div>
          <i className="large middle aligned icon book" />
          <div className="content">
            {subject.title}
            <div className="description">{subject.description}</div>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <h2>Subjects</h2>
        <div className="ui middle aligned divided list">{this.renderList()}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    subjects: Object.values(state.subjects),
  };
};

export default connect(
  mapStateToProps,
  { fetchSubjects, deleteSubject }
)(SubjectList);
