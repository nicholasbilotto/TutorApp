import React from 'react';
import { Field, reduxForm, reset } from 'redux-form';
import { connect } from 'react-redux';
import { fetchStudents } from '../../actions';

class Form extends React.Component {
  constructor(props) {
      super(props);
      this.state = {hidden: true}
 }

  componentDidMount() {
    this.props.fetchStudents();
  }

  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`;

    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  };

  renderStudent = ({ input, label }) => {
    console.log(this.props.students)
    return (
      <div className="field">
        <label>{label}</label>
        <div>
          {this.props.students
            .map((student) => (
              <div key={student.id}>
                <input
                  type="checkbox"
                  value={student.title}
                  onChange={(e) => {
                    input.onChange([...input.value, e.target.value]);
                  }}
                />
                <label>{student.title}</label>
              </div>
            ))}
        </div>
      </div>
    );
  };

  onSubmit = formValues => {
    this.props.onSubmit(formValues);
    this.setState({hidden: false})
    this.props.dispatch(reset('Form'));
  };

  render() {
    if (this.state.hidden)
      return (
        <form
          onSubmit={this.props.handleSubmit(this.onSubmit)}
          className="ui form error"
        >
          <Field name="title" component={this.renderInput} label="Enter Name" />
          <Field
            name="description"
            component={this.renderInput}
            label="Additional Infomation..."
          />
            {this.props.type !== "Student" && this.props.students && (
              <>
              <Field name="students" component={this.renderStudent} label="Select Students" />
              </>
            )}
          <button className="ui button primary">Submit</button>
        </form>
      );
    else {
      return (
        <div>
          <h3 className="ui message">
            {this.props.type} Added!
          </h3>
          <div>
            <button onClick={() => { this.setState({hidden: true}) }} className="ui button primary">Create New {this.props.type} </button>
          </div>
        </div>
        );
    }
  }
}

const validate = formValues => {
  const errors = {};
  if (!formValues.title) {
    errors.title = 'You must enter a name';
  }
  return errors;
};

const mapStateToProps = (state) => {
  return {
    students: Object.values(state.students),
  };
};

export default connect(mapStateToProps, { fetchStudents })(reduxForm({
  form: 'Form',
  validate, 
  initialValues: {
    status: 'inactive',
    completed: false
  }
})(Form))
