import { Table } from "flowbite-react";
import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const CharacterTable = () => {
  // General States
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [all, setAll] = useState();
  const [males, setMales] = useState();
  const [females, setFemales] = useState();
  const [error, setError] = useState("");

  // States For Filtering
  const [isAll, setIsAll] = useState(true);
  const [isMale, setIsMale] = useState(false);
  const [isFemale, setIsFemale] = useState(false);

  // States For Sorting
  const [sortByName, setSortByName] = useState();
  const [sortByGender, setSortByGender] = useState();
  const [sortByHeight, setSortByHeight] = useState();

  const [isSortedByName, setIsSortedByName] = useState(false);
  const [isSortedByGender, setIsSortedByGender] = useState(false);
  const [isSortedByHeight, setIsSortedByHeight] = useState(false);

  // State To Handle Sum of Heights
  const [sumOfHeights, setSumOfHeights] = useState(0);
  const [sumOfHeightsMale, setSumOfHeightsMale] = useState(0);
  const [sumOfHeightsFemale, setSumOfHeightsFemale] = useState(0);

  useEffect(() => {
    const getall = async () => {
      setLoading(true);

      try {
        const swapiData = await axios.get(`https://swapi.dev/api/films/${id}`);

        let { characters } = swapiData.data;

        Promise.all(
          characters.map(async function (character) {
            return await axios
              .get(character)
              .then((response) => {
                const { name, gender, height } = response.data;
                return {
                  ...all,
                  name,
                  gender,
                  height,
                };
              })
              .catch((error) => console.log(error));
          })
        )
          .then((response) => {
            setAll(response);
            // Handle Male Filter
            setMales(
              response.filter((e) => {
                return e.gender === "male";
              })
            );
            // Handle Female Filter
            setFemales(
              response.filter((e) => {
                return e.gender === "female";
              })
            );
            // Handle Name Sorting
            setSortByName(
              response.slice().sort((a, b) => {
                return a.name > b.name ? 1 : -1;
              })
            );
            setSortByGender(
              response.slice().sort((a, b) => {
                return a.gender > b.gender ? 1 : -1;
              })
            );
            setSortByHeight(
              response.slice().sort((a, b) => {
                return a.height - b.height;
              })
            );

            // Calculating Sum of Heights For Each Character Property

            setSumOfHeights(
              response
                .filter((item) => {
                  return item.height !== "unknown";
                })
                .reduce((sum, res) => {
                  return Number(sum) + Number(res.height);
                }, 0)
            );
            setSumOfHeightsMale(
              response
                .filter((item) => {
                  return item.height !== "unknown";
                })
                .filter((e) => {
                  return e.gender === "male";
                })
                .reduce((sum, res) => {
                  return Number(sum) + Number(res.height);
                }, 0)
            );
            setSumOfHeightsFemale(
              response
                .filter((item) => {
                  return item.height !== "unknown";
                })
                .filter((e) => {
                  return e.gender === "female";
                })
                .reduce((sum, res) => {
                  return Number(sum) + Number(res.height);
                }, 0)
            );

            setLoading(false);
          })
          .catch((err) => {
            setError(err.message);
            setLoading(false);
          });
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    getall();
  }, [id]);

  // Functions To Toggle Filter States
  const showAll = () => {
    setIsAll(true);
    setIsMale(false);
    setIsFemale(false);
    setIsSortedByName(false);
    setIsSortedByGender(false);
    setIsSortedByHeight(false);
  };
  const showMale = () => {
    setIsAll(false);
    setIsMale(true);
    setIsFemale(false);
    setIsSortedByName(false);
    setIsSortedByGender(false);
    setIsSortedByHeight(false);
  };
  const showFemale = () => {
    setIsAll(false);
    setIsMale(false);
    setIsFemale(true);
    setIsSortedByName(false);
    setIsSortedByGender(false);
    setIsSortedByHeight(false);
  };

  // Functions to Handle Sorted States
  const handleSortByName = () => {
    setIsSortedByName(true);
    setIsSortedByGender(false);
    setIsSortedByHeight(false);
  };
  const handleSortByGender = () => {
    setIsSortedByName(false);
    setIsSortedByGender(true);
    setIsSortedByHeight(false);
  };
  const handleSortByHeight = () => {
    setIsSortedByName(false);
    setIsSortedByGender(false);
    setIsSortedByHeight(true);
  };

  console.log(sumOfHeights);
  console.log(sumOfHeightsMale);
  console.log(sumOfHeightsFemale);

  return (
    <Fragment>
      <div className="flex justify-between mb-4">
        <h4 className="text-white text-lg mb-2 font-semibold">Starring</h4>
        <div className={`${all ? `flex gap-4` : `hidden`}`}>
          <h6 className="text-white self-center text-xs">Filter Table </h6>
          <button
            className={`flex gap-2 px-3 py-2 text-xs text-white rounded font-semibold border hover:bg-main-yellow hover:text-black border-main-yellow ${
              isAll && `bg-main-yellow text-black`
            }`}
            onClick={showAll}
          >
            <p>All</p>
          </button>
          <button
            className={`flex gap-2 px-3 py-2 text-xs text-white rounded font-semibold border hover:bg-main-yellow hover:text-black border-main-yellow ${
              isMale && `bg-main-yellow text-black`
            }`}
            onClick={showMale}
          >
            <p>Male</p>
          </button>
          <button
            className={`flex gap-2 px-3 py-2 text-xs text-white rounded font-semibold border hover:bg-main-yellow hover:text-black border-main-yellow ${
              isFemale && `bg-main-yellow text-black`
            }`}
            onClick={showFemale}
          >
            <p>Female</p>
          </button>
        </div>
      </div>
      <Table className="w-full">
        <Table.Head className="bg-white text-left">
          <Table.HeadCell>
            <button className="font-bold" onClick={handleSortByName}>
              Name <i class="bi bi-arrow-down-up ml-20"></i>
            </button>
          </Table.HeadCell>
          <Table.HeadCell>
            <button className="font-bold" onClick={handleSortByGender}>
              Gender <i class="bi bi-arrow-down-up ml-10"></i>
            </button>
          </Table.HeadCell>
          <Table.HeadCell>
            <button className="font-bold" onClick={handleSortByHeight}>
              Height <i class="bi bi-arrow-down-up ml-20"></i>
            </button>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y text-white bg-gray-00">
          {loading && (
            <div role="status" className="px-4 py-8 flex justify-end">
              <svg
                aria-hidden="true"
                className="w-12 h-12 text-gray-200 animate-spin  fill-main-yellow"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            </div>
          )}
          {error && (
            <div className="bg-black h-4/5 w-3/5 rounded-lg shadow-2xl flex justify-center items-center">
              <p className="text-white">{error}</p>
            </div>
          )}
          {all &&
            isAll &&
            !isSortedByName &&
            !isSortedByGender &&
            !isSortedByHeight &&
            all.map((cd) => {
              return (
                <Fragment>
                  <Table.Row className=" dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="p-3 whitespace-nowrap font-medium  dark:text-white">
                      {cd.name}
                    </Table.Cell>
                    <Table.Cell className="capitalize">{cd.gender}</Table.Cell>
                    <Table.Cell>
                      {`${cd.height}cm (${(cd.height / 30.48).toFixed(2)}ft/${(
                        cd.height / 2.54
                      ).toFixed(2)}in)`}
                    </Table.Cell>
                  </Table.Row>
                </Fragment>
              );
            })}
          {/* Show Sort By Name */}
          {sortByName &&
            isSortedByName &&
            sortByName.map((cd) => {
              return (
                <Fragment>
                  <Table.Row className=" dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="p-3 whitespace-nowrap font-medium  dark:text-white">
                      {cd.name}
                    </Table.Cell>
                    <Table.Cell className="capitalize">{cd.gender}</Table.Cell>
                    <Table.Cell>
                      {`${cd.height}cm (${(cd.height / 30.48).toFixed(2)}ft/${(
                        cd.height / 2.54
                      ).toFixed(2)}in)`}
                    </Table.Cell>
                  </Table.Row>
                </Fragment>
              );
            })}
          {/* Show Sort By Gender */}
          {sortByGender &&
            isSortedByGender &&
            sortByGender.map((cd) => {
              return (
                <Fragment>
                  <Table.Row className=" dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="p-3 whitespace-nowrap font-medium  dark:text-white">
                      {cd.name}
                    </Table.Cell>
                    <Table.Cell className="capitalize">{cd.gender}</Table.Cell>
                    <Table.Cell>
                      {`${cd.height}cm (${(cd.height / 30.48).toFixed(2)}ft/${(
                        cd.height / 2.54
                      ).toFixed(2)}in)`}
                    </Table.Cell>
                  </Table.Row>
                </Fragment>
              );
            })}
          {/* Show Sort By Height */}
          {sortByHeight &&
            isSortedByHeight &&
            sortByHeight.map((cd) => {
              return (
                <Fragment>
                  <Table.Row className=" dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="p-3 whitespace-nowrap font-medium  dark:text-white">
                      {cd.name}
                    </Table.Cell>
                    <Table.Cell className="capitalize">{cd.gender}</Table.Cell>
                    <Table.Cell>
                      {`${cd.height}cm (${(cd.height / 30.48).toFixed(2)}ft/${(
                        cd.height / 2.54
                      ).toFixed(2)}in)`}
                    </Table.Cell>
                  </Table.Row>
                </Fragment>
              );
            })}

          {males &&
            isMale &&
            males.map((cd) => {
              return (
                <Fragment>
                  <Table.Row className=" dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="p-3 whitespace-nowrap font-medium  dark:text-white">
                      {cd.name}
                    </Table.Cell>
                    <Table.Cell className="capitalize">{cd.gender}</Table.Cell>
                    <Table.Cell>
                      {`${cd.height}cm (${(cd.height / 30.48).toFixed(2)}ft/${(
                        cd.height / 2.54
                      ).toFixed(2)}in)`}
                    </Table.Cell>
                  </Table.Row>
                </Fragment>
              );
            })}
          {females &&
            isFemale &&
            females.map((cd) => {
              return (
                <Fragment>
                  <Table.Row className=" dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="p-3 whitespace-nowrap font-medium  dark:text-white">
                      {cd.name}
                    </Table.Cell>
                    <Table.Cell className="capitalize">{cd.gender}</Table.Cell>
                    <Table.Cell>
                      {`${cd.height}cm (${(cd.height / 30.48).toFixed(2)}ft/${(
                        cd.height / 2.54
                      ).toFixed(2)}in)`}
                    </Table.Cell>
                  </Table.Row>
                </Fragment>
              );
            })}
          {}
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="text-black font-bold p-3">
              Total Characters:
              {isAll && all
                ? all.length
                : isMale && males
                ? males.length
                : isFemale && females
                ? females.length
                : `Fetching data...`}
            </Table.Cell>
            <Table.Cell></Table.Cell>
            <Table.Cell className="text-black font-bold">
              Sum of Heights: <br />
              {isAll && all
                ? `${sumOfHeights}cm (${(sumOfHeights / 30.48).toFixed(2)}ft/${(
                    sumOfHeights / 2.54
                  ).toFixed(2)}in)`
                : isMale && males
                ? `${sumOfHeightsMale}cm (${(sumOfHeightsMale / 30.48).toFixed(
                    2
                  )}ft/${(sumOfHeightsMale / 2.54).toFixed(2)}in)`
                : isFemale && females
                ? `${sumOfHeightsFemale}cm (${(
                    sumOfHeightsFemale / 30.48
                  ).toFixed(2)}ft/${(sumOfHeightsFemale / 2.54).toFixed(2)}in)`
                : `Fetching data...`}
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Fragment>
  );
};

export default CharacterTable;
