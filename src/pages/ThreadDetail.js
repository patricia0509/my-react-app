import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchThreadDetail, createComment } from '../store/threadsSlice';
import CommentItem from '../components/CommentItem';
import LoadingSpinner from '../components/LoadingSpinner';

const ThreadDetail = () => {
  const { threadId } = useParams();
  const dispatch = useDispatch();
  const { currentThread, isLoading, error } = useSelector((state) => state.threads);
  const { token } = useSelector((state) => state.auth);
  const [comment, setComment] = useState('');

  useEffect(() => {
    dispatch(fetchThreadDetail(threadId));
  }, [dispatch, threadId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!token) return;

    try {
      await dispatch(createComment({
        threadId,
        content: comment,
        token,
      })).unwrap();
      setComment('');
    } catch (error) {
      // Error handled by Redux
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) return <LoadingSpinner />;

  if (!currentThread) {
    return (
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
        <p>Thread not found.</p>
        <Link to="/">Back to threads</Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <Link to="/" style={{ marginBottom: '20px', display: 'inline-block' }}>
        ← Back to threads
      </Link>

      {error && (
        <div style={{
          color: 'red',
          backgroundColor: '#ffebee',
          padding: '10px',
          borderRadius: '4px',
          marginBottom: '16px'
        }}>
          {error}
        </div>
      )}

      <div style={{
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '20px',
        marginBottom: '20px',
        backgroundColor: '#fff'
      }}>
        <h1 style={{ margin: '0 0 16px 0' }}>{currentThread.title}</h1>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '16px',
          fontSize: '14px',
          color: '#888'
        }}>
          {currentThread.owner?.avatar && (
            <img
              src={currentThread.owner.avatar}
              alt={currentThread.owner.name}
              style={{ width: '32px', height: '32px', borderRadius: '50%' }}
            />
          )}
          <span>{currentThread.owner?.name}</span>
          <span>•</span>
          <span>{formatDate(currentThread.createdAt)}</span>
        </div>

        <p style={{ lineHeight: '1.6', margin: '0' }}>
          {currentThread.body}
        </p>
      </div>

      <h3>Comments ({currentThread.comments?.length || 0})</h3>

      {token && (
        <form onSubmit={handleCommentSubmit} style={{ marginBottom: '20px' }}>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write a comment..."
            required
            style={{
              width: '100%',
              minHeight: '100px',
              padding: '12px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              marginBottom: '8px',
              resize: 'vertical'
            }}
          />
          <button
            type="submit"
            style={{
              padding: '8px 16px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Add Comment
          </button>
        </form>
      )}

      {!token && (
        <p style={{
          backgroundColor: '#f8f9fa',
          padding: '12px',
          borderRadius: '4px',
          marginBottom: '20px'
        }}>
          <Link to="/login">Login</Link> to add a comment.
        </p>
      )}

      {currentThread.comments?.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        currentThread.comments?.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))
      )}
    </div>
  );
};

export default ThreadDetail;