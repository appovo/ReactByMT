import React, { useReducer } from "react";
import Clock from "./Clock";
import ProgressBar from "./ProgressBar";
import { getMinutesAndSecondsFromDurationInSeconds } from "../lib/time";
import { timeboxReducer } from "./reducers";

function CurrentTimebox({ title, totalTimeInMinutes }) {
  const [state, dispatch] = useReducer(
    timeboxReducer,
    undefined,
    timeboxReducer
  );

  const handleStart = () => {
    dispatch({ type: "RUNNING_START" });
    startTimer();
  };

  const handleStop = () => {
    dispatch({ type: "RUNNING_STOP" });
    dispatch({ type: "UNPAUSE" });
    dispatch({ type: "PAUSES_COUNT_CLEAR" });
    dispatch({ type: "ELAPSED_SECONDS_CLEAR" });
    stopTimer();
  };

  const startTimer = () => {
    if (state.intervalId === null) {
      const id = window.setInterval(() => {
        dispatch({
          type: "TIMER_START",
        });
      }, 100);
      dispatch({ type: "INTERVAL_ID_SET", id });
    }
  };

  const stopTimer = () => {
    window.clearInterval(state.intervalId);
    dispatch({ type: "INTERVAL_ID_CLEAR" });
  };

  const togglePause = () => {
    const currentlyPaused = !state.isPaused;
    dispatch({
      type: "PAUSES_COUNT_INCREMENT",
    });
    if (currentlyPaused) {
      stopTimer();
    } else {
      startTimer();
    }
    dispatch({ type: "TOGGLE_PAUSE" });
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
