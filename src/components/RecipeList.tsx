import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchRecipes } from "../redux/slices/RecipeSlice";
import {  useLocation, Link } from "react-router-dom"; // Import Link
import { FaSearch } from "react-icons/fa";
import { Form, Button } from "react-bootstrap";
import "../App.css";
import { RootState, useAppDispatch } from "../redux/store";
import Breadcrumbs from "./Breadcrumbs";

const RecipeList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useAppDispatch();
  // const navigate = useNavigate();
  const location = useLocation();
  const recipes = useSelector((state: RootState) => state.recipes.recipes);
  const loading = useSelector((state: RootState) => state.recipes.loading);
  const error = useSelector((state: RootState) => state.recipes.error);

  const queryParams = new URLSearchParams(location.search);
  const ingredient = queryParams.get("ingredient");

  useEffect(() => {
    if (ingredient) {
      dispatch(fetchRecipes(ingredient));
    }
  }, [dispatch, ingredient]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(fetchRecipes(searchQuery));
  };

  // const handleViewDetails = (id: string) => {
  //   navigate(`/recipe/${id}`);
  // };

  return (
    <>
      <div className="title-details">
        <h1>MEALS</h1>
        <div style={{textDecoration: 'none'}}>
          <Breadcrumbs />
        </div>
      </div>
      <div className="header-list">
        <Form className="search-container" onSubmit={handleSearch}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search ingredients here..."
            className="search-input"
          />
          <Button
            variant="outline-light"
            className="search-button"
            type="submit"
          >
            <FaSearch className="search-ingredient-button" />
          </Button>
        </Form>
      </div>

      <div className="recipe-list-container">
        {loading && <p>Loading...</p>}
        {error && (
          <div>
            <p>Error: {error}</p>
          </div>
        )}
        {!ingredient || !recipes ? (
          <div className="no-recipe-found-container">
            <h2>No Recipe Found</h2>
            <p>
              No recipes found for the given ingredient. Please try another
              search.
            </p>
          </div>
        ) : (
          <div className="recipe-card-container">
            {recipes.map((recipe) => (
              <div key={recipe.idMeal} className="recipe-list-card">
                {/* Wrap the image and recipe name with a Link */}
                <Link to={`/recipe/${recipe.idMeal}`} className="recipe-link">
                  <img
                    src={recipe.strMealThumb}
                    alt={recipe.strMeal}
                    className="recipe-image"
                  />
                  <h3 className="recipe-name">{recipe.strMeal}</h3>
                </Link>
                <div className="recipe-details">
                  <p className="recipe-description">{recipe.strDescription}</p>
                  {/* <button
                    className="view-recipe-button"
                    onClick={() => handleViewDetails(recipe.idMeal)}
                  >
                    View Recipe
                  </button> */}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default RecipeList;
