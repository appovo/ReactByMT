import { areTimeboxesLoading } from "../components/selectors";

test("areTimeboxesLoading returns true when state.areTimeboxesLoading is set to true", () => {
  const state = {
    timeboxesAreLoading: true,
  };
  expect(areTimeboxesLoading(state)).toBe(true);
});
