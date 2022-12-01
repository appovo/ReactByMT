import React, { useEffect, useCallback, useReducer } from "react";
import TimeboxCreator from "./TimeboxCreator";
import Error from "./ErrorBoundary";
import createTimeboxesAPI from "../api/AxiosTimeboxesApi";
import { TimeboxesList } from "./TimeboxesList";
import Timebox from "./Timebox";
import TimeboxEditor from "./TimeboxEditor";
import { timeboxesReducer } from "./reducers";

const TimeboxesAPI = createTimeboxesAPI({
  baseUrl: "http://localhost:5000/timeboxes",
});
const TimeboxCreatorMemo = React.memo(TimeboxCreator);
const TimeboxesListMemo = React.memo(TimeboxesList);

const TimeboxesManager = React.memo((accessToken) => {
  const [state, dispatch] = useReducer(
    timeboxesReducer,
    undefined,
    timeboxesReducer
  );

  useEffect(() => {
    TimeboxesAPI.getAllTimeboxes(accessToken)
      .then((timeboxes) => dispatch({ type: "TIMEBOXES_SET", timeboxes }))
      .catch((error) => dispatch({ type: "ERROR_SET", error }))
      .finally(() => dispatch({ type: "LOADING_INDICATOR_DISABLE" }));
  }, [accessToken]);

  const addTimebox = (timebox) => {
    TimeboxesAPI.addTimebox(timebox).then((addedTimebox) =>
      dispatch({ type: "TIMEBOX_ADD", timebox: addedTimebox })
    );
  };
  const removeTimebox = (timeboxToRemove) => {
    TimeboxesAPI.removeTimebox(timeboxToRemove).then(() => {
      dispatch({
        type: "TIMEBOX_REMOVE",
        removedTimebox: timeboxToRemove,
      });
    });
  };
  const updateTimebox = (timeBoxToUpdate) => {
    TimeboxesAPI.partiallyUpdateTimebox(timeBoxToUpdate).then(
      (replacedTimebox) => {
        dispatch({
          type: "TIMEBOX_REPLACE",
          replacedTimebox,
        });
        dispatch({ type: "TIMEBOX_EDIT_STOP" });
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
      (timeboxes) => dispatch({ timeboxes })
    );
  };
  const renderTimebox = (timebox) => {
    return state.currentlyEditedTimeboxId === timebox.id ? (
      <TimeboxEditor
        key={timebox.id}
        initialTitle={timebox.title}
        initialTotalTimeInMinutes={timebox.totalTimeInMinutes}
        onCancel={() => dispatch({ type: "TIMEBOX_EDIT_STOP" })}
        onUpdate={(updatedTimebox) => {
          updateTimebox({
            ...timebox,
            ...updatedTimebox,
          });
        }}
      />
    ) : (
      <Timebox
        key={timebox.id}
        title={timebox.title}
        totalTimeInMinutes={timebox.totalTimeInMinutes}
        onDelete={() => removeTimebox(timebox)}
        onEdit={() => {
          dispatch({
            type: "TIMEBOX_EDIT_START",
            currentlyEditedTimeboxId: timebox.id,
          });
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
