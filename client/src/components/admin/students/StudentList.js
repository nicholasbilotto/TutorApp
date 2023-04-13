import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchStudents, deleteStudent } from '../../../actions';

class StudentList extends React.Component {
  componentDidMount() {
    this.props.fetchStudents();
  }

  renderList() {
    return this.props.students.map(student => {
      return (
        <div className="item" key={student.id}>
        <div className="right floated content">
          <Link to={`/admin/edit/student/${student.id}`} className="ui button">View</Link>
        	<Link to={{ pathname: `/admin/delete/student/${student.id}`, state: { student }}} className="ui negative button">Delete</Link>
        </div>
          <i className="large middle aligned icon child" />
          <div className="content">
            {student.title}
            <div className="description">{student.description}</div>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <h2>Students</h2>
        <div className="ui celled list">{this.renderList()}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    students: Object.values(state.students),
  };
};

export default connect(
  mapStateToProps,
  { fetchStudents,deleteStudent }
)(StudentList);