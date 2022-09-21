function createAuthenticationAPI({ baseUrl }) {
  const FetchAuthenticationAPI = {
    login: async function (credentials) {
      const response = await makeRequest(baseUrl, "POST", credentials);
      const result = await response.json();
      return result;
    },
  };

  async function makeRequest(url, method, body) {
    const jsonBody = body ? JSON.stringify(body) : undefined;
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonBody,
    });
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    return response;
  }

  return FetchAuthenticationAPI;
}

export default createAuthenticationAPI;
