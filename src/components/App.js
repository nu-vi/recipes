import React from 'react';
import Header from './Header';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AuthSelectorC from './Auth/AuthSelectorC';
import ListRecipes from './pages/ListRecipes';
import PrivacyPolicy from './pages/PrivacyPolicy';
import CreateRecipe from './pages/CreateRecipe';
import CustomizedInputs from './Test'


const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <div className="ui container">
        <Switch>
          <Route path="/" exact component={ListRecipes} />
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
