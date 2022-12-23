import React, { useState, useEffect } from "react";
import Clock from "./Clock";
import ProgressBar from "./ProgressBar";
import { getMinutesAndSecondsFromDurationInSeconds } from "../lib/time";
import {
  getIntervalId,
  isClockPaused,
  getElapsedTimeInseconds,
  isClockRunning,
  getPausesCount,
} from "./selectors";
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
import { useForceUpdate } from "./hooks";
import { store } from "./store";

function CurrentTimebox({ title, totalTimeInMinutes }) {
  const state = store.getState().timeboxReducer;
  const dispatch = store.dispatch;
  const forceUpdate = useForceUpdate();
  // eslint-disable-next-line
  useEffect(() => store.subscribe(forceUpdate), []);

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
    window.clearInterval(getIntervalId(state));
    dispatch(clearIntervalId());
  };

  const togglePause = () => {
    const currentlyPaused = !isClockPaused(state);
    dispatch(incrementPausesCount());
    if (currentlyPaused) {
      stopTimer();
    } else {
      startTimer();
    }
    dispatch(togglePauseAction());
  };

  const totalTimeInSeconds = totalTimeInMinutes * 60;
  const timeLeftInSeconds = totalTimeInSeconds - getElapsedTimeInseconds(state);

  const [minutesLeft, secondsLeft] =
    getMinutesAndSecondsFromDurationInSeconds(timeLeftInSeconds);

  const progressInPercent =
    (getElapsedTimeInseconds(state) / totalTimeInSeconds) * 100.0;
  return (
    <div className={`CurrentTimebox`}>
      <h1>{title}</h1>
      <Clock
        minutes={minutesLeft}
        seconds={secondsLeft}
        className={isClockPaused(state) ? "inactive" : ""}
      />
      <ProgressBar
        percent={progressInPercent}
        className={isClockPaused(state) ? "inactive" : ""}
        color="red"
        big
      />
      <button onClick={handleStart} disabled={isClockRunning(state)}>
        Start
      </button>
      <button onClick={handleStop} disabled={!isClockRunning(state)}>
        Stop
      </button>
      <button onClick={togglePause} disabled={!isClockRunning(state)}>
        {isClockPaused(state) ? "Wznów" : "Pauzuj"}
      </button>
      Liczba przerw: {getPausesCount(state)}
    </div>
  );
}

export default CurrentTimebox;
