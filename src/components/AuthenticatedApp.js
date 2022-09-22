import Header from "./Header";
import EditableTimebox from "./EditableTimebox";
import TimeboxList from "./TimeboxList";
import InspirationalQuote from "./InspirationalQuote";

export default function AuthenticatedApp({ onLogout }) {
  return (
    <>
      <Header onLogout={onLogout} />
      <TimeboxList />
      <EditableTimebox />
      <InspirationalQuote />
    </>
  );
}
