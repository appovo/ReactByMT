import React, { useRef } from "react";

function LoginForm({ onLoginAttempt, errorMessage }) {
  const emailInput = useRef();
  const passwordInput = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    onLoginAttempt({
      email: emailInput.current.value,
      password: passwordInput.current.value,
    });
    emailInput.current.value = "";
    passwordInput.current.value = "";
  };

  return (
    <form onSubmit={handleSubmit} className="LoginForm">
      {errorMessage ? (
        <div className="LoginForm__error-message">{errorMessage}</div>
      ) : null}

      <label>
        Login:
        <input ref={emailInput} type="text" defaultValue="bob@wherever.com" />
      </label>
      <br />
      <label>
        Hasło:
        <input ref={passwordInput} type="password" defaultValue="secret" />
      </label>
      <br />
      <button>Zaloguj</button>
    </form>
  );
}

export default LoginForm;
