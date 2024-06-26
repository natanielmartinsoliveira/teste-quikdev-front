import React, { useState, useEffect } from 'react';
import axios from '../../axiosInstance';
import { PostHistoryType } from '../../types';

interface PostHistoryProps {
  postId: number;
}

const PostHistory: React.FC<PostHistoryProps> = ({ postId }) => {
  const [history, setHistory] = useState<PostHistoryType[]>([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get<PostHistoryType[]>(`http://localhost:5000/posts/${postId}/history`);
        setHistory(response.data);
      } catch (error) {
        console.error('Error fetching post history:', error);
      }
    };

    fetchHistory();
  }, [postId]);

  return (
    <div>
      <p></p>
      {history.map((entry) => (
        <div key={entry._id}>
          <p>Last update date {entry.createdAt.toLocaleString('pt-BR',{ year: 'numeric', month: '2-digit', day: '2-digit' })}</p>
        </div>
      ))}
    </div>
  );
};

export default PostHistory;