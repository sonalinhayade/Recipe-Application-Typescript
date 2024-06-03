# Recipe Search Application

Recipe Search Application is a web application built with ReactJS that allows users to search for recipes based on ingredients. It interacts with an open recipe API to fetch recipe information and provides a user-friendly interface for browsing and selecting recipes.

## Table of Contents

- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Features

- Search for recipes based on ingredients.
- Display a list of recipe search results with pagination.
- View detailed information about a selected recipe, including name, image, ingredients, and instructions.
- Handle API errors gracefully and display appropriate messages to users.
- Responsive design for computer, tablet, and mobile devices.
- State management with Redux.

## Requirements

1. Create a new ReactJS application using the Create React App method.
2. Implement a component called IngredientSearchForm for searching ingredients with pagination.
3. Use the list of ingredients API for fetching ingredients.
4. Implement a component called RecipeList to render a list of recipe search results based on selected ingredients.
5. Use the recipe filter API for fetching recipes.
6. Implement a component called RecipeDetails to display additional information about a selected recipe.
7. Use the recipe lookup API for fetching recipe details.
8. Handle API errors and ensure a clean and user-friendly UI.
9. Make the UI responsive for computer, tablet, and mobile devices.
10. Use Redux for state management across the application, with local state management used only where necessary.

## Installation

To run the Recipe Search Application locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/sonalinhayade/Recipe-Application-Typescript.git
   ```

2. Navigate to the project directory:
   ```bash
   cd Recipe-Search-Application
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

## Usage

To start the development server, run:
```bash
npm start
```

[Visit my Recipe Search Application on Vercel](https://recipe-application-typescript.vercel.app/)


## Technologies Used

- ReactJS
- Redux
- HTML/CSS
- JavaScript
- API: [TheMealDB](https://www.themealdb.com/api.php)

## Contributing

Contributions to the Recipe Search Application are welcome! Follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Open a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
