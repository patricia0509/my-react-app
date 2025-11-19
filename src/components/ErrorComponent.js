import React from 'react';

// Sengaja buat ESLint errors
const ErrorComponent = () => {
  var unusedVariable = 'this will cause eslint error';
  const anotherUnused = 'another unused variable';
  
  // Missing semicolon
  const missingsemicolon = 'test'
  
  // Unreachable code
  return (
    <div>
      <h1>Component with intentional errors</h1>
    </div>
  );
  
  console.log('This code is unreachable');
};

export default ErrorComponent