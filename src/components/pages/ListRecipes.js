import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchRecipes } from '../../actions';
import img from './../../images/default-image.jpeg';

class ListRecipes extends React.Component {
  componentDidMount() {
    this.props.fetchRecipes().then((response) => console.log(response));
  }

  renderList() {
    return this.props.recipes.map((recipe) => {
      return (
        <div className="card" key={recipe.id}>
          <div className="image">
            <img src={img} />
          </div>
          <div className="content">
            <Link to={`/recipes/${recipe.id}`} className="header">
              {recipe.title}
            </Link>
            <div className="meta">
              <div>{recipe.description}</div>
            </div>
          </div>
        </div>
      );
    });
  }

  renderNewRecipeButton() {
    if (this.props.userIsSignedIn) {
      return (
        <Link
          className="ui button"
          to="/new"
          style={{
            color: '#ffffff',
            backgroundColor: '#266150',
            marginTop: '15px',
            marginBottom: '15px',
          }}
        >
          <i className="icon plus"></i>
          Add new recipe
        </Link>
      );
    }
  }

  render() {
    return (
      <>
        <h1>All Recipes</h1>
        <div className="ui three doubling stackable cards">{this.renderList()}</div>
        {this.renderNewRecipeButton()}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    recipes: Object.values(state.recipes),
    userIsSignedIn: state.auth.isSignedIn,
    currentUserId: state.auth.userId,
  };
};

export default connect(mapStateToProps, { fetchRecipes })(ListRecipes);
