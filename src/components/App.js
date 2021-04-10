import React from "react";
import Signup from "./Signup";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";
import RegisterPage from "../pages/RegisterPage";
import TMapPage from "../pages/TMapPage";
import SMapPage from "../pages/SMapPage";
import Form from "./Form";

function App() {
  return (
    <div className="container">
      <div>
        <Router>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path="/" component={Dashboard} />
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword} />
              <Route path="/register" component={RegisterPage} />
              <Route path="/threat" component={TMapPage} />
              <Route path="/sanitaryHelp" component={SMapPage} />
              <Route path="/review" component={Form} />
            </Switch>
          </AuthProvider>
        </Router>
      </div>
    </div>
  );
}

export default App;
