import { checkFbAuthState } from '../services/accountService';

export const initFacebookSdk = async () => {
  window.fbAsyncInit = () => {
    window.FB.init({
      appId: '197855785071465',
      cookie: true,
      xfbml: true,
      version: 'v10.0',
    });
    checkFbAuthState();
    return window.FB;
  };
};
