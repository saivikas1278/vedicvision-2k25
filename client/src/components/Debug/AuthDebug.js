import React from 'react';
import { useSelector } from 'react-redux';

const AuthDebug = () => {
  const auth = useSelector(state => state.auth);
  
  return (
    <div style={{ 
      position: 'fixed', 
      top: '10px', 
      right: '10px', 
      background: 'rgba(0,0,0,0.8)', 
      color: 'white', 
      padding: '10px', 
      borderRadius: '5px', 
      fontSize: '12px',
      zIndex: 9999
    }}>
      <h4>Auth Debug</h4>
      <div>Is Authenticated: {auth.isAuthenticated ? 'Yes' : 'No'}</div>
      <div>Loading: {auth.loading ? 'Yes' : 'No'}</div>
      <div>User: {auth.user ? auth.user.firstName + ' ' + auth.user.lastName : 'None'}</div>
      <div>Token: {auth.token ? 'Present' : 'None'}</div>
      <div>Error: {auth.error || 'None'}</div>
    </div>
  );
};

export default AuthDebug;
