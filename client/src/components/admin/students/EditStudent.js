import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchStudent, fetchCategories, editCategory } from '../../../actions';


class EditStudent extends React.Component {

  componentDidMount() {
    this.props.fetchStudent(this.props.match.params.id);
    this.props.fetchCategories();
  }

  activateCat = (id, currentStatus) => {
    const updatedCategory = {
      ...this.props.categories.find(category => category.id === id),
      status: currentStatus === 'inactive' ? 'active' : 'inactive'
    };
    this.props.editCategory(id, updatedCategory);
  }

   renderActiveList() {
      return this.props.categories
        .filter(
          (category) =>
            Array.isArray(category.students) &&
            category.students.includes(this.props.student.title) &&
            !category.completed
        )
        .map((category) => {
          return (
            <div className="item" key={category.id}>
              <div className="right floated content">
                <button
                  onClick={() => this.activateCat(category.id, category.status)}
                  className={`ui button ${
                    category.status === 'active' ? 'green' : ''
                  }`}
                >
                  {category.status}
                </button>
              </div>
              <i className="large middle aligned icon book" />
              <div className="content">
                {category.title}
                <div className="description">{category.description}</div>
              </div>
            </div>
          );
        });
}

      renderCompletedList() {
        return this.props.categories
      .filter(
        (category) =>
          Array.isArray(category.students) &&
          category.students.includes(this.props.student.title) &&
          category.completed
      )
      .map((category) => {
        return (
          <div className="item" key={category.id}>
          <div className="right floated content">
            <button className="ui button" onClick={()=> this.props.history.push(`/admin/edit/student/${this.props.match.params.id}/review/${category.id}`)} >Review</button>
          </div>
            <i className="large middle aligned icon book" />
            <div className="content">
              {category.title}
              <div className="description">{category.description}</div>
            </div>
          </div>
        );
      });
  }

    render() {
        const { student } = this.props;

        if (!student) {
          return <div>Loading...</div>;
        }

        return (
          <div>
            <h3>Viewing {student.title}</h3>
            <h4>Active Tests</h4>
            <div className="ui middle aligned divided list">
              {this.renderActiveList()}
            </div>
            <br></br>
            <h4>Completed Tests</h4>
            <div className="ui middle aligned divided list">
              {this.renderCompletedList()}
            </div>
          </div>
        );
      }
    
}



const mapStateToProps = (state, ownProps) => {
  return { student: state.students[ownProps.match.params.id], categories: Object.values(state.categories) };
};

export default connect(
  mapStateToProps,
  { fetchStudent, fetchCategories, editCategory }
)(EditStudent);
