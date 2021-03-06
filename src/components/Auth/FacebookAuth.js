import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../../actions';
import { withRouter } from 'react-router-dom';
import { checkFbAuthState } from '../../services/accountService';

class FacebookAuth extends React.Component {
  onSignInClick = async () => {
    const { authResponse } = await new Promise(window.FB.login);

    if(!authResponse) return;

    checkFbAuthState().then(this.props.history.push('/'));
  };

  render() {
    return (
      <div>
        <button
          onClick={this.onSignInClick}
          className="ui massive facebook button"
          style={{ margin: '5px', maxWidth: '340px' }}
        >
          <i className="facebook icon" />
          Sign in with Facebook
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default withRouter(
  connect(mapStateToProps, { signIn, signOut })(FacebookAuth)
);
