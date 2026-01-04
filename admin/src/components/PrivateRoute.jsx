import { Route } from "wouter";

export default function PrivateRoute({ component: Component, ...rest }) {
  const token = localStorage.getItem("access_token");

  if (!token) {
    window.location.href = "/login";
    return null;
  }

  return <Route {...rest} component={Component} />;
}
