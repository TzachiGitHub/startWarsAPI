import React from "react";
import { Table } from "antd";

export const CharactersTable = ({ characters, isLoading }) => {
  const charactersColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Birth Year",
      dataIndex: "birth_year",
      key: "birth_year",
      render: (date) => date.substring(0, 4),
    },
    {
      title: "Eye color",
      dataIndex: "eye_color",
      key: "eye_color",
    },
    {
      title: "gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Hair Color",
      dataIndex: "hair_color",
      key: "hair_color",
    },
    {
      title: "Height",
      dataIndex: "height",
      key: "height",
    },
    {
      title: "Mass",
      dataIndex: "mass",
      key: "mass",
    },
    {
      title: "Skin Color",
      dataIndex: "skin_color",
      key: "skin_color",
    },
  ];

  return (
    <Table
      pagination={{
        style: { margin: 10 },
        defaultPageSize: 10,
        position: ["bottomRight"],
        showTotal: (total, range) =>
          `${range[0]}-${range[1]} of ${total} items`,
      }}
      dataSource={characters.map((character, index) => ({
        ...character,
        key: index,
      }))}
      columns={charactersColumns}
      rowKey="key"
      loading={isLoading}
    />
  );
};
