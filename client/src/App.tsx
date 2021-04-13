import { BrowserRouter, Switch, Route, useHistory } from "react-router-dom";
import { Provider } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import AddApplication from "./pages/AddApplication";
import Homepage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import store from "./redux";
import ErrorPage from "./components/ErrorPage";

import ApplicationTracker from "./pages/ApplicationTracker";
import Editor from "./pages/Editor";
import EditApplication from "./pages/EditApplication";
import "./App.less";
import GlobalStyle from "./GlobalStyle";
import Layout from "./components/Layout";
import ResumePage from "./pages/ResumePage";
import AnalyticsPage from "./pages/Analytics";
import LandingPage from "./pages/LandingPage";

const Routing = () => {
  const history = useHistory();
  const { user } = useSelector((state: any) => state.user);

  useEffect(() => {
    if (!user) {
      history.push("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/app" component={Homepage} />
      <Route exact path="/register" component={RegisterPage} />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/tracker" component={ApplicationTracker} />
      <Route exact path="/add-application" component={AddApplication} />
      <Route
        exact
        path="/edit-application/:applicationID"
        component={EditApplication}
      />
      <Route exact path="/resume" component={ResumePage} />
      <Route exact path="/editor" component={Editor} />
      <Route exact path="/analytics" component={AnalyticsPage} />
      <Route component={ErrorPage} />
    </Switch>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout>
          <Routing />
          <GlobalStyle />
        </Layout>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
