import React, { useState } from 'react';
import { MessageSquare, User, ArrowRight } from 'lucide-react';

function Login({ onLogin, isConnecting, loginError }) {
  const [username, setUsername] = useState('');
  const [localError, setLocalError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = username.trim();

    if (!trimmed) {
      setLocalError('Username cannot be empty.');
      return;
    }

    if (trimmed.length < 3) {
      setLocalError('Username must be at least 3 characters.');
      return;
    }

    if (trimmed.length > 15) {
      setLocalError('Username must be 15 characters or less.');
      return;
    }

    // Regexp to only allow alphanumeric and underscores
    const isValid = /^[a-zA-Z0-9_]+$/.test(trimmed);
    if (!isValid) {
      setLocalError('Only letters, numbers, and underscores allowed.');
      return;
    }

    setLocalError('');
    onLogin(trimmed);
  };

  const errorToShow = loginError || localError;

  return (
    <div className="login-card">
      <div className="login-logo">
        <MessageSquare size={30} />
      </div>
      
      <h1>Private Chat</h1>
      <p>Log in with a unique username to start chatting privately with other online users.</p>

      <form onSubmit={handleSubmit} className="login-form">
        <div className="input-group">
          <label htmlFor="username" className="input-label">
            Choose Username
          </label>
          <div className="input-field-wrapper">
            <User size={18} className="input-icon" />
            <input
              id="username"
              type="text"
              className="text-input"
              placeholder="e.g. alex"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setLocalError('');
              }}
              maxLength={15}
              autoComplete="off"
              autoFocus
            />
          </div>
          {errorToShow && <span className="error-hint">{errorToShow}</span>}
        </div>

        <button 
          type="submit" 
          className="join-button"
          disabled={isConnecting}
        >
          {isConnecting ? 'Registering...' : 'Enter Chat'}
          <ArrowRight size={18} />
        </button>
      </form>
    </div>
  );
}

export default Login;
