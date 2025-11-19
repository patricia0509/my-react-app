import React from 'react';

// Sengaja buat error untuk screenshot CI fail
const BuggyComponent = () => {
  // Syntax error - missing closing bracket
  return (
    <div>
      <h1>This will cause CI to fail</h1>
      <p>Missing closing div tag
    </div>
  );
};

export default BuggyComponent;