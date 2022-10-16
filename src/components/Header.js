import { Children } from "react";
export default function Header({ children }) {
  if (Children.count(children) < 1) {
    throw new Error("Header has to have at least 1 child!");
  }
  return (
    <>
      <header className="header">{children}</header>
    </>
  );
}
