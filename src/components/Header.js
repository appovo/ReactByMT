import UserGreeting from "./UserGreeting";

export default function Header({ onLogout }) {
  return (
    <>
      <header className="header">
        <UserGreeting />
        <a href="#" className="header__logout-link" onClick={onLogout}>
          Wyloguj
        </a>
      </header>
    </>
  );
}
