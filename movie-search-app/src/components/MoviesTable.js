import React from "react";
import { Table, Button } from "antd";

export const MoviesTable = ({ movies, isLoading, onExpand }) => {
  const moviesColumns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Year",
      dataIndex: "created",
      key: "year",
      render: (date) => date.substring(0, 4),
    },
    {
      title: "director",
      dataIndex: "director",
      key: "director",
    },
    {
      title: "Expand",
      dataIndex: "expand",
      key: "expand",
      render: (_, movie) => (
        <Button
          onClick={() =>
            onExpand({ movieId: movie.episode_id, movieTitle: movie.title })
          }
        >
          More Details
        </Button>
      ),
    },
  ];

  return (
    <Table
      pagination={false}
      dataSource={movies.map((movie, index) => ({ ...movie, key: index }))}
      columns={moviesColumns}
      rowKey="id"
      loading={isLoading}
    />
  );
};
