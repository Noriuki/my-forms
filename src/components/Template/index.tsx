import { FC } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";
import "./styles.css";
import { Container } from "@mui/material";

interface props {
  children?: any;
}

export const Template: FC<props> = (props) => {
  return (
    <div className="template-wrapper">
      <Header />
      <Container
        component="main"
        sx={{ padding: "1rem 0" }}
        maxWidth="sm"
        className="main"
      >
        {props.children}
      </Container>

      <Footer />
    </div>
  );
};
