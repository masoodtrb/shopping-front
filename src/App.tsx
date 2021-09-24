import React, { Fragment } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Authentication/Login";
import Registration from "./pages/Authentication/Registration";
import Layout from "./Components/Layout";
import { LinearProgress } from "@mui/material";
import useCheckAuth from "./hooks/useCheckAuth";
import Product from "./pages/Product";

function App() {
  const { authState } = useCheckAuth();

  if (authState === "unauthorized") {
    return (
      <Layout>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Registration} />

          <Route path="/404">404</Route>
          <Redirect to="/login" />
        </Switch>
      </Layout>
    );
  } else if (authState === "hasAuth") {
    return (
      <Fragment>
        <Layout>
          <Switch>
            <Route path="/" exact component={Home} />
            {/* <Route path="/login" component={Login} />
            <Route path="/register" component={Registration} /> */}
            <Route path="/product/:id">
              <Product />
            </Route>
            <Redirect to="/" />
          </Switch>
        </Layout>
      </Fragment>
    );
  }
  return <LinearProgress />;
}

export default App;
