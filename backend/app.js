import express from "express";
import axios from "axios";
import cors from "cors";

const DEFAULT_PAGE_INDEX = 1;
const DEFAULT_PAGE_SIZE = 10;

const app = express();

// Enable CORS
app.use(cors());

app.get("/films", async (req, res) => {
  const pageIndex = parseInt(req.query.pageIndex) || DEFAULT_PAGE_INDEX;
  const pageSize = parseInt(req.query.pageSize) || DEFAULT_PAGE_SIZE;

  const url = "http://swapi.dev/api/films/";
  try {
    const response = await axios.get(url);
    let movies = response.data.results;

    // Check if query parameter exists
    const { title } = req.query;
    if (title) {
      movies = movies.filter((movie) =>
        movie.title.toLowerCase().includes(title.toLowerCase())
      );
    }

    const startIndex = (pageIndex - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    // Slice the data to return the desired part -
    // Star Wars API doesn't allow to send queries in it's api so this is a self implemented pagination for the FE
    const filteredMovies = movies.slice(startIndex, endIndex);

    res.json({ data: filteredMovies, total: movies.length });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/films/:id", async (req, res) => {
  const { expand } = req.query;

  const getOneMovieUrl = `http://swapi.dev/api/films/${req.params.id}/`;

  try {
    const movieRes = await axios.get(getOneMovieUrl);
    const movie = movieRes.data;

    if (expand) {
      const fieldsToExpand = expand.split(",");
      await Promise.all(
        fieldsToExpand.map(async (fieldToExpand) => {
          const urlArrayToExpand = movie[fieldToExpand];

          const expandedDataRes = await Promise.all(
            urlArrayToExpand.map(async (datum) => await axios.get(datum))
          );
          const expandedData = await Promise.all(
            expandedDataRes.map(async (datum) => await datum.data)
          );

          movie[fieldToExpand] = expandedData;
        })
      );
    }

    res.send(movie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const port = 4000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

export default app;
