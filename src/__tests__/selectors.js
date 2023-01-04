import { areTimeboxesLoading, getTimeboxById } from "../components/selectors";

test("areTimeboxesLoading returns true when state.areTimeboxesLoading is set to true", () => {
  const state = {
    timeboxesAreLoading: true,
  };
  expect(areTimeboxesLoading(state)).toBe(true);
});

test("getTimeboxById returns timebox when given its Id", () => {
  const state = {
    timeboxes: [{ id: 1 }],
  };
  expect(getTimeboxById(state, 1)).toEqual({ id: 1 });
});
