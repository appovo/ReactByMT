import { getAllTimeboxes } from "../selectors";
import { connect } from "react-redux";

export function TimeboxesList({ timeboxes, render }) {
  return timeboxes.map(render);
}

const mapStateToProps = (state) => ({
  timeboxes: getAllTimeboxes(state.timeboxesReducer),
});
export const AllTimeboxesList = connect(mapStateToProps)(TimeboxesList);
