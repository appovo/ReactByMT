import axios from "axios";

function createTimeboxesAPI({ baseUrl }) {
  const AxiosTimeboxesAPI = {
    getAllTimeboxes: async function (accessToken) {
      axios.defaults.headers.common = {
        Authorization: `Bearer ${accessToken}`,
      };
      const response = await axios.get(baseUrl, null, accessToken);
      const timeboxes = response.data;
      return timeboxes;
    },
    addTimebox: async function (timeboxToAdd, accessToken) {
      const response = await axios.post(baseUrl, timeboxToAdd, accessToken);
      const addedTimebox = response.data;
      return addedTimebox;
    },
    replaceTimebox: async function (timeboxToReplace, accessToken) {
      if (!timeboxToReplace.id) {
        throw new Error("Can't replace a timebox without an ID");
      }
      const response = await axios.put(
        `${baseUrl}/${timeboxToReplace.id}`,
        timeboxToReplace,
        accessToken
      );
      const replacedTimebox = response.data;
      return replacedTimebox;
    },
    removeTimebox: async function (timeboxToRemove, accessToken) {
      if (!timeboxToRemove.id) {
        throw new Error("Can't remove a timebox without an ID");
      }
      await axios.delete(`${baseUrl}/${timeboxToRemove.id}`, null, accessToken);
    },
    partiallyUpdateTimebox: async function (timeboxToUpdate, accessToken) {
      if (!timeboxToUpdate.id) {
        throw new Error("Can't update a timebox without an ID");
      }
      const response = await axios.patch(
        `${baseUrl}/${timeboxToUpdate.id}`,
        timeboxToUpdate,
        accessToken
      );
      const updatedTimebox = await response.data;
      return updatedTimebox;
    },
    getTimeboxesByFullTextSearch: async function (searchQuery, accessToken) {
      const response = await axios.get(
        `${baseUrl}?q=${searchQuery}`,
        null,
        accessToken
      );
      const timeboxes = response.data;
      return timeboxes;
    },
  };

  return AxiosTimeboxesAPI;
}

export default createTimeboxesAPI;
