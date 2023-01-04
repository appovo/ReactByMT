import { setTimeboxes, replaceTimebox } from "../components/actions";
test("setTimeboxes emits TIMEBOXES_SET action", () => {
  expect(setTimeboxes([])).toEqual({ type: "TIMEBOXES_SET", timeboxes: [] });
});
test("replaceTimebox emits TIMEBOX_REPLACE action", () => {
  expect(replaceTimebox({ id: 1 })).toEqual({
    type: "TIMEBOX_REPLACE",
    replacedTimebox: { id: 1 },
  });
});
