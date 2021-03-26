import React from 'react';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const ShowRecipes = () => {
  return (
    <>
      <h1>All Recipes</h1>
      <Link className="ui button" to="/new" style={{ color: '#ffffff', backgroundColor: '#266150' }}>
        <i className="icon plus"></i>
        Add new recipe
      </Link>
    </>
  );
};

export default ShowRecipes;
