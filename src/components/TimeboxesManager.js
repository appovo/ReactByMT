import React, { useEffect, useCallback, useReducer } from "react";
import TimeboxCreator from "./TimeboxCreator";
import Error from "./ErrorBoundary";
import createTimeboxesAPI from "../api/AxiosTimeboxesApi";
import { TimeboxesList } from "./TimeboxesList";
import Timebox from "./Timebox";
import TimeboxEditor from "./TimeboxEditor";
import { timeboxesReducer } from "./reducers";
import {
  setTimeboxes,
  setError,
  disableIndicatorLoading,
  addTimebox,
  replaceTimebox,
  removeTimebox,
  startEditingTimebox,
  stopEditingTimebox,
} from "./actions";

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
      .then((timeboxes) => dispatch(setTimeboxes(timeboxes)))
      .catch((error) => dispatch(setError(error)))
      .finally(() => dispatch(disableIndicatorLoading()));
  }, [accessToken]);

  const handleCreate = useCallback((createdTimebox) => {
    try {
      TimeboxesAPI.addTimebox(createdTimebox).then((addedTimebox) =>
        dispatch(addTimebox(addedTimebox))
      );
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
        onCancel={() => dispatch(stopEditingTimebox())}
        onUpdate={(updatedTimebox) => {
          const timeBoxToUpdate = { ...timebox, ...updatedTimebox };
          console.log(timeBoxToUpdate);
          TimeboxesAPI.partiallyUpdateTimebox(timeBoxToUpdate).then(
            (replacedTimebox) => {
              dispatch(replaceTimebox(replacedTimebox));
              dispatch(stopEditingTimebox());
            }
          );
        }}
      />
    ) : (
      <Timebox
        key={timebox.id}
        title={timebox.title}
        totalTimeInMinutes={timebox.totalTimeInMinutes}
        onDelete={() =>
          TimeboxesAPI.removeTimebox(timebox).then(() => {
            dispatch(removeTimebox(timebox));
          })
        }
        onEdit={() => {
          dispatch(startEditingTimebox(timebox.id));
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
