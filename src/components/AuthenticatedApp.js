import Header from "./Header";
import EditableTimebox from "./EditableTimebox";
import TimeboxList from "./TimeboxesManager";
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
      <Header onLogout={onLogout} />
      <TimeboxList accessToken={accessToken} />
      <EditableTimebox />
      <InspirationalQuote
        render={Math.random() < 0.5 ? renderQuote : renderQuoteBold}
      />
    </>
  );
}
