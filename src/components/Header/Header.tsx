import { Link } from "react-router-dom";
import "./Header.scss";

export const Header = () => {
  return (
    <nav className="header">
      <Link className="header_link" to="/">Home</Link>
      <Link className="header_link" to="/create">Create</Link>
    </nav>
  );
};
