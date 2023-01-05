import { configureStore } from "@reduxjs/toolkit";
import { timeboxesReducer } from "../components/reducers";
import { getAllTimeboxes } from "../components/selectors";
import { addTimebox, removeTimebox } from "../components/actions";

let store = null;
describe("timeboxes state changes", () => {
  beforeEach(() => {
    store = configureStore({ reducer: timeboxesReducer });
  });
  test("initially timeboxes are empty ", () => {
    const timeboxes = getAllTimeboxes(store.getState());
    expect(timeboxes).toEqual([]);
  });

  test("addTimebox action inserts a new timebox", () => {
    const newTimebox = { id: "I'm a new timebox" };
    store.dispatch(addTimebox(newTimebox));
    const timeboxes = getAllTimeboxes(store.getState());
    expect(timeboxes).toEqual([newTimebox]);
  });
  test("removeTimebox action removes a new timebox", () => {
    const aTimebox = { id: "I'm a timebox" };
    const anotherTimebox = { id: "I'm another timebox" };
    store.dispatch(addTimebox(aTimebox));
    store.dispatch(addTimebox(anotherTimebox));

    store.dispatch(removeTimebox(aTimebox));

    const timeboxes = getAllTimeboxes(store.getState());
    expect(timeboxes).toEqual([anotherTimebox]);
  });
});
