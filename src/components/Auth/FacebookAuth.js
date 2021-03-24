import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../../actions';
import { withRouter } from 'react-router-dom';
import {checkFbAuthState} from '../../services/accountService';

class FacebookAuth extends React.Component {

  onSignInClick = () => {
    if (window.FB !== undefined) {
      window.FB.login(() => {
        checkFbAuthState().then(this.props.history.push('/'));
      });
    }
  };

  render() {
    return (
      <div>
        <button
          onClick={this.onSignInClick}
          className="ui massive facebook button"
          style={{ margin: '5px', width: '340px' }}
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
