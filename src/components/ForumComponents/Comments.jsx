import axios from "axios";
import React, { Component } from "react";
import AddCommentForm from "./AddCommentForm";

export class Comments extends Component {
  state = {
    commentList: [],
    username: "",
  };

  handleComments = () => {
    axios
      .get(`${process.env.REACT_APP_API_HOST}/comment/all/${this.props.id}`, {
        withCredentials: true,
      })
      .then((response) => {
        this.setState({
          commentList: [...response.data],
        });
      })
      .catch((err) => this.props.history.push("/500"));
  };

  handleDelete = (commentId) => {
    axios
      .delete(`${process.env.REACT_APP_API_HOST}/comment/${commentId}`)
      .then(() => this.props.history.push("/"))
      .catch(() => this.props.history.push("/500"));
  };

  componentDidMount() {
    this.handleComments();
  }

  render() {
    const { commentList } = this.state;
    return (
      <div>
        <AddCommentForm
          id={this.props.id}
          history={this.props.history}
          handleComments={this.handleComments}
        />
        {commentList.length && (
          <>
            {commentList.map((comment) => {
              return (
                <div>
                  <p>{comment.description}</p>
                  <p>{comment.userId.username}</p>
                  <button onClick={() => this.handleDelete(comment._id)}>
                    Delete
                  </button>
                </div>
              );
            })}
          </>
        )}
      </div>
    );
  }
}

export default Comments;
