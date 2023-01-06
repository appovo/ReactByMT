import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import TimeboxCreator from "./TimeboxCreator";
import Error from "./ErrorBoundary";
import createTimeboxesAPI from "../api/AxiosTimeboxesApi";
import { AllTimeboxesList } from "./TimeboxesList";
import { areTimeboxesLoading, getTimeboxesLoadingError } from "../selectors";
import {
  fetchAllTimeboxes,
  addTimebox,
  replaceTimebox,
  removeTimeboxRemotely,
  stopEditingTimebox,
} from "../actions";
import { EditableTimebox } from "./EditableTimebox";

const TimeboxesAPI = createTimeboxesAPI({
  baseUrl: "http://localhost:5000/timeboxes",
});
const TimeboxCreatorMemo = React.memo(TimeboxCreator);

const TimeboxesManager = React.memo((accessToken) => {
  const dispatch = useDispatch();
  const timeboxesLoading = useSelector(areTimeboxesLoading);
  const timeboxesLoadingError = useSelector(getTimeboxesLoadingError);

  useEffect(() => {
    dispatch(fetchAllTimeboxes(accessToken));
    //eslint-disable-next-line
  }, []);

  const handleCreate = useCallback((createdTimebox) => {
    try {
      TimeboxesAPI.addTimebox(createdTimebox).then((addedTimebox) =>
        dispatch(addTimebox(addedTimebox))
      );
    } catch (error) {
      console.log("Error while creating timebox:", error);
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
      TimeboxesAPI.partiallyUpdateTimebox(timeBoxToUpdate).then(
        (replacedTimebox) => {
          dispatch(replaceTimebox(replacedTimebox));
          dispatch(stopEditingTimebox());
        }
      );
    };
    const onDelete = () => dispatch(removeTimeboxRemotely(timebox));

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
      <TimeboxCreatorMemo onCreate={handleCreate} />
      {timeboxesLoading ? "Timeboxes are loading..." : ""}
      {timeboxesLoadingError ? "Failed to load :(" : ""}
      <Error message="Something's wrong with the list:(">
        <label htmlFor="tmbx_filter">Filter timeboxes: </label>
        <input id="tmbx_filter" onChange={handleInputChange} />
        <AllTimeboxesList render={renderTimebox} />
      </Error>
    </>
  );
});

export default TimeboxesManager;
