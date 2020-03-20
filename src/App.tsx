import React from "react";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "styled-components";
import { StylesProvider } from "@material-ui/styles";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import styled from "styled-components";

import configureStore from "redux/store";

// Components
import { CircularProgress } from "@material-ui/core";
import GlobalStyles, { theme } from "./GlobalStyles";
import Routes from "./Routes";

const { store, persistor } = configureStore();
export const history = createBrowserHistory();

const StyledApp = styled.div`
  padding: 9rem 0 4rem 0;
  background-color: ${({ theme }) => theme.color.background};
  max-width: 128rem;
  margin: auto;
`;

function App() {
  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <PersistGate loading={<CircularProgress />} persistor={persistor}>
            <Router history={history}>
              <GlobalStyles />
              <StyledApp>
                <Routes />
              </StyledApp>
            </Router>
          </PersistGate>
        </Provider>
      </ThemeProvider>
    </StylesProvider>
  );
}

export default App;
