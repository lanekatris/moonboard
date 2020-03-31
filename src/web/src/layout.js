import React, {useState, Fragment} from 'react';
import {Route, useHistory} from "react-router-dom";
import Problems from "./problems/problems";
import {List, Settings} from "@material-ui/icons";
import {AppBar, BottomNavigation, BottomNavigationAction} from "@material-ui/core";

function Layout() {
  const [value, setValue] = useState('Recents')
  const history = useHistory();

  const navMap = {
    0: '/',
    1: '/Settings',
    2: '/Settings'
  }

  return <Fragment>
    <Route exact path="/" component={Problems} />
    <Route exact path="/Settings" component={Settings} />

    <AppBar position="fixed" style={{top: 'auto', bottom: 0}}>
      <BottomNavigation showLabels value={value} onChange={(event, newValue) => {
        console.log(event, newValue)
        setValue(newValue)
        // history.push(`/${newValue}`)
        history.push(navMap[newValue])
      }}>
        <BottomNavigationAction selected={value === 'Recents'} label="Problems" icon={<List />} />
        {/*<BottomNavigationAction selected={value === 'Refresh'} label="Refresh" icon={<WbIncandescentOutlined />} />*/}

        <BottomNavigationAction selected={value === 'Settings'} label="Settings" icon={<Settings />} />
      </BottomNavigation>
    </AppBar>
  </Fragment>

}
export default Layout;
