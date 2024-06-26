import React, { useEffect, useState } from 'react';
import axios from '../../axiosInstance';
import { Post } from '../../types';

const Report: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await axios.get('http://localhost:5000/posts');
        const postsData = await Promise.all(response.data.map(async (post: Post) => {
          try {
            const commentsResponse = await axios.get(`http://localhost:5000/comments?postId=${post._id}`);
            const likesResponse = await axios.get(`http://localhost:5000/posts/${post._id}`);
            return {
              ...post,
              comment: commentsResponse.data.length,
              likes: likesResponse.data.likes,
              dislikes: likesResponse.data.dislikes
            };
          } catch (error) {
            console.error('Error fetching comments/likes:', error);
            return {
              ...post,
              comment: 0,
              likes: 0,
              dislikes:0
            };
          }
        }));
        setPosts(postsData);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchReport();
  }, []);

  return (
    <div>
      <h2>Report</h2>
      <ul>
        {posts.map(post => (
          <li key={post._id}>
            {post.title} - {post.likes} Likes, {post.dislikes} Dislikes, {post?.comment} Comments
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Report;
