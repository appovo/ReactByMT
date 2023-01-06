import jwt from "jsonwebtoken";
import AuthenticationContext from "../contexts/AuthenticationContext";
import { useContext } from "react";

function UserGreeting() {
  const { accessToken } = useContext(AuthenticationContext);
  return <>Welcome, {getUserEmail(accessToken)}</>;
}

export default UserGreeting;

function getUserEmail(accessToken) {
  const decodedToken = jwt.decode(accessToken);
  return decodedToken?.email;
}
