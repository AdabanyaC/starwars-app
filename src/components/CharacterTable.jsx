import { Table } from "flowbite-react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const CharacterTable = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [characterDetails, setCharacterDetails] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const getCharacterDetails = async () => {
      setLoading(true);

      try {
        const swapiData = await axios.get(`https://swapi.dev/api/films/${id}`);

        let { data } = swapiData;

        setCharacterDetails(data.characters);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    getCharacterDetails();
  }, [id]);

  console.log(characterDetails);

  return (
    <Table className="w-full">
      <Table.Head className="bg-white text-left">
        <Table.HeadCell>Name</Table.HeadCell>
        <Table.HeadCell>Gender</Table.HeadCell>
        <Table.HeadCell>Height</Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y text-white bg-gray-00">
        <Table.Row className=" dark:border-gray-700 dark:bg-gray-800">
          <Table.Cell className="whitespace-nowrap font-medium  dark:text-white">
            Apple MacBook Pro 17"
          </Table.Cell>
          <Table.Cell>Sliver</Table.Cell>
          <Table.Cell>Laptop</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
};

export default CharacterTable;
