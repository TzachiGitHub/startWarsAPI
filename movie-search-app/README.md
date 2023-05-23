# startWarsAPI - frontend

## Description

This is a movie search application built with React. It allows users to search for movies and view their details, including characters from the movie.

## Installation

To run the application locally, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/username/movie-search-app.git
```
2. Change to the project directory:

```bash
cd movie-search-app
```
3. Install the dependencies:

```bash
npm install
```
4. Start the development server:

```bash
npm start
```
The application will be running at http://localhost:3000.




## Usage
To start the server, run the following command:

```bash
npm start
```

The server will start running on http://localhost:4000.

## Dependencies
This project has the following dependencies:

* @testing-library/jest-dom: "^5.16.5"
* @testing-library/react: "^13.4.0"
* @testing-library/user-event: "^13.5.0"
* antd: "^5.5.1"
* axios: "^1.4.0"
* lodash: "^4.17.21"
* react: "^18.2.0"
* react-dom: "^18.2.0"
* react-router-dom: "^5.2.0"
* react-scripts: "5.0.1"
* web-vitals: "^2.1.4"

These dependencies handle various functionalities of the application, including testing, UI components, API requests, and routing.


# Scripts
The following scripts are available:
* start: Runs the development server.
* build: Builds the application for production.
* test: Launches the test runner.
* eject: Ejects the configuration files.

You can run these scripts using the following command:

```bash
npm run <script-name>
```

## Usage
The main component of the application is MainPage. It handles the search functionality and displays either the list of movies or the list of characters, based on the user's selection.

The application consists of the following components:

MainPage: The main component that displays the search input, movies table, and characters table. It fetches data from an API and handles user interactions.
MoviesTable: A table component that displays a list of movies with their details. It allows users to expand a movie to view its characters.
CharactersTable: A table component that displays a list of characters with their details.

## Contributing
Contributions to the Movie Search App are welcome! If you find any issues or have suggestions for improvement, please open an issue or submit a pull request.

## License
This project is licensed under the ISC License.
