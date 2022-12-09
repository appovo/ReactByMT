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
