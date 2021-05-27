import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import {useSelector} from 'react-redux';

import Auth from "./auth/Auth";
import Login from './auth/Login';
import Register from './auth/Register';
import PasswordResetRequest from './auth/PasswordResetRequest';
import PasswordReset from './auth/PasswordReset';
import EmailConfirmation from './auth/EmailConfirmation';
import Dashboard from './dashboard/Dashboard';
import Navbar from './auth/Navbar';
import {selectEmail, selectUsername} from './features/auth/auth.slice';
import styles from './styles/App.module.scss';

function App(props) {
  const username = useSelector(selectUsername);
  const email = useSelector(selectEmail);  // TODO

  return (
    <div className={styles.app}>
      {username && <Redirect to='/dashboard'/>}
      {/*<Redirect to='/login'/>*/}

      <Switch>
        <Route path='/dashboard' component={Dashboard}/>
        <Route path='/' component={Auth}/>
      </Switch>

    </div>
  );
}

export default App;