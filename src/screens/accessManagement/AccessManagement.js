import React from "react";
import { Authorization } from "../../src/index";
//import { withNavBars } from "../../HOCs";
import { withTheme } from "@material-ui/core";

const AccessManagement = (props) => {
    // localStorage.setItem("RoleId", "1");
    // localStorage.setItem("tenentid", "1e4c8e40-a7f8-46de-9ac7-cedde81aa046");
  return (
    <div>
      <Authorization theme={props?.theme} />
    </div>
  );
};

export default withTheme(AccessManagement);
