import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { fetchStudent, fetchCategories } from '../../actions';
import { Link } from 'react-router-dom';


class Student extends React.Component {
  componentDidMount() {
    this.props.fetchStudent(this.props.match.params.id);
    this.props.fetchCategories(); 
  }

  testCount = () => {
   const activeCategories = this.props.categories.filter(
    category =>
      Array.isArray(category.students) &&
      category.students.includes(this.props.student.title) &&
      category.status === "active"
    );
    return activeCategories.length;
  } 

  activeTests = () => {
    console.log(this.props.categories)

    if (!this.props.categories) {
      return <div>Loading...</div>
    }


return this.props.categories
  .filter(category => 
    Array.isArray(category.students) &&
    category.students.includes(this.props.student.title) &&
    category.status === "active"
  )
  .map(category => (
    <div className="card" key={category.id}>
      <div className="content grid">
        <i className="right floated icon edit outline" />
        <div className="two column row">
          <div className="ui header">{category.title}</div>
          <div className="column description">{category.description}</div>
        </div>
      </div>
      <div class="extra content">
        <Link to={`/student/${this.props.student.id}/test/${category.id}`} class="ui basic green button">Start</Link>
      </div>
    </div>
  ));

}



  render() {
  	const student =  this.props.student;
    const categories = this.props.categories;

    if (!student || !categories) {
      return <div>Loading...</div>;
    }


    return (
      <div>
        <h3>Hello {student.title}, you have {this.testCount()} tests...</h3>
        <br></br>
        <div className="ui cards">
          {this.activeTests()}
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
  { fetchStudent, fetchCategories }
)(Student);