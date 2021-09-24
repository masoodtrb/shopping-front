import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useRoot } from "../../Context/Root";

type Props = {
  path: string;
  component: any;
};

export default function PrivateRoute(props: Props) {
  const {
    state: { hasAuth }
  } = useRoot();
  if (hasAuth) {
    <Route {...props} />;
  }
  return <Redirect to="/login" />;
}
