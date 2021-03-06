import React, { useRef } from "react";
import { useStoreContext } from '../../utils/GlobalState';
import { ADD_POST, LOADING } from '../../utils/actions';
import API from "../../utils/API"

const CreatePostForm = () => {
  const titleRef = useRef();
  const bodyRef = useRef();
  const authorRef = useRef();
  const [state, dispatch] = useStoreContext();

  const handleSubmit = e => {
    e.preventDefault();
    dispatch({ type: LOADING });
    API.savePost({
      title: titleRef.current.value,
      body: bodyRef.current.value,
      author: authorRef.current.value,
    })
    .then((results) => {
      dispatch({
        type: ADD_POST,
        post: results.data,
      });
    })
    .catch((err) => console.log(err));

    titleRef.current.value = '';
    bodyRef.current.value = '';


  };

  return (
    <div>
      <div className="jumbotron">
        <img
          className="img-fluid img-thumbnail"
          src="https://images.pexels.com/photos/459688/pexels-photo-459688.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        />
      </div>
      <h1>Create a blog post</h1>
      <form className="form-group mt-5 mb-5" onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input 
        className="form-control mb-5" 
        required 
        ref={titleRef}
        id="title"
        placeholder="Title" 
        />
        <label htmlFor="body">Body:</label>
        <textarea 
        className="form-control mb-5" 
        required 
        ref={bodyRef}
        id="body"
        placeholder="Body" 
        />
        <label htmlFor="screen name">Screen Name:</label>
        <input 
        className="form-control mb-5" 
        ref={authorRef}
        id="screen name"
        placeholder="Screen name" 
        />
        <button 
        className="btn btn-success mt-3 mb-5" 
        disabled={state.loading}
        type="submit">
          Save Post
        </button>
      </form>
    </div>
  );
};

export default CreatePostForm;
