import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchRecipeDetails } from "../redux/slices/RecipeDetailsSlice";
import { GiCheckMark } from "react-icons/gi";
import { IoLogoYoutube } from "react-icons/io";
import { RootState, useAppDispatch } from "../redux/store";
import Breadcrumbs from "./Breadcrumbs";

const RecipeDetails:React.FC = () => {
  const { id } = useParams<{ id: string }>();
  // const { id } = useParams();
  const dispatch = useAppDispatch();
  const meal = useSelector(
    (state: RootState) => state.recipeDetails.selectedRecipe
  );
  const loading = useSelector(
    (state: RootState) => state.recipeDetails.loading
  );

  const [showVideo, setShowVideo] = useState(false);


  useEffect(() => {
    if (id) {
      dispatch(fetchRecipeDetails(id));
    }
  }, [dispatch, id]);

  if (loading || !meal) {
    return <p>Loading...</p>;
  }

  const { strMeal, strInstructions, strCategory, strMealThumb, strYoutube } =
    meal;

  const instructions = strInstructions
    .split(".")
    .filter(
      (instruction) =>
        instruction.trim() !== "" && !/^\d/.test(instruction.trim())
    );

  const youtubeEmbedUrl = strYoutube
    ? strYoutube.replace("watch?v=", "embed/")
    : "";

  return (
    <>
      <div className="title-details-list">
        <h1>MEAL DETAILS</h1>
        <div style={{textDecoration: 'none'}} >
        <Breadcrumbs/>
        </div>
      </div>
      <div className="recipe-details-container">
        <div className="recipe-card">
          <img src={strMealThumb} alt={strMeal} className="recipe-image" />
          <div className="recipe-info">
            <h2>{strMeal}</h2>
            <div className="category-youtube-container">
              <p className="category">Category: {strCategory}</p>
              <div
                className="youtube-card"
                onMouseEnter={() => setShowVideo(true)}
                onMouseLeave={() => setShowVideo(false)}
              >
                <p className="youtube">
                  <a
                    href={strYoutube}
                    className="youtube-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <IoLogoYoutube className="youtube-icon" />
                  </a>
                </p>
                {showVideo && (
                  <div className="video-popup">
                    <iframe
                      src={youtubeEmbedUrl}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title="YouTube video player"
                    ></iframe>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="recipe-ingredients-card">
          <h3 className="ingredient-text">Ingredients</h3>
          <ul className="ingredient-list-details ingredient-container">
            {Object.keys(meal)
              .filter((key) => key.startsWith("strIngredient") && meal[key])
              .map((key, index) => (
                <li key={index}>
                  <GiCheckMark className="tick-icon" />
                  {meal[key]}
                </li>
              ))}
          </ul>
        </div>
      </div>
      <div className="instruction-text">
        <div className="recipe-card instructions-card">
          <h3>Instructions</h3>
          {instructions.map((instruction, index) => {
            const parts = instruction.split("-");
            if (parts.length > 1) {
              const firstPart = parts[0].trim().toUpperCase();
              if (firstPart.startsWith("STEP")) {
                parts.shift();
              }
            }
            const modifiedInstruction = parts.join("-").trim();
            return (
              <div key={index} className="instruction">
                <span className="instruction-number">{index + 1}.</span>{" "}
                <span className="instruction-text">{modifiedInstruction}</span>{" "}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default RecipeDetails;
