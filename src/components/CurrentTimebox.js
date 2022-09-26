import React, { useState } from "react";
import Clock from "./Clock";
import ProgressBar from "./ProgressBar";
import { getMinutesAndSecondsFromDurationInSeconds } from "../lib/time";

function CurrentTimebox({ title, totalTimeInMinutes, isEditable, onEdit }) {
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [pausesCount, setPausesCount] = useState(0);
  const [elapsedTimeInSeconds, setElapsedTimeInSeconds] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  const handleStart = () => {
    setIsRunning(true);
    startTimer();
  };

  const handleStop = () => {
    setIsRunning(false);
    setIsPaused(false);
    setPausesCount(0);
    setElapsedTimeInSeconds(0);
    stopTimer();
  };

  const startTimer = () => {
    if (intervalId === null) {
      const id = window.setInterval(() => {
        setElapsedTimeInSeconds((prevState) => prevState + 0.1);
      }, 100);
      setIntervalId(id);
    }
  };

  const stopTimer = () => {
    window.clearInterval(intervalId);
    setIntervalId(null);
  };

  const togglePause = () => {
    const currentlyPaused = !isPaused;
    setPausesCount((prevState) =>
      currentlyPaused ? prevState + 1 : prevState
    );
    if (currentlyPaused) {
      stopTimer();
    } else {
      startTimer();
    }
    setIsPaused(currentlyPaused);
  };

  const totalTimeInSeconds = totalTimeInMinutes * 60;
  const timeLeftInSeconds = totalTimeInSeconds - elapsedTimeInSeconds;
  const [minutesLeft, secondsLeft] =
    getMinutesAndSecondsFromDurationInSeconds(timeLeftInSeconds);
  const progressInPercent = (elapsedTimeInSeconds / totalTimeInSeconds) * 100.0;
  return (
    <div className={`CurrentTimebox ${isEditable ? "inactive" : ""}`}>
      <h1>{title}</h1>
      <Clock
        minutes={minutesLeft}
        seconds={secondsLeft}
        className={isPaused ? "inactive" : ""}
      />
      <ProgressBar
        percent={progressInPercent}
        className={isPaused ? "inactive" : ""}
        color="red"
        big
      />
      <button onClick={onEdit} disabled={isEditable}>
        Edytuj
      </button>
      <button onClick={handleStart} disabled={isRunning}>
        Start
      </button>
      <button onClick={handleStop} disabled={!isRunning}>
        Stop
      </button>
      <button onClick={togglePause} disabled={!isRunning}>
        {isPaused ? "Wznów" : "Pauzuj"}
      </button>
      Liczba przerw: {pausesCount}
    </div>
  );
}

export default CurrentTimebox;
