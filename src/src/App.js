import React from "react";
import Repository  from "./screen/PermissionManagement/permissionManagement";
import withTheme from './themeProvider';
import withStyleFix from './stylefix';
const App = (props) => {

    return (
        <div {...props}>
        {/* <Provider store={ReduxStore}> */}
            <Repository />
        {/* </Provider> */}
        </div>
    );

}

export default withStyleFix(withTheme(App));