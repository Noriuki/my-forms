import { Link, NavLink } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import "./styles.css";

export const Header = (props: any) => {
  return (
    <header className="header">
      <NavLink to="/home">
        <img src={logo} width="150" />
      </NavLink>
      <NavLink className="header-link" to="/criar-formulario">
        Criar formulario
      </NavLink>
    </header>
  );
};
