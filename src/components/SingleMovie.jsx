import { Table } from "flowbite-react";
import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import SingleMovieBg from "./../assets/bg/starwars.svg";
import CardBg from "./../assets/bg/starwarsTwo.svg";
import { PrimaryButtonWithIcon } from "./Buttons";

const heroStyle = {
  backgroundImage: `url(${SingleMovieBg})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
};

const cardStyle = {
  backgroundImage: `url(${CardBg})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
};

const SingleMovie = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [movieDetails, setMovieDetails] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const getMovieDetails = async () => {
      setLoading(true);

      try {
        const swapiData = await axios.get(`https://swapi.dev/api/films/1/`);

        let { results } = swapiData.data;

        setMovieDetails(results);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    getMovieDetails();
  }, []);

  console.log(movieDetails);

  return (
    <Fragment>
      <div className={`bg-black h-screen`} style={heroStyle}>
        <div className="flex justify-center flex-col gap-8 items-center h-full">
          {loading ? (
            `Fetching Movie Details`
          ) : error ? (
            `Error ${error}`
          ) : (
            <div className="bg-black h-4/5 w-3/5 rounded-lg shadow-2xl">
              <div
                className="h-1/3 text-white flex flex-col justify-end px-8 py-6 rounded-t-lg"
                style={cardStyle}
              >
                <h3 className="text-4xl">
                  {" "}
                  {movieDetails && movieDetails.title}{" "}
                </h3>
                <p>{movieDetails && movieDetails.opening_crawl}</p>
              </div>
              <div className="h-2/3 rounded-b-lg overflow-auto movie-card-wrapper">
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
              </div>
            </div>
          )}
          <div>
            <PrimaryButtonWithIcon btnText={"Select Another Movie"} />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default SingleMovie;
