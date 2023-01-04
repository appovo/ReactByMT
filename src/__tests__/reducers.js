import { timeboxesReducer } from "../components/reducers";

describe("timeboxesReducer", () => {
  test("adds a timebox when given a TIMEBOX_ADD action", () => {
    const state = {
      timeboxes: [],
    };
    const newTimebox = { id: "I'm a new timebox" };
    expect(
      timeboxesReducer(state, { type: "TIMEBOX_ADD", timebox: newTimebox })
    ).toEqual({
      timeboxes: [newTimebox],
    });
  });
});
