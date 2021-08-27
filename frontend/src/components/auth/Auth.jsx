import {Route, Switch} from 'react-router-dom';

import Navbar from './Navbar';
import Login from './Login';
import Register from './Register';
import PasswordReset from './PasswordReset';
import PasswordResetRequest from './PasswordResetRequest';
import EmailConfirmation from './EmailConfirmation';

function Auth(props) {
  return (
    <div>
      <Navbar/>

      <Switch>
        <Route path='/login' component={Login}/>
        <Route path='/register' component={Register}/>
        <Route path='/password-reset/:token' component={PasswordReset}/>
        <Route path='/password-reset' component={PasswordResetRequest}/>
        <Route path='/email-confirmation/:token' component={EmailConfirmation}/>

        <Route path='/' component={Login}/>
      </Switch>
    </div>
  );
}

export default Auth;