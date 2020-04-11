import React, { useState } from "react";
import { Button } from "@material-ui/core";
import axios from "axios";
function Settings() {
  return (
    <>
      <h1>Settings</h1>
      <Button
        variant="contained"
        color="secondary"
        onClick={async () => {
          const url = `${process.env.REACT_APP_SERVER_URL}/shutdown`;
          // const url = "http://localhost:5000/sync"
          const result = await axios.post(url);
          console.log("shutdown", result);
        }}
      >
        Shutdown
      </Button>
    </>
  );
}

export default Settings;
