import { checkFbAuthState } from '../services/accountService';

export const initFacebookSdk = async () => {
  window.fbAsyncInit = () => {
    window.FB.init({
      appId: '919700348847840',
      cookie: false,
      xfbml: true,
      version: 'v10.0',
    });
    checkFbAuthState();
    return window.FB;
  };
};
