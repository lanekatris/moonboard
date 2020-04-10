import React, { useState, Fragment } from "react";
import { Route, useHistory } from "react-router-dom";
import Problems, { usePersistedState } from "./problems/problems";
import { List, Settings } from "@material-ui/icons";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import {
  AppBar,
  BottomNavigation,
  BottomNavigationAction,
} from "@material-ui/core";
import SettingsComponent from "./settings/settings";
import { useStorage } from "./App";

function Layout() {
  const [value, setValue] = useState("Recents");
  const [clicks, setClicks] = useStorage("clicks", []);
  const history = useHistory();

  const navMap = {
    0: "/",
    1: "/Settings",
    2: "/Settings",
  };

  return (
    <Fragment>
      <Route exact path="/" component={Problems} />
      <Route exact path="/Settings" component={SettingsComponent} />

      <AppBar position="fixed" style={{ top: "auto", bottom: 0 }}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            console.log(event, newValue);
            if (newValue !== 2) {
              setValue(newValue);
              history.push(navMap[newValue]);
            }
            // history.push(`/${newValue}`)
          }}
        >
          <BottomNavigationAction
            selected={value === "Recents"}
            label="Problems"
            icon={<List />}
          />
          {/*<BottomNavigationAction selected={value === 'Refresh'} label="Refresh" icon={<WbIncandescentOutlined />} />*/}

          <BottomNavigationAction
            selected={value === "Settings"}
            label="Settings"
            icon={<Settings />}
          />
          <BottomNavigationAction
            label="Clear All"
            icon={<DeleteForeverIcon />}
            onClick={() => {
              console.log("delete forever", clicks);
              setClicks([]);
            }}
          />
        </BottomNavigation>
      </AppBar>
    </Fragment>
  );
}
export default Layout;
