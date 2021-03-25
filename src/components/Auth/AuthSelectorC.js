import React from 'react';
import { useHistory } from 'react-router-dom';
import GoogleAuth from './GoogleAuth';
import FacebookAuth from './FacebookAuth';
import Modal from './Modal';

const AuthSelectorC = () => {
  const history = useHistory();

  const onDismiss = () => {
    history.push('/');
  }

  const renderContent = () => {
    return (
      <div>
        <div className="ui centered cards">
          <GoogleAuth />
        </div>
        <div className="ui centered cards">
          <FacebookAuth />
        </div>
      </div>
    );
  };

  return (
    <>
      <Modal
        title="Login to recipes"
        message={renderContent()}
        onDismiss={onDismiss}
      />
    </>
  );
};

export default AuthSelectorC;
