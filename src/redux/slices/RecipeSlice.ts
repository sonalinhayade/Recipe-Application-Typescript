import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strDescription?: string;
}

interface RecipesState {
  recipes: Recipe[];
  loading: boolean;
  error: string | null;
}

const initialState: RecipesState = {
  recipes: [],
  loading: false,
  error: null,
};

export const fetchRecipes = createAsyncThunk<Recipe[], string>(
  'recipes/fetchRecipes',
  async (ingredient: string) => {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
      const data = await response.json();
      return data.meals as Recipe[];
    } catch (error) {
      throw new Error('Failed to fetch recipes');
    }
  }
);

export const fetchRecipeDescription = createAsyncThunk<string, string>(
  'recipes/fetchRecipeDescription',
  async (recipeId: string) => {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`);
      const data = await response.json();
      if (data.meals && data.meals.length > 0) {
        return data.meals[0].strDescription;
      } else {
        return "Description not found";
      }
    } catch (error) {
      console.error("Failed to fetch recipe description:", error);
      return "Failed to fetch description";
    }
  }
);

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecipes.fulfilled, (state, action: PayloadAction<Recipe[]>) => {
        state.loading = false;
        state.recipes = action.payload;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Unknown error';
      })
      .addCase(fetchRecipeDescription.fulfilled, (state, action) => {
        const recipeToUpdate = state.recipes.find(recipe => recipe.idMeal === action.meta.arg);
        if (recipeToUpdate) {
          recipeToUpdate.strDescription = action.payload;
        }
      });
  },
});

export default recipesSlice.reducer;
