import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../../actions';
import { withRouter } from 'react-router-dom';
import { checkGoogleAuthState } from '../../services/accountService';

class GoogleAuth extends React.Component {
  onSignInClick = async () => {
    await window.gapi.auth2.getAuthInstance().signIn();

    checkGoogleAuthState().then(this.props.history.push('/'));
  };

  render() {
    return (
      <div>
        <button
          onClick={this.onSignInClick}
          className="ui massive button"
          style={{ margin: '5px', width: '340px' }}
        >
          <i className="google icon" />
          Sign in with Google
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default withRouter(
  connect(mapStateToProps, { signIn, signOut })(GoogleAuth)
);
