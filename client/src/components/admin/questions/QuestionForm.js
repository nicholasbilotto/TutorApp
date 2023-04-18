import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, reset, initialize } from 'redux-form';
import { fetchCategories, createQuestion } from '../../../actions'; 


class QuestionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hidden: true, qType: '' };
  }

  componentDidMount() {
    this.props.fetchCategories();
    console.log(this.props.categories);
    if (this.props.categories) {
      this.forceUpdate();
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.categories && this.props.categories) {
      // Initialize the form values with the categories data
      const initialValues = {
        Category: this.props.categories
          .filter((category) => category.subject === this.props.subject)
          .map((category) => category.title),
      };
      this.props.dispatch(initialize('Form', initialValues));
    }
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

    renderSelect = ({ input, label }) => {
      return (
        <div className="field">
          <label>{label}</label>
          <div>
            {this.props.categories
              .filter((category) => category.subject === this.props.subject)
              .map((category) => (
                <div key={category.id}>
                  <input
                    type="checkbox"
                    value={category.title}
                    onChange={(e) => {
                      if (e.target.checked) {
                        input.onChange([...input.value, e.target.value]);
                      } else {
                        input.onChange(input.value.filter((val) => val !== e.target.value));
                      }
                    }}
                  />
                  <label>{category.title}</label>
                </div>
              ))}
          </div>
        </div>
      );
    };
  renderType = ({ input, label }) => {
    return (
      <div className="field">
        <label>{label}</label>
        <select
          {...input}
          className="ui select"
          onChange={(e) => {
            input.onChange(e.target.value);
            console.log(e);
            this.setState({ qType: e.target.value });
          }}
        >
          <option>Select...</option>
          <option value="mc">Multiple Choice</option>
          <option value="oe">Open Ended</option>
        </select>
      </div>
    );
  };

  renderMultipleChoiceInput = ({ input, label }) => {
    return (
      <div className="field">
        <label>{label}</label>
        <input type="text" {...input} autoComplete="off" />
      </div>
    );
  };

  renderOpenEndedInput = ({ input, label }) => {
    return (
      <div className="field">
        <label>{label}</label>
        <textarea {...input} autoComplete="off" />
      </div>
    );
  };

renderImage = ({ input, label }) => {
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      input.onChange(reader.result);
    };
  };

  return (
    <div className="field">
      <label>{label}</label>
      <input type="file" accept="image/*" onChange={handleImageChange} />
    </div>
  );
};

onSubmit = (formValues) => {
  console.log('Form values before submitting:', formValues);

  this.props.createQuestion(formValues, this.props.subject);
  this.setState({ "hidden": false })
  this.props.dispatch(reset('Form'));

};

  render() {
    if (this.state.hidden) {
      return (
        <form
          onSubmit={this.props.handleSubmit(this.onSubmit)}
          className="ui form error"
        >
          <Field
            name="qtype"
            component={this.renderType}
            label="Question Type"
          />
          {this.state.qType === 'mc' && (
            <>
            <Field name="title" component={this.renderInput} label="Enter Question" />
            <Field
              name="multipleChoiceInput"
              component={this.renderMultipleChoiceInput}
              label="Enter multiple choice options (comma separated)"
            />
            <Field name="image" component={this.renderImage} label="Upload Image" />
            </>
          )}
          {this.state.qType === 'oe' && (
            <>
            <Field name="title" component={this.renderInput} label="Enter Question" />
            <Field
              name="openEndedInput"
              component={this.renderOpenEndedInput}
              label="Enter Additional Info"
            />
            <Field name="image" component={this.renderImage} label="Upload Image" />
            </>
          )}
          <Field name="Category" component={this.renderSelect} label="Select Category" />
          <button className="ui button primary">Submit</button>
        </form>
      );
    } else {
      return (
        <div>
          <h3 className="ui message">{this.props.type} Added!</h3>
          <div>
            <button
              onClick={() => {
                this.setState({ hidden: true });
              }}
              className="ui button primary"
            >
              Create New {this.props.type}{" "}
            </button>
          </div>
        </div>
      );
    }
  }
}


const validate = formValues => {
  const errors = {};
  if (!formValues.title) {
    errors.title = 'Please add a question';
  }
  return errors;
};

const mapStateToProps = (state) => {
  return {
    categories: Object.values(state.categories),
  };
};

export default connect(mapStateToProps, { fetchCategories, createQuestion })(reduxForm({
  form: 'Form',
  validate, 
})(QuestionForm))