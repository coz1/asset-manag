import React, { FC, useState } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import AssetTable from "./components/AssetTable";
import NoAccessBuddy from "./components/NoAccessBuddy";
import GuardedRoute from "./servies/GuardedRoute ";

type Props = {};

const App: FC<Props> = (Props) => {
  const [isAutheticated, setisAutheticated] = useState(false);

  const login = () => {
    localStorage.setItem('myKey','8b2579f4332f466805d30651b9d6a927')
    //setisAutheticated(true);
    console.log("loggedInUser:" + isAutheticated);
  };

  const logout = () => {
    localStorage.removeItem('myKey');
    //setisAutheticated(false);
    console.log("loggedInUser:" + isAutheticated);
  };

  return (
    <Router>
         <Switch>
        <GuardedRoute
          path="/"
          component={AssetTable}
          auth={isAutheticated}
        />
      </Switch>
    </Router>
  );
};

export default App;
