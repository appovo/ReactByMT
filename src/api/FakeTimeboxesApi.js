import uuid from "uuid";

function wait(ms = 1000) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
const timeboxes = [
  { id: 1, title: "Learning about promises", totalTimeInMinutes: 25 },
  { id: 2, title: "Learning REST API", totalTimeInMinutes: 10 },
  { id: 3, title: "Training async/await", totalTimeInMinutes: 15 },
  { id: 4, title: "Learning about fetch", totalTimeInMinutes: 5 },
];

function findIndexByAnId(id) {
  const result = timeboxes.findIndex((timebox) => timebox.id === id);
  if (result < 0) {
    throw new Error("Timebox not found");
  }
  return result;
}

const FakeTimeboxesAPI = {
  getAllTimeboxes: async function getAllTimeboxes() {
    await wait(1000);
    return [...timeboxes];
  },
  addTimebox: async function addTimebox(timeboxToAdd) {
    await wait(1000);
    const addedTimebox = { ...timeboxToAdd, id: uuid.v4() };
    timeboxes.push(addedTimebox);
    return addedTimebox;
  },
  replaceTimebox: async function (timeboxToReplace) {
    await wait(1000);
    if (!timeboxToReplace.id) {
      throw new Error("Can't replace timebox without an id");
    }
    const index = findIndexByAnId(timeboxToReplace.id);
    const replacedTimebox = { ...timeboxToReplace };
    timeboxes[index] = replacedTimebox;
    return replacedTimebox;
  },
  removeTimebox: async function (timeboxToRemove) {
    await wait(1000);
    if (!timeboxToRemove.id) {
      throw new Error("Can't remove timebox without an id");
    }
    const index = findIndexByAnId(timeboxToRemove.id);
    timeboxes.splice(index, 1);
    console.log(timeboxes);
  },
};

export default FakeTimeboxesAPI;
