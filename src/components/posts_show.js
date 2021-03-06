import React, {Component} from 'react';
import { Field, reduxForm} from 'redux-form';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchPost, deletePost} from '../actions';


class PostsShow extends Component {

  componentDidMount(){
    const {id} = this.props.match.params;
    this.props.fetchPost(id);
  }

  onDeleteClick(){
    const {id} = this.props.match.params;
    this.props.deletePost(id,() => {
      this.props.history.push("/")
    });
  }

  render(){
    const {post} = this.props;

    if(!post){
      return(
        <div> Loading you a post....</div>
      )
    }

    return(
      <div>
        <Link className="btn btn-primary" to="/">
          Back to Index
        </Link>
        <button
          className="btn btn-danger pull-xs-right"
          onClick={this.onDeleteClick.bind(this)}
          >
          DELETE this Post
        </button>
        <h3>{post.title}</h3>
        <h3>{post.categories}</h3>
        <p>{post.content}</p>
      </div>
    );
  }
}

function mapStateToProps({posts},ownProps){
    return {post: posts[ownProps.match.params.id]};
}

export default connect(mapStateToProps,{ fetchPost, deletePost })(PostsShow);
