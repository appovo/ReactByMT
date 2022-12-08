const timeboxesInitialState = {
  timeboxes: [],
  editIndex: null,
  loading: false,
  error: null,
};

export const timeboxesReducer = (
  state = timeboxesInitialState,
  action = {}
) => {
  switch (action.type) {
    case "TIMEBOXES_SET": {
      const { timeboxes } = action;
      return { ...state, timeboxes };
    }
    case "TIMEBOX_ADD": {
      const { timebox } = action;
      const timeboxes = [...state.timeboxes, timebox];
      return { ...state, timeboxes };
    }
    case "TIMEBOX_REMOVE": {
      const { removedTimebox } = action;
      const timeboxes = state.timeboxes.filter(
        (timebox) => timebox.id !== removedTimebox.id
      );
      return { ...state, timeboxes };
    }
    case "TIMEBOX_REPLACE": {
      const { replacedTimebox } = action;
      const timeboxes = state.timeboxes.map((timebox) =>
        timebox.id === replacedTimebox.id ? replacedTimebox : timebox
      );
      return { ...state, timeboxes };
    }
    case "TIMEBOX_EDIT_STOP": {
      return { ...state, currentlyEditedTimeboxId: null };
    }
    case "TIMEBOX_EDIT_START": {
      const { currentlyEditedTimeboxId } = action;
      return { ...state, currentlyEditedTimeboxId };
    }
    case "LOADING_INDICATOR_DISABLE": {
      return { ...state, loading: false };
    }
    case "ERROR_SET": {
      const { error } = action;
      return { ...state, error };
    }
    default:
      return state;
  }
};
const timeboxInitialState = {
  isRunning: false,
  isPaused: false,
  pausesCount: 0,
  elapsedTimeInSeconds: 0,
  intervalId: null,
};
export const timeboxReducer = (state = timeboxInitialState, action = {}) => {
  switch (action.type) {
    case "RUNNING_START":
      return { ...state, isRunning: true };
    case "RUNNING_STOP":
      return { ...state, isRunning: false };
    case "PAUSE":
      return { ...state, isPaused: true };
    case "UNPAUSE":
      return { ...state, isPaused: false };
    case "PAUSES_COUNT_CLEAR":
      return { ...state, pausesCount: 0 };
    case "ELAPSED_SECONDS_CLEAR":
      return { ...state, elapsedTimeInSeconds: 0 };
    case "TIMER_START":
      return {
        ...state,
        elapsedTimeInSeconds: state.elapsedTimeInSeconds + 0.1,
      };
    case "INTERVAL_ID_SET": {
      const { id } = action;
      return { ...state, intervalId: id };
    }
    case "INTERVAL_ID_CLEAR": {
      return { ...state, intervalId: null };
    }
    case "PAUSES_COUNT_INCREMENT":
      return {
        ...state,
        pausesCount: !state.isPaused
          ? state.pausesCount + 1
          : state.pausesCount,
      };
    case "TOGGLE_PAUSE":
      return { ...state, isPaused: !state.isPaused };
    default:
      return state;
  }
};
