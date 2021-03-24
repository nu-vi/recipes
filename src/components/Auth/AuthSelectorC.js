import React from 'react';
import GoogleAuth from './GoogleAuth';
import FacebookAuth from './FacebookAuth';

const AuthSelectorC = () => {
  return (
    <div style={{marginTop: "20px"}}>
      <div className="ui centered cards">
        <GoogleAuth />
      </div>
      <div className="ui centered cards">
        <FacebookAuth />
      </div>
    </div>

  );
};

export default AuthSelectorC;
