import React from 'react';

const CleanComponent = () => {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Clean Component</h2>
      <p>This component follows all ESLint rules and best practices.</p>
      <button type="button" onClick={() => console.log('Button clicked')}>
        Click Me
      </button>
    </div>
  );
};

export default CleanComponent;