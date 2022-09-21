import React from "react";
import Timebox from "./Timebox";
import TimeboxCreator from "./TimeboxCreator";
import Error from "./ErrorBoundary";
import createTimeboxesAPI from "../api/AxiosTimeboxesApi";

const TimeboxesAPI = createTimeboxesAPI({
  baseUrl: "http://localhost:5000/timeboxes",
});

class TimeboxList extends React.Component {
  state = {
    timeboxes: [],
    loading: true,
    error: null,
  };
  componentDidMount() {
    TimeboxesAPI.getAllTimeboxes()
      .then((timeboxes) => this.setState({ timeboxes }))
      .catch((error) => {
        this.setState({
          error,
        });
      })
      .finally(() => {
        this.setState({
          loading: false,
        });
      });
  }

  addTimebox = (timebox) => {
    TimeboxesAPI.addTimebox(timebox).then((addedTimebox) =>
      this.setState((prevState) => {
        const timeboxes = [...prevState.timeboxes, addedTimebox];
        return { timeboxes };
      })
    );
  };
  removeTimebox = (indexToRemove) => {
    TimeboxesAPI.removeTimebox(this.state.timeboxes[indexToRemove]).then(() =>
      this.setState((prevState) => {
        const timeboxes = prevState.timeboxes.filter(
          (timebox, index) => index !== indexToRemove
        );
        return { timeboxes };
      })
    );
  };
  updateTimebox = (indexToUpdate, timeBoxToUpdate) => {
    TimeboxesAPI.partiallyUpdateTimebox(timeBoxToUpdate).then(
      (updatedTimebox) =>
        this.setState((prevState) => {
          const timeboxes = prevState.timeboxes.map((timebox, index) =>
            index === indexToUpdate ? updatedTimebox : timebox
          );
          return { timeboxes };
        })
    );
  };

  handleCreate = (createdTimebox) => {
    try {
      this.addTimebox(createdTimebox);
    } catch (error) {
      console.log("Jest błąd przy tworzeniu timeboksa:", error);
    }
  };

  handleInputChange = (target) => {
    TimeboxesAPI.getTimeboxesByFullTextSearch(target.currentTarget.value).then(
      (timeboxes) => this.setState({ timeboxes })
    );
  };
  render() {
    return (
      <>
        <TimeboxCreator onCreate={this.handleCreate} />
        {this.state.loading ? "Timeboxy się ładują..." : ""}
        {this.state.error ? "Nie udało się załadować :(" : ""}
        <Error message="Coś się wykrzaczyło w liście:(">
          <label htmlFor="tmbx_filter">Filtruj timeboksy: </label>
          <input id="tmbx_filter" onChange={this.handleInputChange} />
          {this.state.timeboxes.map((timebox, index) => (
            <Timebox
              key={timebox.id}
              title={timebox.title}
              totalTimeInMinutes={timebox.totalTimeInMinutes}
              onDelete={() => this.removeTimebox(index)}
              onEdit={() =>
                this.updateTimebox(index, {
                  ...timebox,
                  title: "Updated timebox",
                })
              }
            />
          ))}
        </Error>
      </>
    );
  }
}

export default TimeboxList;
