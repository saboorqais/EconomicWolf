import React from "react";
import { connect } from "react-redux";
import "../styles/theme.scss";
import LayoutComponent from "../components/Layout";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { getNotifcation } from "../actions/Notifications";
import { Switch, Route, Redirect } from "react-router";

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.props.dispatch(getNotifcation());
  }
  render() {
    return (
      <div style={{ backgroundColor: "white" }}>
        <HashRouter>
          <Switch>
          
            <Route path="/" component={LayoutComponent} />
          
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(App);
