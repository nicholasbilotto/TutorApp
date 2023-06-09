import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, reset } from 'redux-form';
import { fetchCategories } from '../../../actions'; 


class QuestionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hidden: true, qType: '' };
  }

  componentDidMount() {
    this.props.fetchCategories();
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
                    input.onChange([...input.value, e.target.value]);
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

  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
    this.setState({ hidden: false });
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

export default connect(mapStateToProps, { fetchCategories })(reduxForm({
  form: 'Form',
  validate, 
})(QuestionForm))













// import React from 'react';
// import { connect } from 'react-redux';
// import { Field, reduxForm, reset } from 'redux-form';
// import { fetchCategories } from '../../../actions'; 
// 
// class QuestionForm extends React.Component {
//   constructor(props) {
//       super(props);
//       this.state = {hidden: true, qType: ''}
//  }
// 
//   componentDidMount() {
//     this.props.fetchCategories(); 
//   }
// 
//   componentDidUpdate(prevProps) {
//     if (!prevProps.categories && this.props.categories) {
//       this.forceUpdate();
//     }
//   }
// 
//   renderError({ error, touched }) {
//     if (touched && error) {
//       return (
//         <div className="ui error message">
//           <div className="header">{error}</div>
//         </div>
//       );
//     }
//   }
// 
//   renderInput = ({ input, label, meta }) => {
//     const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
// 
//     return (
//       <div className={className}>
//         <label>{label}</label>
//         <input {...input} autoComplete="off" />
//         {this.renderError(meta)}
//       </div>
//     );
//   };
// 
// renderSelect = ({ input, label }) => {
//   console.log(this.props.categories)
//   return (
//     <div className="field">
//       <label>{label}</label>
//       <div>
//         {this.props.categories.filter(category => category.subject === this.props.subject).map(category => (
//           <div key={category.id}>
//             <input type="checkbox" value={category.title} onChange={e => {
//               input.onChange([...input.value, e.target.value])
//             }} />
//             <label>{category.title}</label>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// } 
// 
//   renderType = ({ input, label }) => {
//     return (
//       <div className="field">
//         <label>{label}</label>
//         <select {...input} className="ui select" onChange={e => {
//           input.onChange([...input.value, e.target.value])
//           console.log(e) 
//         }}>
//           <option>Select...</option>
//           <option>Multiple Choice</option>
//           <option>Open Ended</option>
//         </select>
//       </div>
//       )
//   }
//   
//   onSubmit = formValues => {
//     this.props.onSubmit(formValues);
//     this.setState({ hidden: false })
//     this.props.dispatch(reset('Form'));
//   };
// 
//   render() {
//     if (this.state.hidden)
//       return (
//         <form
//           onSubmit={this.props.handleSubmit(this.onSubmit)}
//           className="ui form error"
//         >
//           <Field name="qtype" component={this.renderType} label="Question Type" />
//           <Field name="title" component={this.renderInput} label="Enter Question" />
//           <Field
//             name="description"
//             component={this.renderInput}
//             label="Additional Infomation..."
//           />
//           <Field name="Category" component={this.renderSelect} label="Select Category" />
//           <button className="ui button primary">Submit</button>
//         </form>
//       );
//     else {
//       return (
//         <div>
//           <h3 className="ui message">
//             {this.props.type} Added!
//           </h3>
//           <div>
//             <button onClick={() => { this.setState({hidden: true}) }} className="ui button primary">Create New {this.props.type} </button>
//           </div>
//         </div>
//         );
//     }
//   }
// }
// 
// const validate = formValues => {
//   const errors = {};
//   if (!formValues.title) {
//     errors.title = 'Please add a question';
//   }
//   return errors;
// };
// 
// const mapStateToProps = (state) => {
//   return {
//     categories: Object.values(state.categories),
//   };
// };
// 
// export default connect(mapStateToProps, { fetchCategories })(reduxForm({
//   form: 'Form',
//   validate, 
// })(QuestionForm))
// 
