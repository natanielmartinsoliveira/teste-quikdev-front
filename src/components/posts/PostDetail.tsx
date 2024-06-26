import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Post, Comment } from '../../types';
import { useAuth } from '../../hooks/useAuth';

/*const PostDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const history = useNavigate();
    const [post, setPost] = useState<Post | null>(null);
    const [comment, setComment] = useState<string>('');
    const { user } = useAuth();
  
    useEffect(() => {
      axios.get(`http://localhost:5000/posts/${id}`)
        .then(res => setPost(res.data))
        .catch(err => console.error(err));
    }, [id]);
  
    const handleDelete = () => {
      axios.delete(`http://localhost:5000/posts/${id}`, {
        headers: { Authorization: `Bearer ${user?.access_token}` }
      })
        .then(() => history('/'))
        .catch(err => console.error(err));
    };
  
    const handleCommentSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      axios.post(`http://localhost:5000/posts/${id}/comments`, { content: comment }, {
        headers: { Authorization: `Bearer ${user?.access_token}` }
      })
        .then(res => setPost(res.data))
        .catch(err => console.error(err));
    };
  
    const handleLike = () => {
      axios.post(`http://localhost:5000/posts/${id}/like`, {}, {
        headers: { Authorization: `Bearer ${user?.access_token}` }
      })
        .then(res => setPost(res.data))
        .catch(err => console.error(err));
    };
  
    if (!post) return <div>Loading...</div>;
  
    return (
      <div>
        <h1>{post.title}</h1>
        <p>{post.description}</p>
        <button onClick={handleLike}>Like ({post.likes})</button>
        {user && <button onClick={handleDelete}>Delete Post</button>}
        <h3>Comments</h3>
        <ul>
          {post?.comments?.map((comment: Comment, index: number) => (
            <li key={index}>{comment.text}</li>
          ))}
        </ul>
        {user && (
          <form onSubmit={handleCommentSubmit}>
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button type="submit">Add Comment</button>
          </form>
        )}
      </div>
    );
};
  
export default PostDetail;*/