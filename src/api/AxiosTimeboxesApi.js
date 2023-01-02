import axios from "axios";

function createTimeboxesAPI({ baseUrl }) {
  const AxiosTimeboxesAPI = {
    getAllTimeboxes: async function (accessToken) {
      axios.defaults.headers.common = {
        Authorization: `Bearer ${accessToken.accessToken}`,
      };
      const response = await axios.get(baseUrl);
      const timeboxes = response.data;
      return timeboxes;
    },
    addTimebox: async function (timeboxToAdd) {
      if (!timeboxToAdd.totalTimeInMinutes) {
        throw new Error("Total time must be > 0");
      }
      const response = await axios.post(baseUrl, timeboxToAdd);
      const addedTimebox = response.data;
      return addedTimebox;
    },
    replaceTimebox: async function (timeboxToReplace) {
      if (!timeboxToReplace.id) {
        throw new Error("Can't replace a timebox without an ID");
      }
      const response = await axios.put(
        `${baseUrl}/${timeboxToReplace.id}`,
        timeboxToReplace
      );
      const replacedTimebox = response.data;
      return replacedTimebox;
    },
    removeTimebox: async function (timeboxToRemove) {
      if (!timeboxToRemove.id) {
        throw new Error("Can't remove a timebox without an ID");
      }
      await axios.delete(`${baseUrl}/${timeboxToRemove.id}`);
    },
    partiallyUpdateTimebox: async function (timeboxToUpdate) {
      if (!timeboxToUpdate.id) {
        throw new Error("Can't update a timebox without an ID");
      }
      const response = await axios.patch(
        `${baseUrl}/${timeboxToUpdate.id}`,
        timeboxToUpdate
      );
      const updatedTimebox = await response.data;
      return updatedTimebox;
    },
    getTimeboxesByFullTextSearch: async function (searchQuery) {
      const response = await axios.get(`${baseUrl}?q=${searchQuery}`);
      const timeboxes = response.data;
      return timeboxes;
    },
  };

  return AxiosTimeboxesAPI;
}

export default createTimeboxesAPI;
