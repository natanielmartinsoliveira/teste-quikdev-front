import React, { useState } from 'react';
import axios from '../../axiosInstance';
import {useAuth} from '../../hooks/useAuth';
import { Comment } from '../../types';

interface CommentItemProps {
  comment: Comment;
  onDelete: (updatedComment: Comment) => void;
  onUpdate: (updatedComment: Comment) => void;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment, onDelete, onUpdate }) => {
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);
  const [content, setContent] = useState(comment.description);

  const handleEdit = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/comments/${comment._id}`, { content });
      onUpdate(response.data); // Atualiza o comentário na lista
      setEditing(false);
    } catch (error) {
      console.error('Error editing comment:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:5000/comments/${comment._id}`);
      onDelete(response.data);
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const handleToggleEdit = () => {
    setEditing(!editing);
    setContent(comment.description); // Restaura o conteúdo original ao cancelar a edição
  };

  return (
    <div className={`comment-item ${comment.deleted ? 'deleted-comment' : ''}`}>
      {editing ? (
        <div className="mb-3 p-2 border rounded">
          <div className="fw-bold">{comment.author}</div>
          <div><textarea value={content} onChange={(e) => setContent(e.target.value)} className="form-control"/></div>
          <div className="text-end mt-2">
            <button onClick={handleEdit} className="btn btn-success">Save</button>
            <button onClick={handleToggleEdit} className="btn btn-danger">Cancel</button>
          </div>
        </div>
      ) : (
        <div className="mb-3 p-2 border rounded">
          <div className="fw-bold">{comment.userId}</div>
          <div>{comment.deleted ? 'Removed by user' : comment.description}</div>
          {(user?._id == comment.userId || user?._id == comment.postUserId) && !comment.deleted? (
            <div className="text-end mt-2">
              <button onClick={handleToggleEdit} className="btn btn-primary">Edit</button>
              <button onClick={handleDelete} className="btn btn-danger">Remove</button>
            </div>
          ) : null}
        </div>
      )}
      
    </div>

    
  );
};

export default CommentItem;
