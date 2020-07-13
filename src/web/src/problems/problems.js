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
import { SliderPicker } from "react-color";

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

  // Know whether they have a fully selected column or not
  const [columnState, setColumnState] = useStorage("columnState", {});

  const [showDrawer, setShowDrawer] = useState(false);
  const [color, setColor] = useState();

  useEffect(() => {
    // TODO: Re-enable once ready to push
    // sync(clicks);
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

  const isColumnFullySelected = (column) => {
    const maxColumnCount = rows.length;

    const clicksWithinColumn = clicks.filter((click) =>
      click.startsWith(column)
    );

    return clicksWithinColumn.length === maxColumnCount;
  };

  const handleColumnClick = (column) => {
    // If the column is selected then deselect it
    // Are all selected?
    if (isColumnFullySelected(column)) {
      // We need to de-select all of them
      setClicks([...clicks.filter((click) => !click.startsWith(column))]);
      console.log("resetting");
      return;
    }

    console.log("handle column click", column);
    const bulkLedsToAdd = [];

    // Match based on the beginning of the led coordinates
    ledOrder.forEach((led) => {
      // We only care about leds in the column they clicked
      if (!led.startsWith(column)) return;

      // Have we already selected one of these? Yes - don't do anything
      if (!clicks.includes(led)) {
        bulkLedsToAdd.push(led);
      }
    });

    console.log("setting column leds", bulkLedsToAdd);
    setClicks([...clicks, ...bulkLedsToAdd]);
  };

  const isRowFullySelected = (row) => {
    //setClicks([...clicks.filter(click => !click.includes(row))])
    const maxRowCount = columns.length;
    const clicksWithinRow = clicks.filter((click) => click.includes(row));
    // debugger;
    return clicksWithinRow.length === maxRowCount;
  };

  const handleRowClick = (row) => {
    // debugger;
    row = row.toString();
    console.log("row is", row);
    if (isRowFullySelected(row)) {
      setClicks([...clicks.filter((click) => !click.includes(row))]);
      return;
    }

    const bulkLedsToAdd = [];
    ledOrder.forEach((led) => {
      if (!led.includes(row)) return;

      if (!clicks.includes(led)) {
        bulkLedsToAdd.push(led);
      }
    });

    setClicks([...clicks, ...bulkLedsToAdd]);
  };

  console.log("clicks", clicks);
  console.log("color state", color);

  return (
    <div style={{ position: "relative" }}>
      <div className={classes.buffer}>
        <div className={classes.container}>
          <div className={classes.item}>{clicks.length}</div>
          {columns.map((coumn) => (
            <div
              key={coumn}
              className={c(classes.item, classes.header)}
              onClick={() => handleColumnClick(coumn)}
            >
              {coumn}
            </div>
          ))}
        </div>

        {reversedRows.map((row, i) => (
          <div key={`row-${row}`} className={classes.container}>
            <div
              className={c(classes.item, classes.header)}
              onClick={() => handleRowClick(row)}
            >
              {row}
            </div>
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
      {/*<div*/}
      {/*  style={{*/}
      {/*    position: "fixed",*/}
      {/*    bottom: 55,*/}
      {/*    // background: "red",*/}
      {/*    width: "100%",*/}
      {/*    height: 30,*/}
      {/*    left: 0,*/}
      {/*  }}*/}
      {/*>*/}
      {/*  <SliderPicker*/}
      {/*    color={color}*/}
      {/*    onChange={(c) => console.log("onchange", c)}*/}
      {/*    onChangeComplete={(c) => {*/}
      {/*      console.log("complete", c);*/}
      {/*      setColor(c);*/}
      {/*    }}*/}
      {/*  />*/}
      {/*</div>*/}
    </div>
  );
}
export default Problems;
