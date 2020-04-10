import React from "react";
import "./App.css";
import { Container } from "@material-ui/core";
import { BrowserRouter as Router } from "react-router-dom";
import Layout from "./layout";
import useGlobalStorage from "use-global-storage";

export const useStorage = useGlobalStorage({
  storageOptions: { name: "holds-db" },
});

function App() {
  return (
    <Router>
      <Container>
        <Layout />
      </Container>
    </Router>
  );
}

export default App;
