import React, { useEffect } from "react";
import { useStore } from "react-redux";
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
import { CurrentTimeboxTimeLeft } from "./CurrentTimeboxTimeLeft";
import { CurrentTimeboxProgressBar } from "./CurrentTimeboxProgressBar";

function CurrentTimebox({ title, totalTimeInMinutes }) {
  const store = useStore();
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
      <CurrentTimeboxTimeLeft
        minutesLeft={minutesLeft}
        secondsLeft={secondsLeft}
      />
      <h1>{title}</h1>
      <CurrentTimeboxProgressBar progressInPercent={progressInPercent} />
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
