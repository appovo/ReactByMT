import createTimeboxesAPI from "./api/AxiosTimeboxesApi";

// TimeboxManager
export const setTimeboxes = (timeboxes) => ({
  type: "TIMEBOXES_SET",
  timeboxes,
});
export const setError = (error) => ({ type: "ERROR_SET", error });
export const disableIndicatorLoading = () => ({
  type: "LOADING_INDICATOR_DISABLE",
});
export const addTimebox = (addedTimebox) => ({
  type: "TIMEBOX_ADD",
  timebox: addedTimebox,
});
export const replaceTimebox = (replacedTimebox) => ({
  type: "TIMEBOX_REPLACE",
  replacedTimebox,
});
export const removeTimebox = (removedTimebox) => ({
  type: "TIMEBOX_REMOVE",
  removedTimebox: removedTimebox,
});
export const startEditingTimebox = (currentlyEditedTimeboxId) => ({
  type: "TIMEBOX_EDIT_START",
  currentlyEditedTimeboxId: currentlyEditedTimeboxId,
});
export const stopEditingTimebox = () => ({ type: "TIMEBOX_EDIT_STOP" });

const TimeboxesAPI = createTimeboxesAPI({
  baseUrl: "http://localhost:5000/timeboxes",
});

export const fetchAllTimeboxes = (accessToken) => (dispatch) => {
  TimeboxesAPI.getAllTimeboxes(accessToken)
    .then((timeboxes) => {
      dispatch(setTimeboxes(timeboxes));
    })
    .catch((error) => dispatch(setError(error)))
    .finally(() => dispatch(disableIndicatorLoading()));
};
export const removeTimeboxRemotely = (timebox) => (dispatch) => {
  TimeboxesAPI.removeTimebox(timebox).then(() => {
    dispatch(removeTimebox(timebox));
  });
};

// CurrentTimebox
export const startRunning = () => ({ type: "RUNNING_START" });
export const stopRunning = () => ({ type: "RUNNING_STOP" });
export const unPause = () => ({ type: "UNPAUSE" });
export const clearPausesCount = () => ({ type: "PAUSES_COUNT_CLEAR" });
export const clearElapsedSeconds = () => ({ type: "ELAPSED_SECONDS_CLEAR" });
export const timerStart = () => ({ type: "TIMER_START" });
export const setIntervalId = (id) => ({ type: "INTERVAL_ID_SET", id });
export const clearIntervalId = () => ({ type: "INTERVAL_ID_CLEAR" });
export const incrementPausesCount = () => ({ type: "PAUSES_COUNT_INCREMENT" });
export const togglePauseAction = () => ({ type: "TOGGLE_PAUSE" });
