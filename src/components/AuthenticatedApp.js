import Header from "./Header";
import EditableTimebox from "./EditableTimebox";
import TimeboxList from "./TimeboxList";
import ErrorBoundary from "./ErrorBoundary";

export default function AuthenticatedApp({ onLogout }) {
  return (
    <>
      <Header onLogout={onLogout} />
      <TimeboxList />
      <ErrorBoundary message="Coś nie działa w EditableTimebox :(">
        <EditableTimebox />
      </ErrorBoundary>
    </>
  );
}
