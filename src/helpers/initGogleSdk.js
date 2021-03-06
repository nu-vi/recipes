import { checkGoogleAuthState } from '../services/accountService';

export const initGoogleSdk = async () => {
  await window.gapi.load('client:auth2', () => {
    window.gapi.client
      .init({
        clientId:
          '329599746703-m9je27ptqm52kf1ff78l6jijp3p0fces.apps.googleusercontent.com',
        scope: 'profile email',
      })
      .then(() => {
        checkGoogleAuthState()
        return window.gapi.auth2.getAuthInstance();
      });
  });
}


