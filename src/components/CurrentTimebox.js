import React, { useReducer } from "react";
import Clock from "./Clock";
import ProgressBar from "./ProgressBar";
import { getMinutesAndSecondsFromDurationInSeconds } from "../lib/time";

const stateReducer = (prevState, stateChanges) => {
  let newState = prevState;
  if (stateChanges.elapsedTimeInSeconds === "tick") {
    newState = {
      ...prevState,
      elapsedTimeInSeconds: prevState.elapsedTimeInSeconds + 0.1,
    };
  } else if (typeof stateChanges === "function") {
    newState = stateChanges(prevState);
  } else {
    newState = {
      ...prevState,
      ...stateChanges,
    };
  }
  return newState;
};

function CurrentTimebox({ title, totalTimeInMinutes }) {
  const initialState = {
    isRunning: false,
    isPaused: false,
    pausesCount: 0,
    elapsedTimeInSeconds: 0,
    intervalId: null,
  };
  const [state, setState] = useReducer(stateReducer, initialState);
  console.log(state.isRunning);
  const handleStart = () => {
    setState({ isRunning: true });
    startTimer();
  };

  const handleStop = () => {
    setState({ isRunning: false });
    setState({ isPaused: false });
    setState({ pausesCount: false });
    setState({ elapsedTimeInSeconds: 0 });
    stopTimer();
  };

  const startTimer = () => {
    if (state.intervalId === null) {
      const id = window.setInterval(() => {
        setState({
          elapsedTimeInSeconds: "tick",
        });
      }, 100);
      setState({ intervalId: id });
    }
  };

  const stopTimer = () => {
    window.clearInterval(state.intervalId);
    setState({ intervalId: null });
  };

  const togglePause = () => {
    const currentlyPaused = !state.isPaused;
    setState({
      pausesCount: currentlyPaused ? state.pausesCount + 1 : state.pausesCount,
    });
    if (currentlyPaused) {
      stopTimer();
    } else {
      startTimer();
    }
    setState({ isPaused: currentlyPaused });
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
