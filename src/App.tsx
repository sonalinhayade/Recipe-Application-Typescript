import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import IngredientSearchForm from "./components/IngredientSearchForm";
import RecipeList from "./components/RecipeList";
import RecipeDetails from "./components/RecipeDetails";
import "./App.css";

const App = () => (
  <Provider store={store}>
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<IngredientSearchForm />} />
          <Route path="/recipes" element={<RecipeList />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
        </Routes>
      </div>
    </Router>
  </Provider>
);

export default App;
