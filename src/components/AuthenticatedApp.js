import Header from "./Header";
import EditableTimebox from "./EditableTimebox";
import TimeboxList from "./TimeboxList";
import InspirationalQuote from "./InspirationalQuote";
import AuthenticationContext from "../contexts/AuthenticationContext";
import { useContext } from "react";

export default function AuthenticatedApp({ onLogout }) {
  const { accessToken } = useContext(AuthenticationContext);
  return (
    <>
      <Header onLogout={onLogout} />
      <TimeboxList accessToken={accessToken} />
      <EditableTimebox />
      <InspirationalQuote />
    </>
  );
}
