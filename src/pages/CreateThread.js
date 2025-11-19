import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { createThread } from '../store/threadsSlice';
import LoadingSpinner from '../components/LoadingSpinner';

const CreateThread = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [category, setCategory] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.threads);
  const { token } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) return;

    try {
      await dispatch(createThread({
        threadData: { title, body, category: category || undefined },
        token,
      })).unwrap();
      navigate('/');
    } catch (error) {
      // Error handled by Redux
    }
  };

  if (!token) {
    return (
      <div style={{ maxWidth: '600px', margin: '50px auto', padding: '20px' }}>
        <p>You need to <Link to="/login">login</Link> to create a thread.</p>
      </div>
    );
  }

  if (isLoading) return <LoadingSpinner />;

  return (
    <div style={{ maxWidth: '600px', margin: '50px auto', padding: '20px' }}>
      <Link to="/" style={{ marginBottom: '20px', display: 'inline-block' }}>
        ← Back to threads
      </Link>

      <h2>Create New Thread</h2>

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

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '4px' }}>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
          />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '4px' }}>Category (optional):</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
          />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '4px' }}>Content:</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
            style={{
              width: '100%',
              minHeight: '200px',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              resize: 'vertical'
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Create Thread
        </button>
      </form>
    </div>
  );
};

export default CreateThread;