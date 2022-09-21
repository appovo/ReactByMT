import axios from "axios";

function createAuthenticationAPI({ baseUrl }) {
  const FetchAuthenticationAPI = {
    login: async function (credentials) {
      const response = await axios.post(baseUrl, credentials);
      const result = await response.data;
      return result;
    },
  };

  return FetchAuthenticationAPI;
}

export default createAuthenticationAPI;
