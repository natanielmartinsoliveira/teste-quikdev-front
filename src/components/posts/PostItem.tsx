import React, { useState, useEffect } from 'react';
import axios from '../../axiosInstance';
import { useAuth } from '../../hooks/useAuth';
import { Post, Like } from '../../types';
import CommentList from '../comment/CommentList';
import CommentForm from '../comment/CommentForm';
import { useNavigate } from 'react-router-dom';
import PostHistory from './PostHistory';

interface PostItemProps {
  post: Post;
}

const PostItem: React.FC<PostItemProps> = ({ post }) => {
  const { user } = useAuth();
  const [likes, setLikes] = useState<Like[]>([]);
  const [dislikes, setDislikes] = useState<Like[]>([]);
  //const [comments, setComments] = useState<Comment[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/likes/${post._id}/likes`);
        const allLikes = response.data;
        console.log('alooo', allLikes);
        setLikes(allLikes.filter((like: Like) => like.type === 'like'));
        setDislikes(allLikes.filter((like: Like) => like.type === 'dislike'));
      } catch (error) {
        console.error('Error fetching likes:', error);
      }

    };
    fetchLikes();
    console.log('GGGGGG',user?._id);
  }, [post._id]);

  /*useEffect(() => {
    const fetchComments = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/comments?postId=${post._id}`);
            setComments(response.data);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
      
    };
    fetchComments();
  }, [post._id]);
*/
  const handleLike = async () => {
      try {
        const response = await axios.post('http://localhost:5000/likes', { postId: post._id, type: 'like'  });
        setLikes([...likes, response.data]);
      } catch (error) {
        console.error('Error liking post:', error);
      }
    
  };

  const handleDislike = async () => {
    try {
      const response = await axios.post('http://localhost:5000/likes', { postId: post._id, type: 'dislike' });
      
      setDislikes([...dislikes, response.data]);
    } catch (error) {
      console.error('Error disliking post:', error);
    }
  };

  const handleDelete = async () => {
      try {
        await axios.delete(`http://localhost:5000/posts/${post._id}`);
      } catch (error) {
        console.error('Error deleting post:', error);
      }
  };

  const handleEdit = async () => {
    navigate(`/edit-post/${post._id}`);
  };

  return (
    <div className="card mb-4">
      {user && user?._id == post.userId && (
        <div>
          <div className="d-flex justify-content-end float-left outerDiv">
            <button onClick={handleDelete} className="btn btn-danger">Delete</button>
          </div>
          <div className="d-flex justify-content-end float-left outerDiv2">
            <button onClick={handleEdit} className="btn btn-primary">Edit</button>
          </div>
      </div>
      )}
      {post.image && <img src={`http://localhost:5000/${post.image}`} className="card-img-top card-img-top" alt="Post image" />}
      <div className="card-body">
        <p className="card-text">{post.title}</p>
        <p className="card-text">{post.description}</p>
        <div className="d-flex justify-content-start">
          {user && (
            <button onClick={handleLike} className="btn btn-light">
              Like ({likes.length})
            </button>
          )}
          {user && (
            <button onClick={handleDislike} className="btn btn-dark">
              Dislike ({dislikes.length})
            </button>
          )}
         
        </div>
        <div>{user && (<CommentList postId={post._id} />)}</div>
        <div className="d-flex justify-content-end float-right">{user && (<PostHistory postId={post._id} />)}</div>
      </div>
    </div>
  );
};

export default PostItem;