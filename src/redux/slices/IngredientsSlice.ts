import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Define an interface representing your Ingredient
interface Ingredient {
  idIngredient: string;
  strIngredient: string;
  imageUrl: string;
}

// Define an interface representing your Redux state
export interface RootState {
  ingredients: {
    ingredients: Ingredient[];
    loading: boolean;
    error: string | null;
  };
}

export const fetchIngredients = createAsyncThunk<Ingredient[], void>(
  'ingredients/fetchIngredients',
  async () => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
    const data = await response.json();
    const ingredients: Ingredient[] = data.meals.map((ingredient: Ingredient) => ({
      idIngredient: ingredient.idIngredient,
      strIngredient: ingredient.strIngredient,
      imageUrl: `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}.png`
    }));

    return ingredients;
  }
);

const initialState: { ingredients: Ingredient[] | null; loading: boolean; error: string | null } = {
  ingredients: null,
  loading: false,
  error: null,
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Unknown error';
      });
  },
});

export default ingredientsSlice.reducer;
