import React from 'react';



const NoRecipeFound: React.FC = () => {
  return (
    <>
    <div className='no-recipe-found-container'>
      <h2>No Recipe Found</h2>
      <p>No recipes found for the given ingredient. Please try another search.</p>
    </div>
  </>
  );
 
};

export default NoRecipeFound;