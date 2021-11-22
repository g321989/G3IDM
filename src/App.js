import React from "react";
import AppAuth from "./App.auth";
import AppTheme from "./App.theme";
import AppAlert from "./App.alert";
import AppErrorBoundary from "./App.errorBoundry";
import RouterApp from "./router";
import ApolloClient from "./App.gqlclient";
import AppDrawer from "./App.drawer";
import { CssBaseline } from "@material-ui/core";
import AppDialog from "./App.dialog";
import AppBackdrop from "./App.backdrop";
import { Provider } from "react-redux";
import { store as ReduxStore } from "./redux";

const App = () => {
  return (
    <Provider store={ReduxStore}>
      <ApolloClient>
        <AppErrorBoundary>
          <AppAuth>
            <AppTheme>
              <CssBaseline />
              <AppAlert>
                <AppDialog>
                  <AppDrawer>
                    <AppBackdrop>
                      <RouterApp />
                    </AppBackdrop>
                  </AppDrawer>
                </AppDialog>
              </AppAlert>
            </AppTheme>
          </AppAuth>
        </AppErrorBoundary>
      </ApolloClient>
    </Provider>

  );
}
export default App;