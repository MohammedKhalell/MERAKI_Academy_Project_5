import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Comments = () => {
  //===================================================

  //================= useState =========================

  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(false);

  //===================================================

  //================= Redux ========================

  const dispatch = useDispatch();

  const { isLoggedIn } = useSelector((state) => {
    return {
      isLoggedIn: state.auth.isLoggedIn,
    };
  });

  //================= Functions ========================

  //!============ createPostComment ====================

  const createPostComment = async (id) => {
    try {
      const result = await axios.post(
        `https://meraki-academy-project-5-a2ze.onrender.com/comments/post/${id}`
      );
      if (result.data.success) {
        const comments = result.data.result;
        dispatch(setComments({ comments: comments, post_id: id }));
      } else throw Error;
    } catch (error) {
      if (!error.response.data) {
        return setMessage(error.response.data.message);
      }
      setMessage("Error happened while Get Data, please try again");
    }
  };

  //===================================================

  return <div>Comments</div>;
};

export default Comments;
