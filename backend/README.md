# startWarsAPI - backend

## Description

This project is a backend application built using Node.js and Express. It provides an API for retrieving and interacting with film data from the Star Wars API (SWAPI). The application includes endpoints for fetching a list of films, applying pagination and filtering based on film title, as well as retrieving detailed information about a specific film, with the option to expand related data.

## Installation

To install the dependencies for this project, run the following command:

```bash
npm install
```

## Usage
To start the server, run the following command:

```bash
npm start
```

The server will start running on http://localhost:4000.

## API Endpoints

# Get Films

* Endpoint: /films
* Method: 'GET'

* Query Parameters:
* 'pageIndex' (optional): The index of the page to retrieve (default: 1)
* 'pageSize' (optional): The number of films to include per page (default: 10)
* 'title' (optional): Filter films by title (case-insensitive)

* **Response:**
* data: An array of film objects that match the specified filters and pagination
* total: The total number of films available

# Get Film Details
* Endpoint: /films/:id
* Method: GET

* Path Parameters: 
  id: The ID of the film to retrieve


* Query Parameters:
  expand (optional): Comma-separated fields to expand with related data

* Response:
  Film object with detailed information, including expanded data if requested

## Dependencies
This project has the following dependencies:

* chai: ^4.3.7
* esm: ^3.2.25

## Dev Dependencies
This project has the following dev dependencies:

* axios: ^1.4.0
* cors: ^2.8.5
* express: ^4.18.2
* jest: ^29.5.0
* mocha: ^10.2.0
* sinon: ^15.1.0
* supertest: ^6.3.3


## License
This project is licensed under the ISC License.
