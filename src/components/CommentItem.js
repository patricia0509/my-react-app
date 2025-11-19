import React from 'react';

const CommentItem = ({ comment }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div
      style={{
        border: '1px solid #eee',
        borderRadius: '8px',
        padding: '12px',
        marginBottom: '12px',
        backgroundColor: '#f9f9f9',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '8px',
        }}
      >
        {comment.owner?.avatar && (
          <img
            src={comment.owner.avatar}
            alt={comment.owner.name}
            style={{ width: '32px', height: '32px', borderRadius: '50%' }}
          />
        )}
        <div>
          <strong>{comment.owner?.name || 'Unknown'}</strong>
          <div style={{ fontSize: '12px', color: '#888' }}>
            {formatDate(comment.createdAt)}
          </div>
        </div>
      </div>

      <p style={{ margin: '0', lineHeight: '1.5' }}>
        {comment.content}
      </p>
    </div>
  );
};

export default CommentItem;