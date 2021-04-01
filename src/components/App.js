import React from 'react';
import Header from './Header';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AuthSelectorC from './Auth/AuthSelectorC';
import ShowRecipes from './pages/ShowRecipes';
import PrivacyPolicy from './pages/PrivacyPolicy';
import CreateRecipe from './pages/CreateRecipe';
import CustomizedInputs from './Test'


const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <div className="ui container">
        <Switch>
          <Route path="/" exact component={ShowRecipes} />
          <Route path="/sign-in" exact component={AuthSelectorC} />
          <Route path="/privacy-policy" exact component={PrivacyPolicy} />
          <Route path="/new" exact component={CreateRecipe} />
          <Route path="/test" exact component={CustomizedInputs} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
