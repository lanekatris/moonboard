import React, { useEffect, useState } from "react";

import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Settings } from "@material-ui/icons";
import { clone } from "lodash";
import axios from "axios";
import useStyles from "./styles";
import { useStorage } from "../App";

const c = (...classNames) => {
  return classNames.join(" ");
};

export function usePersistedState(key, defaultValue) {
  const [state, setState] = React.useState(
    () => JSON.parse(localStorage.getItem(key)) || defaultValue
  );
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);
  return [state, setState];
}

const columns = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"];
const rows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

const reversedRows = clone(rows);
reversedRows.reverse();

const ledOrder = [];
columns.forEach((column, i) => {
  if (i === 0) {
    rows.forEach((row) => {
      ledOrder.push(`${column}${row}`);
    });
  } else {
    rows.reverse().forEach((row) => {
      ledOrder.push(`${column}${row}`);
    });
  }
});
console.log("ledorder", ledOrder);

export const sync = async (clicks) => {
  const payload = { holds: [] };
  clicks.forEach((click) => {
    payload.holds.push(ledOrder.indexOf(click));
  });
  console.log("send off these coordinates to a server", payload);
  const url = `${process.env.REACT_APP_SERVER_URL}/sync`;
  // const url = "http://localhost:5000/sync"
  const result = await axios.post(url, payload);
  console.log("result", result);
};

function Problems() {
  const classes = useStyles();
  // const [clicks, setClicks] = usePersistedState("clicks", []);
  const [clicks, setClicks] = useStorage("clicks", []);
  const [showDrawer, setShowDrawer] = useState(false);

  useEffect(() => {
    sync(clicks);
  }, [clicks]);

  const handleClick = (id) => {
    if (clicks.includes(id)) {
      // Remove it
      setClicks(clicks.filter((x) => x !== id));
    } else {
      //add it
      setClicks([...clicks, id]);
    }
  };

  const clearAll = () => {
    setClicks([]);
  };

  console.log("clicks", clicks);

  return (
    <>
      {/*<SwipeableDrawer*/}
      {/*  onClose={() => setShowDrawer(false)}*/}
      {/*  onOpen={() => setShowDrawer(true)}*/}
      {/*  open={showDrawer}*/}
      {/*>*/}
      {/*  <div style={{ width: 250 }}>*/}
      {/*    /!*<h4>More Options</h4>*!/*/}
      {/*    <List>*/}
      {/*      <ListItem button onClick={clearAll}>*/}
      {/*        <ListItemIcon>*/}
      {/*          <Settings />*/}
      {/*        </ListItemIcon>*/}
      {/*        <ListItemText primary="Clear All" />*/}
      {/*      </ListItem>*/}
      {/*      <ListItem button onClick={sync}>*/}
      {/*        <ListItemIcon>*/}
      {/*          <Settings />*/}
      {/*        </ListItemIcon>*/}
      {/*        <ListItemText primary="Sync Board" />*/}
      {/*      </ListItem>*/}
      {/*    </List>*/}
      {/*  </div>*/}
      {/*</SwipeableDrawer>*/}

      <div className={classes.buffer}>
        <div className={classes.container}>
          <div className={classes.item}>{clicks.length}</div>
          {columns.map((coumn) => (
            <div key={coumn} className={c(classes.item, classes.header)}>
              {coumn}
            </div>
          ))}
        </div>

        {reversedRows.map((row, i) => (
          <div key={`row-${row}`} className={classes.container}>
            <div className={c(classes.item, classes.header)}>{row}</div>
            {columns.map((column) => (
              <div
                key={`column-${column}`}
                className={classes.item}
                style={{
                  background: clicks.includes(`${column}${row}`)
                    ? "springgreen"
                    : null,
                }}
                onClick={() => handleClick(`${column}${row}`)}
              >
                {column}
                {row}
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
export default Problems;
