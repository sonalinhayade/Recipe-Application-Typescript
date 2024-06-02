import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Define the type for the meal object
interface Meal {
  idMeal: string;
  strMeal: string;
  strInstructions: string;
  strCategory: string;
  strMealThumb: string;
  strYoutube: string;
  [key: string]: string | undefined;
}

// Define the type for the recipe details state
interface RecipeDetailsState {
  selectedRecipe: Meal | null;
  loading: boolean;
  error: string | null;
}

// Define the async thunk to fetch recipe details
export const fetchRecipeDetails = createAsyncThunk<Meal | undefined, string>(
  'recipeDetails/fetchRecipeDetails',
  async (recipeId) => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`);
    const data = await response.json();
    return data.meals[0];
  }
);

// Define the initial state
const initialState: RecipeDetailsState = {
  selectedRecipe: null,
  loading: false,
  error: null,
};

// Create the recipe details slice
const recipeDetailsSlice = createSlice({
  name: 'recipeDetails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipeDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecipeDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedRecipe = action.payload ?? null; // Handle undefined payload
      })
      .addCase(fetchRecipeDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Unknown error";
      });
  },
});

// Export the reducer
export default recipeDetailsSlice.reducer;
