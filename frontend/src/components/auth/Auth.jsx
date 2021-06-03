import {Route, Switch} from 'react-router-dom';

import Navbar from './Navbar';
import Login from './Login';
import Register from './Register';
import PasswordReset from './PasswordReset';
import PasswordResetRequest from './PasswordResetRequest';
import EmailConfirmation from './EmailConfirmation';
import styles from '../../styles/Auth.module.scss';

function Auth(props) {
  return (
    <div className={styles.auth}>
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