import React, { useEffect, useState } from "react";
import Timebox from "./Timebox";
import TimeboxCreator from "./TimeboxCreator";
import Error from "./ErrorBoundary";
import createTimeboxesAPI from "../api/AxiosTimeboxesApi";

const TimeboxesAPI = createTimeboxesAPI({
  baseUrl: "http://localhost:5000/timeboxes",
});

function TimeboxList(accessToken) {
  const [timeboxes, setTimeboxes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    TimeboxesAPI.getAllTimeboxes(accessToken)
      .then((timeboxes) => setTimeboxes(timeboxes))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  const addTimebox = (timebox) => {
    TimeboxesAPI.addTimebox(timebox).then((addedTimebox) =>
      setTimeboxes((prevState) => {
        const timeboxes = [...prevState, addedTimebox];
        return timeboxes;
      })
    );
  };
  const removeTimebox = (indexToRemove) => {
    TimeboxesAPI.removeTimebox(timeboxes[indexToRemove]).then(() => {
      setTimeboxes((prevState) => {
        const timeboxes = prevState.filter(
          (timebox, index) => index !== indexToRemove
        );
        return timeboxes;
      });
    });
  };
  const updateTimebox = (indexToUpdate, timeBoxToUpdate) => {
    TimeboxesAPI.partiallyUpdateTimebox(timeBoxToUpdate).then(
      (updatedTimebox) =>
        setTimeboxes((prevState) => {
          const timeboxes = prevState.map((timebox, index) =>
            index === indexToUpdate ? updatedTimebox : timebox
          );
          return timeboxes;
        })
    );
  };

  const handleCreate = (createdTimebox) => {
    try {
      addTimebox(createdTimebox);
    } catch (error) {
      console.log("Jest błąd przy tworzeniu timeboksa:", error);
    }
  };

  const handleInputChange = (target) => {
    TimeboxesAPI.getTimeboxesByFullTextSearch(target.currentTarget.value).then(
      (timeboxes) => setTimeboxes(timeboxes)
    );
  };

  return (
    <>
      <TimeboxCreator onCreate={handleCreate} />
      {loading ? "Timeboxy się ładują..." : ""}
      {error ? "Nie udało się załadować :(" : ""}
      <Error message="Coś się wykrzaczyło w liście:(">
        <label htmlFor="tmbx_filter">Filtruj timeboksy: </label>
        <input id="tmbx_filter" onChange={handleInputChange} />
        {timeboxes.map((timebox, index) => (
          <Timebox
            key={timebox.id}
            title={timebox.title}
            totalTimeInMinutes={timebox.totalTimeInMinutes}
            onDelete={() => removeTimebox(index)}
            onEdit={() =>
              updateTimebox(index, {
                ...timebox,
                title: "Updated timebox",
              })
            }
          />
        ))}
      </Error>
    </>
  );
}

export default TimeboxList;
