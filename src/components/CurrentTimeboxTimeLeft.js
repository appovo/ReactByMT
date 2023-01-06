import { connect } from "react-redux";
import Clock from "./Clock";
import { isClockPaused } from "../selectors";

const mapStateToProps = (state) => ({
  isPaused: isClockPaused(state.timeboxReducer),
});

export const CurrentTimeboxTimeLeft = connect(mapStateToProps)(
  function CurrentTimeboxTimeLeft({ isPaused, minutesLeft, secondsLeft }) {
    return (
      <Clock
        minutes={minutesLeft}
        seconds={secondsLeft}
        className={isPaused ? "inactive" : ""}
      />
    );
  }
);
