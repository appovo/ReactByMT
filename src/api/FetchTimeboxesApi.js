function createTimeboxesAPI({ baseUrl }) {
    const BASE_URL = baseUrl
    const FetchTimeboxesAPI = {
        getAllTimeboxes: async function () {
            const response = await makeRequest(BASE_URL, "GET")
            const timeboxes = await response.json()
            return timeboxes
        },
        addTimebox: async function (timeboxToAdd) {
            const response = await makeRequest(BASE_URL, "POST", timeboxToAdd)
            const addedTimebox = await response.json()
            return addedTimebox
        },
        replaceTimebox: async function (timeboxToReplace) {
            if (!timeboxToReplace.id) {
                throw new Error("Can't replace a timebox without an ID")
            }
            const response = await makeRequest(`${BASE_URL}/${timeboxToReplace.id}`, "PUT", timeboxToReplace)
            const replacedTimebox = await response.json()
            return replacedTimebox
        },
        removeTimebox: async function (timeboxToRemove) {
            if (!timeboxToRemove.id) {
                throw new Error("Can't remove a timebox without an ID")
            }
            await makeRequest(`${BASE_URL}/${timeboxToRemove.id}`, "DELETE", timeboxToRemove)
        },
        partiallyUpdateTimebox: async function (timeboxToUpdate) {
            if (!timeboxToUpdate.id) {
                throw new Error("Can't update a timebox without an ID")
            }
            const response = await makeRequest(`${BASE_URL}/${timeboxToUpdate.id}`, "PATCH", timeboxToUpdate)
            const updatedTimebox = await response.json()
            return updatedTimebox
        },
        getTimeboxesByFullTextSearch: async function (searchQuery) {
            const response = await makeRequest(BASE_URL + `?q=${searchQuery}`, "GET")
            const timeboxes = await response.json()
            return timeboxes
        },
    }

    async function makeRequest(url, method, body) {
        const jsonBody = body ? JSON.stringify(body) : undefined
        const response = await fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json"
            },
            body: jsonBody
        })
        if (!response.ok) {
            throw new Error("Something went wrong!")
        }
        return response
    }

    return FetchTimeboxesAPI
}

export default createTimeboxesAPI