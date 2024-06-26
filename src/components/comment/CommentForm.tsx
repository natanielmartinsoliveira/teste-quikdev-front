import React, { useState } from 'react';
import axios from '../../axiosInstance';
import { useAuth } from '../../hooks/useAuth';

interface CommentFormProps {
  postId: number;
  onCommentCreated: () => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ postId , onCommentCreated }) => {
  const [text, setText] = useState('');
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newComment = {
      text,
      postId,
      userId: user!._id
    };
    try {
        const response = await axios.post('http://localhost:5000/comments', newComment);
        console.log(response.data);
        setText('');
        onCommentCreated();
      } catch (error) {
        console.error('Error submitting comment:', error);
      }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-light border rounded">
      <div className="mb-3">
        <label htmlFor="content" className="form-label">Content</label>
        <textarea
          placeholder="Add a comment"
          value={text}
          className="form-control"
          onChange={(e) => setText(e.target.value)}
        ></textarea>
      </div>
      <button type="submit" className="btn btn-primary">Comment</button>
    </form>
  );
};

export default CommentForm;
