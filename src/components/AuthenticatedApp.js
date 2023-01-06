import Header from "./Header";
import UserGreeting from "./UserGreeting";
import CurrentTimebox from "./CurrentTimebox";
import TimeboxesManager from "./TimeboxesManager";
import InspirationalQuote from "./InspirationalQuote";
import AuthenticationContext from "../contexts/AuthenticationContext";
import { useContext } from "react";

export default function AuthenticatedApp({ onLogout }) {
  const { accessToken } = useContext(AuthenticationContext);
  const renderQuote = (text, author) => {
    return (
      <figure>
        <blockquote>{text}</blockquote>
        <figcaption>
          <cite>{author}</cite>
        </figcaption>
      </figure>
    );
  };
  const renderQuoteBold = (text, author) => {
    return (
      <figure>
        <b>
          <blockquote>{text}</blockquote>
          <figcaption>
            <cite>{author}</cite>
          </figcaption>
        </b>
      </figure>
    );
  };
  return (
    <>
      <Header>
        <UserGreeting />
        <a href="/#" className="header__logout-link" onClick={onLogout}>
          Logout
        </a>
      </Header>
      <TimeboxesManager accessToken={accessToken} />
      <CurrentTimebox title="Learning useState" totalTimeInMinutes={3} />
      <InspirationalQuote
        render={Math.random() < 0.5 ? renderQuote : renderQuoteBold}
      />
    </>
  );
}
