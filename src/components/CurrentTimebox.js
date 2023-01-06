import { useDispatch, useSelector } from "react-redux";
import { getMinutesAndSecondsFromDurationInSeconds } from "../lib/time";
import {
  getIntervalId,
  isClockPaused,
  getElapsedTimeInSeconds,
  isClockRunning,
  getPausesCount,
} from "../selectors";
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
} from "../actions";
import { CurrentTimeboxTimeLeft } from "./CurrentTimeboxTimeLeft";
import { CurrentTimeboxProgressBar } from "./CurrentTimeboxProgressBar";

function CurrentTimebox({ title, totalTimeInMinutes }) {
  const dispatch = useDispatch();
  const intervalId = useSelector((state) =>
    getIntervalId(state.timeboxReducer)
  );
  const isPaused = useSelector((state) => isClockPaused(state.timeboxReducer));
  const elapsedTimeInSeconds = useSelector((state) =>
    getElapsedTimeInSeconds(state.timeboxReducer)
  );
  const isRunning = useSelector((state) =>
    isClockRunning(state.timeboxReducer)
  );
  const pausesCount = useSelector((state) =>
    getPausesCount(state.timeboxReducer)
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
    if (intervalId === null) {
      const id = window.setInterval(() => {
        dispatch(timerStart());
      }, 100);
      dispatch(setIntervalId(id));
    }
  };

  const stopTimer = () => {
    window.clearInterval(intervalId);
    dispatch(clearIntervalId());
  };

  const togglePause = () => {
    const currentlyPaused = !isPaused;
    dispatch(incrementPausesCount());
    if (currentlyPaused) {
      stopTimer();
    } else {
      startTimer();
    }
    dispatch(togglePauseAction());
  };

  const totalTimeInSeconds = totalTimeInMinutes * 60;
  const timeLeftInSeconds = totalTimeInSeconds - elapsedTimeInSeconds;

  const [minutesLeft, secondsLeft] =
    getMinutesAndSecondsFromDurationInSeconds(timeLeftInSeconds);

  const progressInPercent = (elapsedTimeInSeconds / totalTimeInSeconds) * 100.0;
  return (
    <div className={`CurrentTimebox`}>
      <CurrentTimeboxTimeLeft
        minutesLeft={minutesLeft}
        secondsLeft={secondsLeft}
      />
      <h1>{title}</h1>
      <CurrentTimeboxProgressBar progressInPercent={progressInPercent} />
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
