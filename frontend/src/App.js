import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import {useSelector} from 'react-redux';

import Auth from "./components/auth/Auth";
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import PasswordResetRequest from './components/auth/PasswordResetRequest';
import PasswordReset from './components/auth/PasswordReset';
import EmailConfirmation from './components/auth/EmailConfirmation';
import Dashboard from './components/dashboard/Dashboard';
import Navbar from './components/auth/Navbar';
import {selectEmail, selectLoggedIn, selectUsername} from './features/auth/auth.slice';
import styles from './styles/App.module.scss';

function App(props) {
  const loggedIn = useSelector(selectLoggedIn);
  const username = useSelector(selectUsername);
  const email = useSelector(selectEmail);  // TODO

  return (
    <div className={styles.app}>
      {loggedIn && <Redirect to='/dashboard'/>}

      <Switch>
        <Route path='/dashboard' component={Dashboard}/>
        <Route path='/' component={Auth}/>
      </Switch>

    </div>
  );
}

export default App;