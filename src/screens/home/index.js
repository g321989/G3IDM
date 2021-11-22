import React from "react";
import { Home } from './home';
import { withNavBars } from "./../../HOCs";

class HomeParent extends React.Component {
  render() {
    return <Home />;
  }
}

export default withNavBars(HomeParent);
