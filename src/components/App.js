import React, { useState } from "react";
import LoginForm from "./LoginForm";
import ErrorBoundary from "./ErrorBoundary";
import createAuthenticationAPI from "../api/AxiosAuthenticationApi";
import AuthenticationContext from "../contexts/AuthenticationContext";

const AuthenticatedApp = React.lazy(() => import("./AuthenticatedApp"));
const AuthenticationAPI = createAuthenticationAPI({
  baseUrl: "http://localhost:5000/login",
});

function App() {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken")
  );
  const [previousLoginAttemptFailed, setPreviousLoginAttemptFailed] =
    useState(false);

  const isUserLoggedIn = () => {
    return !!accessToken;
  };

  const handleLoginAttempt = (credentials) => {
    AuthenticationAPI.login(credentials)
      .then((accessToken) => {
        const token = accessToken.accessToken;
        localStorage.setItem("accessToken", token);
        setAccessToken(token);
        setPreviousLoginAttemptFailed(false);
      })
      .catch(() => {
        setPreviousLoginAttemptFailed(false);
      });
  };
  const handleLogout = () => {
    setAccessToken(null);
    setPreviousLoginAttemptFailed(false);
    localStorage.removeItem("accessToken");
  };

  return (
    <div className="App" id="app">
      <ErrorBoundary message="Something's wrong in the whole app :(">
        {isUserLoggedIn() ? (
          <>
            <AuthenticationContext.Provider
              value={{ accessToken: accessToken }}
            >
              <React.Suspense>
                <AuthenticatedApp onLogout={handleLogout} />
              </React.Suspense>
            </AuthenticationContext.Provider>
          </>
        ) : (
          <LoginForm
            errorMessage={
              previousLoginAttemptFailed ? "Failed to log in" : null
            }
            onLoginAttempt={handleLoginAttempt}
          />
        )}
      </ErrorBoundary>
    </div>
  );
}

export default App;
