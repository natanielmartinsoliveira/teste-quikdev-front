import React, { useEffect, useState } from 'react';
import axios from '../../axiosInstance';
import { Link } from 'react-router-dom';
import { Post } from '../../types';
import { useAuth } from '../../hooks/useAuth';
import  PostItem from './PostItem';

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    
    axios.get('http://localhost:5000/posts')
      .then(res => setPosts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Posts</h1>
      {user && <Link to="/new" className="btn btn-primary create-post-link">Create New Post</Link>}
      <div>
        {posts.map(post => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default PostList;

