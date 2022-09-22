import React from "react";
import LoginForm from "./LoginForm";
import ErrorBoundary from "./ErrorBoundary";
import createAuthenticationAPI from "../api/AxiosAuthenticationApi";
import AuthenticationContext from "../contexts/AuthenticationContext";

const AuthenticatedApp = React.lazy(() => import("./AuthenticatedApp"));
const AuthenticationAPI = createAuthenticationAPI({
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
              <AuthenticationContext.Provider
                value={{ accessToken: this.state.accessToken }}
              >
                <React.Suspense>
                  <AuthenticatedApp onLogout={this.handleLogout} />
                </React.Suspense>
              </AuthenticationContext.Provider>
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
