import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './scss/style.scss';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'));
const Register = React.lazy(() => import('./views/pages/login/Register'));
const RegisterConfirmation = React.lazy(() => import('./views/pages/login/RegisterConfirmation'));
const ForgotPassword = React.lazy(() => import('./views/pages/login/ForgotPassword'))
const ResetPassword = React.lazy(() => import('./views/pages/login/ResetPassword'));
const PasswordResetVerification = React.lazy(() => import('./views/pages/login/PasswordResetVerification'));
const Page404 = React.lazy(() => import('./views/pages/login/Page404'));
const Page500 = React.lazy(() => import('./views/pages/login/Page500'));

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <React.Suspense fallback={loading}>
          <Switch>
            <Route exact path="/login" name="Login Page" render={props => <Login {...props} />} />
            <Route exact path="/register" name="Register Page" render={props => <Register {...props} />} />
            <Route exact path="/registerconfirmation" name="Registter Confirmation Page" render={props => <RegisterConfirmation {...props} />} />
            <Route exact path="/forgotpassword" name="Forgot Password Page" render={props => <ForgotPassword {...props} />} />
            <Route exact path="/resetpassword" name="Reset Password Page" render={props => <ResetPassword {...props} />} />
            <Route exact path="/passwordresetverification" name="Reset Password Page" render={props => <PasswordResetVerification {...props} />} />
            <Route exact path="/404" name="Page 404" render={props => <Page404 {...props} />} />
            <Route exact path="/500" name="Page 500" render={props => <Page500 {...props} />} />
            <Route path="/" name="Dashboard" render={props => <TheLayout {...props} />} />
          </Switch>
        </React.Suspense>
      </BrowserRouter>
    );
  }
}

export default App;
