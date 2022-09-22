import React from "react";

import EditableTimebox from "./EditableTimebox";
import TimeboxList from "./TimeboxList";
import LoginForm from "./LoginForm";
import ErrorBoundary from "./ErrorBoundary";
import createTimeboxesAPI from "../api/AxiosAuthenticationApi";
import jwt from "jsonwebtoken";

const AuthenticationAPI = createTimeboxesAPI({
  baseUrl: "http://localhost:5000/login",
});

class App extends React.Component {
  state = {
    accessToken: null,
    previousLoginAttemptFailed: false,
  };
  componentDidMount() {
    const accessToken = localStorage.getItem("accessToken");
    this.setState({ accessToken });
  }
  isUserLoggedIn() {
    return !!this.state.accessToken;
  }
  getUserEmail() {
    const decodedToken = jwt.decode(this.state.accessToken);
    return decodedToken.email;
  }
  handleLoginAttempt = (credentials) => {
    AuthenticationAPI.login(credentials)
      .then((accessToken) => {
        const token = accessToken.accessToken;
        localStorage.setItem("accessToken", token);
        this.setState({
          previousLoginAttemptFailed: false,
          accessToken: token,
        });
      })
      .catch(() => {
        this.setState({ previousLoginAttemptFailed: true });
      });
  };
  handleLogout = () => {
    this.setState({ previousLoginAttemptFailed: false, accessToken: null });
    localStorage.removeItem("accessToken");
  };

  render() {
    return (
      <div className="App" id="app">
        <ErrorBoundary message="Coś nie działa w całej appce :(">
          {this.isUserLoggedIn() ? (
            <>
              <header className="header">
                Witaj, {this.getUserEmail()}
                <a
                  href="#"
                  className="header__logout-link"
                  onClick={this.handleLogout}
                >
                  Wyloguj
                </a>
              </header>
              <TimeboxList />
              <ErrorBoundary message="Coś nie działa w EditableTimebox :(">
                <EditableTimebox />
              </ErrorBoundary>
            </>
          ) : (
            <LoginForm
              errorMessage={
                this.state.previousLoginAttemptFailed
                  ? "Nie udało sie zalogować"
                  : null
              }
              onLoginAttempt={this.handleLoginAttempt}
            />
          )}
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;
