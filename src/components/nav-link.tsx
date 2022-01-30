import { styled } from "@mui/material/styles";
import { Link, LinkProps } from "react-router-dom";

export const NavLink = styled(Link)<LinkProps>(() => ({
  margin: "1rem 0.5rem",
  textDecoration: 'none',
}));
