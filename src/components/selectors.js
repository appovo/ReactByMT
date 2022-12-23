// TimeboxesManager selectors
export const getAllTimeboxes = (state) => state.timeboxes;
export const areTimeboxesLoading = (state) => state.timeboxesAreLoading;
export const getTimeboxesLoadingError = (state) => state.timeboxesLoadingError;
export const isTimeboxEdited = (state, timebox) =>
  state.currentlyEditedTimeboxId &&
  state.currentlyEditedTimeboxId === timebox.id;
export const getTimeboxById = (state, timeboxId) =>
  state.timeboxes.find((timebox) => timebox.id === timeboxId);
export const getCurrentlyEditedTimebox = (state) =>
  getTimeboxById(state, state.currentlyEditedTimeboxId);
export const isAnyTimeboxEdited = (state) => !!state.currentlyEditedTimeboxId;

// CurentTimebox selectors
export const getIntervalId = (state) => state.intervalId;
export const isClockPaused = (state) => state.isPaused;
export const getElapsedTimeInseconds = (state) => state.elapsedTimeInSeconds;
export const isClockRunning = (state) => state.isRunning;
export const getPausesCount = (state) => state.pausesCount;
