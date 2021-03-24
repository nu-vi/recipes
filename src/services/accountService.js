import store from '../index';
import {signIn, signOut} from '../actions';


export const onGoogleAuthChange = (isSignedIn) => {
  const auth = window.gapi.auth2.getAuthInstance();

  if (isSignedIn) {
    store.dispatch(
      signIn(auth.currentUser.get().getId(), auth.signOut)
    );
  } else {
    store.dispatch(signOut());
  }
};

export const checkFbAuthState = async () => {
    await window.FB.getLoginStatus((response) => {
      console.log(`checkFbAuthState: ${response.status}`);
      onFbAuthChange(response.status === 'connected');
      return true;
    });
};

 const onSignOutClick = () => {
    window.FB.getLoginStatus((response) => {
      console.log(`onSignOutClick: ${response.accessToken}`);
      window.FB.logout(response.accessToken);
      checkFbAuthState();
    });
  };

const onFbAuthChange = (isSignedIn) => {
  if (isSignedIn) {
    console.log(`onFbAuthChange: ID: ${window.FB.getUserID()}`);
    store.dispatch(signIn(window.FB.getUserID(), onSignOutClick()));
  } else {
    store.dispatch(signOut());
  }
};
