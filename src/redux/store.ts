import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux'; // Import Action from redux
import ingredientsReducer from './slices/IngredientsSlice';
import recipesReducer from './slices/RecipeSlice';
import recipeDetailsReducer from './slices/RecipeDetailsSlice';

// Define types for Thunk action and AppDispatch


const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    recipes: recipesReducer,
    recipeDetails: recipeDetailsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string> // Use Action from redux
>;

// Export a hook to use AppDispatch in components
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
