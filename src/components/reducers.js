const initialState = {
  timeboxes: [],
  editIndex: null,
  loading: false,
  error: null,
};

export const timeboxesReducer = (state = initialState, action = {}) => {
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
