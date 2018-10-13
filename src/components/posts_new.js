import React, {Component} from 'react';
import { Field, reduxForm} from 'redux-form';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {createPost} from '../actions';

class PostsNew extends Component {
  renderField(field){
    const className=`form-group`
    return(
      <div className="form-group has-danger">
        <label>{field.label}</label>
        <input
          className="form-control"
          type="text"
          {...field.input}
        />
        <div className="text-help">
          {field.meta.touched? field.meta.error : ""  }
        </div>
      </div>
    );
  }

  onSubmit(values){
    this.props.createPost(values,()=>{
      this.props.history.push("/")
    });


  }

  render(){
    const {handleSubmit} = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label="Title"
          name="title"
          component={this.renderField}
        />
        <Field
          label="Categories"
          name="categories"
          component={this.renderField}
        />
        <Field
          label="Post Content"
          name="content"
          component={this.renderField}
        />
        <button type="submit" className="btn btn-primary">SUBMIT</button>
        <Link className="btn btn-danger" to="/"> DELETE</Link>
      </form>
    );
  }
}

function validate(values){
  const errors = {};

  if (!values.title || values.title.length < 3){
    errors.title="Please enter a title that is at least 3 characters long"
  }
  if (!values.categories){
    errors.categories="Please enter a categories"
  }
  if (!values.content){
    errors.content="Please enter a content"
  }

  return errors;
}

export default reduxForm({
  validate,
  form: "PostsNewForm"
})(
  connect(null,{createPost})(PostsNew)
);
