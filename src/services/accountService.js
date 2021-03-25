import store from '../index';
import {signIn, signOut} from '../actions';

export const checkGoogleAuthState = async () => {
  await onGoogleAuthChange(window.gapi.auth2.getAuthInstance().isSignedIn.get());
}

const onGoogleSignOut = async () => {
  await window.gapi.auth2.getAuthInstance().signOut();
  checkGoogleAuthState();
}

const onGoogleAuthChange = (isSignedIn) => {
  if (isSignedIn) {
    store.dispatch(
      signIn(window.gapi.auth2.getAuthInstance().currentUser.get().getId(), onGoogleSignOut)
    );
  } else {
    store.dispatch(signOut());
  }
};

export const checkFbAuthState = async () => {
    await window.FB.getLoginStatus((response) => {
      onFbAuthChange(response.status === 'connected');
    });
};

 const onFbSignOut = () => {
    window.FB.getLoginStatus((response) => {
      window.FB.logout(response.accessToken);
      checkFbAuthState();
    });
  };

const onFbAuthChange = (isSignedIn) => {
  if (isSignedIn) {
    store.dispatch(signIn(window.FB.getUserID(), onFbSignOut));
  } else {
    store.dispatch(signOut());
  }
};
