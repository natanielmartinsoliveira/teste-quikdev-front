import React, { useCallback, useEffect, useState } from 'react';
import axios from '../../axiosInstance';
import { Comment } from '../../types';
import CommentItem from './CommentItem';
import CommentForm from './CommentForm';
import { useAuth } from '../../hooks/useAuth';

interface CommentListProps {
  postId: number;
}

const CommentList: React.FC<CommentListProps> = ({ postId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const { user } = useAuth();

  const fetchComments = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:5000/comments?postId=${postId}`);
      setComments(response.data);
    } catch (error) {
      console.error('Erro ao buscar comentários:', error);
    }
  }, [postId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

 
  const handleUpdateComment = (updatedComment: any) => {
    // Atualiza o comentário na lista após a edição
    const updatedComments = comments.map((comment) =>
      comment._id === updatedComment._id ? updatedComment : comment
    );
    setComments(updatedComments);
  };

  return (
    <div className="mt-3">
      {comments.map(comment => (
        <CommentItem
        key={comment._id}
        comment={comment}
        onDelete={handleUpdateComment}
        onUpdate={handleUpdateComment}
      />
      ))}
      <div>{user && (<CommentForm postId={postId} onCommentCreated={() => fetchComments()}/>)}</div>
    </div>
  );
};

export default CommentList;
