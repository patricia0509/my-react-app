import React from 'react';
import { Link } from 'react-router-dom';

const ThreadItem = ({ thread, owner }) => {
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
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '16px',
        marginBottom: '16px',
        backgroundColor: '#fff',
      }}
    >
      <Link to={`/thread/${thread.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <h3 style={{ margin: '0 0 8px 0', color: '#333' }}>{thread.title}</h3>
      </Link>

      {thread.body && (
        <p
          style={{
            margin: '8px 0',
            color: '#666',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {thread.body}
        </p>
      )}

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '12px',
          fontSize: '14px',
          color: '#888',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {owner?.avatar && (
            <img
              src={owner.avatar}
              alt={owner.name}
              style={{ width: '24px', height: '24px', borderRadius: '50%' }}
            />
          )}
          <span>{owner?.name || 'Unknown'}</span>
        </div>

        <div style={{ display: 'flex', gap: '16px' }}>
          <span>
            {thread.totalComments}
            {' '}
            comments
          </span>
          <span>{formatDate(thread.createdAt)}</span>
        </div>
      </div>
    </div>
  );
};

export default ThreadItem;