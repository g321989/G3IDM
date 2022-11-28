import React from "react";
import { StylesProvider, createGenerateClassName } from "@material-ui/core/styles";

const withStyleFix = (Component) => (props) => {
  const generateClassName = createGenerateClassName({
    productionPrefix: "gen-comp",
    seed: "gen-comp",
  });

  return (
    <StylesProvider generateClassName={generateClassName} injectFirst>
      <Component {...props}>{props.children}</Component>
    </StylesProvider>
  );
};

export default withStyleFix;
