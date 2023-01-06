import { connect } from "react-redux";
import ProgressBar from "./ProgressBar";
import { isClockPaused } from "../selectors";

const mapStateToProps = (state) => ({
  isPaused: isClockPaused(state.timeboxReducer),
});

export const CurrentTimeboxProgressBar = connect(mapStateToProps)(
  function CurrentTimeboxProgressBar({ isPaused, progressInPercent }) {
    return (
      <ProgressBar
        percent={progressInPercent}
        className={isPaused ? "inactive" : ""}
        color="red"
        big
      />
    );
  }
);
