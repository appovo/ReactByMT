import React, { useReducer } from "react";
import Clock from "./Clock";
import ProgressBar from "./ProgressBar";
import { getMinutesAndSecondsFromDurationInSeconds } from "../lib/time";
import { timeboxReducer } from "./reducers";
import {
  startRunning,
  stopRunning,
  unPause,
  clearPausesCount,
  clearElapsedSeconds,
  timerStart,
  setIntervalId,
  clearIntervalId,
  incrementPausesCount,
  togglePauseAction,
} from "./actions";

function CurrentTimebox({ title, totalTimeInMinutes }) {
  const [state, dispatch] = useReducer(
    timeboxReducer,
    undefined,
    timeboxReducer
  );

  const handleStart = () => {
    dispatch(startRunning());
    startTimer();
  };

  const handleStop = () => {
    dispatch(stopRunning());
    dispatch(unPause());
    dispatch(clearPausesCount());
    dispatch(clearElapsedSeconds());
    stopTimer();
  };

  const startTimer = () => {
    if (state.intervalId === null) {
      const id = window.setInterval(() => {
        dispatch(timerStart());
      }, 100);
      dispatch(setIntervalId(id));
    }
  };

  const stopTimer = () => {
    window.clearInterval(state.intervalId);
    dispatch(clearIntervalId());
  };

  const togglePause = () => {
    const currentlyPaused = !state.isPaused;
    dispatch(incrementPausesCount());
    if (currentlyPaused) {
      stopTimer();
    } else {
      startTimer();
    }
    dispatch(togglePauseAction());
  };

  const totalTimeInSeconds = totalTimeInMinutes * 60;
  const timeLeftInSeconds = totalTimeInSeconds - state.elapsedTimeInSeconds;

  const [minutesLeft, secondsLeft] =
    getMinutesAndSecondsFromDurationInSeconds(timeLeftInSeconds);

  const progressInPercent =
    (state.elapsedTimeInSeconds / totalTimeInSeconds) * 100.0;
  return (
    <div className={`CurrentTimebox`}>
      <h1>{title}</h1>
      <Clock
        minutes={minutesLeft}
        seconds={secondsLeft}
        className={state.isPaused ? "inactive" : ""}
      />
      <ProgressBar
        percent={progressInPercent}
        className={state.isPaused ? "inactive" : ""}
        color="red"
        big
      />
      <button onClick={handleStart} disabled={state.isRunning}>
        Start
      </button>
      <button onClick={handleStop} disabled={!state.isRunning}>
        Stop
      </button>
      <button onClick={togglePause} disabled={!state.isRunning}>
        {state.isPaused ? "Wznów" : "Pauzuj"}
      </button>
      Liczba przerw: {state.pausesCount}
    </div>
  );
}

export default CurrentTimebox;
