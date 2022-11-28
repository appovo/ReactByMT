import React, { useEffect, useState, useCallback, useReducer } from "react";
import TimeboxCreator from "./TimeboxCreator";
import Error from "./ErrorBoundary";
import createTimeboxesAPI from "../api/AxiosTimeboxesApi";
import { TimeboxesList } from "./TimeboxesList";
import Timebox from "./Timebox";
import TimeboxEditor from "./TimeboxEditor";

const stateReducer = (prevState, stateChanges) => {
  let newState = prevState;
  if (typeof stateChanges === "function") {
    newState = stateChanges(prevState);
  } else {
    newState = {
      ...prevState,
      ...stateChanges,
    };
  }
  return newState;
};

const TimeboxesAPI = createTimeboxesAPI({
  baseUrl: "http://localhost:5000/timeboxes",
});
const TimeboxCreatorMemo = React.memo(TimeboxCreator);
const TimeboxesListMemo = React.memo(TimeboxesList);

const TimeboxesManager = React.memo((accessToken) => {
  const initialState = {
    timeboxes: [],
    editIndex: null,
    loading: false,
    error: null,
  };

  const [state, setState] = useReducer(stateReducer, initialState);

  useEffect(() => {
    TimeboxesAPI.getAllTimeboxes(accessToken)
      .then((timeboxes) => setState({ timeboxes }))
      .catch((error) => setState({ error }))
      .finally(() => setState({ loading: false }));
  }, [accessToken]);

  const addTimebox = (timebox) => {
    TimeboxesAPI.addTimebox(timebox).then((addedTimebox) =>
      setState((prevState) => {
        const timeboxes = [...prevState.timeboxes, addedTimebox];
        return { timeboxes };
      })
    );
  };
  const removeTimebox = (indexToRemove) => {
    TimeboxesAPI.removeTimebox(state.timeboxes[indexToRemove]).then(() => {
      setState((prevState) => {
        const timeboxes = prevState.timeboxes.filter(
          (timebox, index) => index !== indexToRemove
        );
        return { timeboxes };
      });
    });
  };
  const updateTimebox = (indexToUpdate, timeBoxToUpdate) => {
    TimeboxesAPI.partiallyUpdateTimebox(timeBoxToUpdate).then(
      (updatedTimebox) => {
        setState((prevState) => {
          const timeboxes = prevState.timeboxes.map((timebox, index) =>
            index === indexToUpdate ? updatedTimebox : timebox
          );
          return { timeboxes };
        });
        setState({ editIndex: null });
      }
    );
  };

  const handleCreate = useCallback((createdTimebox) => {
    try {
      addTimebox(createdTimebox);
    } catch (error) {
      console.log("Jest błąd przy tworzeniu timeboksa:", error);
    }
  }, []);

  const handleInputChange = (target) => {
    TimeboxesAPI.getTimeboxesByFullTextSearch(target.currentTarget.value).then(
      (timeboxes) => setState({ timeboxes })
    );
  };
  const renderTimebox = (timebox, index) => {
    return state.editIndex === index ? (
      <TimeboxEditor
        key={timebox.id}
        initialTitle={timebox.title}
        initialTotalTimeInMinutes={timebox.totalTimeInMinutes}
        onUpdate={(updatedTimebox) =>
          updateTimebox(index, {
            ...timebox,
            ...updatedTimebox,
          })
        }
      />
    ) : (
      <Timebox
        key={timebox.id}
        title={timebox.title}
        totalTimeInMinutes={timebox.totalTimeInMinutes}
        onDelete={() => removeTimebox(index)}
        onEdit={() => {
          setState({ editIndex: index });
        }}
      />
    );
  };

  return (
    <>
      <TimeboxCreatorMemo onCreate={handleCreate} />
      {state.loading ? "Timeboxy się ładują..." : ""}
      {state.error ? "Nie udało się załadować :(" : ""}
      <Error message="Coś się wykrzaczyło w liście:(">
        <label htmlFor="tmbx_filter">Filtruj timeboksy: </label>
        <input id="tmbx_filter" onChange={handleInputChange} />
        <TimeboxesListMemo timeboxes={state.timeboxes} render={renderTimebox} />
      </Error>
    </>
  );
});

export default TimeboxesManager;
