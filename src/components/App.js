import React from 'react';
import Header from './Header';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AuthSelectorC from './Auth/AuthSelectorC';
import ShowRecipes from './ShowRecipes';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <div className="ui container">
        <Switch>
          <Route path="/" exact component={ShowRecipes} />
          <Route path="/sign-in" exact component={AuthSelectorC} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
