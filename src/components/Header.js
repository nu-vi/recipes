import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Header extends React.Component {
  renderAuthButton = () => {
    if(this.props.userIsSignedIn === null) {
      return null;
    } else if (!this.props.userIsSignedIn) {
      return (
        <Link to="/sign-in" className="right item">
          <div
            className="ui button"
            style={{ color: '#FDF8F5', backgroundColor: '#266150' }}
          >
            Log in
          </div>
        </Link>
      );
    }
    return (
      <button className="right item" onClick={this.props.signOut}>
        <div
          className="ui button"
          style={{ color: '#FDF8F5', backgroundColor: '#266150' }}
        >
          Log out
        </div>
      </button>
    );
  };

  render() {
    return (
      <div
        className="ui secondary menu inverted"
        style={{ backgroundColor: '#4F4846', maxHeight: '3.8em' }}
      >
        <div className="ui container">
          <Link to="/" className="item">
            <img
              src="../logo512.png"
              style={{ width: '3em' }}
              alt="Recipes Logo"
            />
          </Link>
          <div className="item">
            <div className="ui search">
              <div className="ui icon input">
                <input className="prompt" type="text" placeholder="Search..." />
                <i className="search icon"></i>
              </div>
            </div>
          </div>
          {this.renderAuthButton()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userIsSignedIn: state.auth.isSignedIn,
    signOut: state.auth.onSignOut,
  };
};

export default connect(mapStateToProps, {})(Header);
