import React, { useState } from "react";
import { Input, Pagination, Typography, message } from "antd";
import axios from "axios";

import { MoviesTable } from "./MoviesTable";
import { CharactersTable } from "./CharactersTable";

const { Title } = Typography;
const { Search } = Input;

export const MAX_PAGE_SIZE = 10;

const MainPage = () => {
  const [searchInput, setSearchInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [isCharacterView, setIsCharacterView] = useState(false);
  const [pageIndex, setPageIndex] = useState(1);
  const [totalMovies, setTotalMovies] = useState(0);
  const [currentMovie, setCurrentMovie] = useState({
    movieId: undefined,
    movieTitle: undefined,
  });

  const searchCharacters = async ({ movieId, movieTitle }) => {
    setCurrentMovie({ movieId, movieTitle });
    setIsLoading(true);
    try {
      const peopleRes = await axios.get(
        `http://localhost:4000/films/${movieId}?expand=characters`
      );

      setCharacters(peopleRes.data.characters);
      setIsCharacterView(true);
      setSearchInput(movieTitle);
      setPageIndex(null);
    } catch (error) {
      message.error(`Failed to search for the movie ${movieTitle}`);
    }
    setIsLoading(false);
  };

  const searchMovie = async ({
    movieTitle,
    pageIndex,
    triggerCharacterApi,
  }) => {
    setPageIndex(pageIndex);
    setSearchInput(movieTitle);
    try {
      setIsLoading(true);
      const moviesRes = await axios.get(
        `http://localhost:4000/films?title=${movieTitle}&pageIndex=${pageIndex}&pageSize=${MAX_PAGE_SIZE}`
      );

      const { data: movies, total } = moviesRes.data;
      const isCharacterView = movies.length === 1 && triggerCharacterApi;
      setIsCharacterView(isCharacterView);

      if (isCharacterView) {
        searchCharacters({
          movieId: movies[0].episode_id,
          movieTitle: movies[0].title,
        });
      } else {
        setMovies(movies);
        setTotalMovies(total);
        setIsLoading(false);
      }
    } catch (error) {
      message.error(`Failed to search for the movie ${movieTitle}`);
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        margin: 100,
        padding: "0px 5px",
        border: "2px solid black",
        borderRadius: 10,
      }}
    >
      <Title style={{ display: "flex", justifyContent: "center" }}>
        {isCharacterView ? "Characters" : "Movies"}
      </Title>
      <Search
        disabled={isLoading}
        value={searchInput}
        onChange={(event) => setSearchInput(event.target.value)}
        placeholder="Search movies..."
        enterButton="Search Movies"
        onSearch={(movieTitle) =>
          searchMovie({ movieTitle, pageIndex: 1, triggerCharacterApi: true })
        }
      />
      {isCharacterView ? (
        <CharactersTable characters={characters} isLoading={isLoading} />
      ) : (
        <>
          <MoviesTable
            movies={movies}
            isLoading={isLoading}
            onExpand={searchCharacters}
          />
          {!!totalMovies && (
            <Pagination
              disabled={isLoading}
              showSizeChanger={false}
              onChange={(newPageIndex) =>
                isCharacterView
                  ? searchCharacters({
                      movieId: currentMovie.movieId,
                      movieTitle: currentMovie.movieTitle,
                    })
                  : searchMovie({
                      movieTitle: searchInput,
                      pageIndex: newPageIndex,
                    })
              }
              pageSize={MAX_PAGE_SIZE}
              total={totalMovies}
              showTotal={(total, range) =>
                `${range[0]}-${range[1]} of ${total} items`
              }
              style={{ textAlign: "right", padding: 10 }}
              position={"topRight"}
              current={pageIndex}
            />
          )}
        </>
      )}
    </div>
  );
};

export default MainPage;
