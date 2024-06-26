import React, { useState, useEffect } from 'react';
import axios from '../../axiosInstance';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Post } from '../../types';

const PostForm: React.FC = () => {
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [image, setImage] = useState<File | null>(null);
    const { user } = useAuth();
    const { postId } = useParams<string>();
    const navigate = useNavigate();
    
    useEffect(() => {
      if (postId) {
        const fetchPost = async () => {
          try {
            const response = await axios.get<Post>(`http://localhost:5000/posts/${postId}`);
            const post = response.data;
            setTitle(post.title);
            setDescription(post.description);
            setImage(null);
          } catch (error) {
            console.error('Error fetching post:', error);
          }
        };
        fetchPost();
      }
    }, [postId]);

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      if (image) formData.append('image', image);
      formData.append('userId', user!._id.toString());
  
      try {
        if (postId) {
          await axios.put(`http://localhost:5000/posts/${postId}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
        } else {
          await axios.post('http://localhost:5000/posts', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
        }
        navigate('/');
      } catch (error) {
        console.error('Error submitting post:', error);
      }
    };
  
    return (
    <form onSubmit={handleSubmit} className="p-4 bg-light border rounded">
      <h1>Create Post</h1>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">Title</label>
        <input
          type="text"
          placeholder="Title"
          value={title}
          className="form-control"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="content" className="form-label">Description</label>
        <textarea
          id="content"
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
      </div>
      <div className="mb-3">
        <label htmlFor="imageUrl" className="form-label">Image URL</label>
        <input
          type="file"
          className="form-control"
          onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
        />
      </div>
      <button type="submit" className="btn btn-primary">Create Post</button>
    </form>
    );
};
  
export default PostForm;