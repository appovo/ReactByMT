import React, { useEffect, useCallback } from "react";
import { useStore } from "react-redux";
import TimeboxCreator from "./TimeboxCreator";
import Error from "./ErrorBoundary";
import createTimeboxesAPI from "../api/AxiosTimeboxesApi";
import { AllTimeboxesList } from "./TimeboxesList";
import {
  areTimeboxesLoading,
  getTimeboxesLoadingError,
  getCurrentlyEditedTimebox,
  isAnyTimeboxEdited,
} from "./selectors";
import {
  setTimeboxes,
  setError,
  disableIndicatorLoading,
  addTimebox,
  replaceTimebox,
  removeTimebox,
  stopEditingTimebox,
} from "./actions";
import { useForceUpdate } from "./hooks";
import { EditableTimebox } from "./EditableTimebox";

const TimeboxesAPI = createTimeboxesAPI({
  baseUrl: "http://localhost:5000/timeboxes",
});
const TimeboxCreatorMemo = React.memo(TimeboxCreator);

const TimeboxesManager = React.memo((accessToken) => {
  const store = useStore();
  const state = store.getState().timeboxesReducer;
  // console.log(store.getState());
  const dispatch = store.dispatch;
  const forceUpdate = useForceUpdate();
  // eslint-disable-next-line
  useEffect(() => store.subscribe(forceUpdate), []);

  useEffect(() => {
    TimeboxesAPI.getAllTimeboxes(accessToken)
      .then((timeboxes) => {
        dispatch(setTimeboxes(timeboxes));
      })
      .catch((error) => dispatch(setError(error)))
      .finally(() => dispatch(disableIndicatorLoading()));
    // eslint-disable-next-line
  }, [accessToken]);

  const handleCreate = useCallback((createdTimebox) => {
    try {
      TimeboxesAPI.addTimebox(createdTimebox).then((addedTimebox) =>
        dispatch(addTimebox(addedTimebox))
      );
    } catch (error) {
      console.log("Jest błąd przy tworzeniu timeboksa:", error);
    }
    // eslint-disable-next-line
  }, []);

  const handleInputChange = (target) => {
    TimeboxesAPI.getTimeboxesByFullTextSearch(target.currentTarget.value).then(
      (timeboxes) => dispatch({ timeboxes })
    );
  };

  const renderTimebox = (timebox) => {
    const onUpdate = (updatedTimebox) => {
      const timeBoxToUpdate = { ...timebox, ...updatedTimebox };
      console.log(timeBoxToUpdate);
      TimeboxesAPI.partiallyUpdateTimebox(timeBoxToUpdate).then(
        (replacedTimebox) => {
          dispatch(replaceTimebox(replacedTimebox));
          dispatch(stopEditingTimebox());
        }
      );
    };
    const onDelete = () =>
      TimeboxesAPI.removeTimebox(timebox).then(() => {
        dispatch(removeTimebox(timebox));
      });

    return (
      <EditableTimebox
        timebox={timebox}
        onUpdate={onUpdate}
        onDelete={onDelete}
      />
    );
  };

  return (
    <>
      {isAnyTimeboxEdited(state)
        ? `You're editing timebox of id: ${getCurrentlyEditedTimebox(state).id}`
        : ""}
      <TimeboxCreatorMemo onCreate={handleCreate} />
      {areTimeboxesLoading(state) ? "Timeboxy się ładują..." : ""}
      {getTimeboxesLoadingError(state) ? "Nie udało się załadować :(" : ""}
      <Error message="Coś się wykrzaczyło w liście:(">
        <label htmlFor="tmbx_filter">Filtruj timeboksy: </label>
        <input id="tmbx_filter" onChange={handleInputChange} />
        <AllTimeboxesList render={renderTimebox} />
      </Error>
    </>
  );
});

export default TimeboxesManager;
