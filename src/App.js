import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import store from './store';
import Navbar from './components/Navbar';
import ThreadList from './pages/ThreadList';
import ThreadDetail from './pages/ThreadDetail';
import CreateThread from './pages/CreateThread';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Provider store={store}>
      <HelmetProvider>
        <Router>
          <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
            <Navbar />
            <Routes>
              <Route path="/" element={<ThreadList />} />
              <Route path="/thread/:threadId" element={<ThreadDetail />} />
              <Route path="/create-thread" element={<CreateThread />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </div>
        </Router>
      </HelmetProvider>
    </Provider>
  );
}

export default App;