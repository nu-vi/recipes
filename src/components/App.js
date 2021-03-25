import React from 'react';
import Header from './Header';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AuthSelectorC from './Auth/AuthSelectorC';
import ShowRecipes from './ShowRecipes';
import PrivacyPolicy from './PrivacyPolicy';


const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <div className="ui container">
        <Switch>
          <Route path="/" exact component={ShowRecipes} />
          <Route path="/sign-in" exact component={AuthSelectorC} />
          <Route path="/privacy-policy" exact component={PrivacyPolicy} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
