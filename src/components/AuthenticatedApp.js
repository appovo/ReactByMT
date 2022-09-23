import Header from "./Header";
import EditableTimebox from "./EditableTimebox";
import TimeboxList from "./TimeboxList";
import InspirationalQuote from "./InspirationalQuote";
import AuthenticationContext from "../contexts/AuthenticationContext";

export default function AuthenticatedApp({ onLogout }) {
  return (
    <>
      <Header onLogout={onLogout} />
      <AuthenticationContext.Consumer>
        {({ accessToken }) => <TimeboxList accessToken={accessToken} />}
      </AuthenticationContext.Consumer>
      <EditableTimebox />
      <InspirationalQuote />
    </>
  );
}
