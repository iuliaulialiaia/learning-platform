import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import {useSelector} from 'react-redux';

import Login from './Login';
import Register from './Register';
import PasswordResetRequest from './PasswordResetRequest';
import PasswordReset from './PasswordReset';
import EmailConfirmation from './EmailConfirmation';
import Dashboard from './Dashboard';
import Navbar from './Navbar';
import {selectEmail, selectUsername} from './features/auth/auth.slice';
import styles from './styles/App.module.scss';

function App(props) {
  const username = useSelector(selectUsername);
  const email = useSelector(selectEmail);  // TODO

  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Navbar/>

        {username && <Redirect to='/'/>}

        <Switch>
          <Route path='/login' component={Login}/>
          <Route path='/register' component={Register}/>
          <Route path='/password-reset/:token' component={PasswordReset}/>
          <Route path='/password-reset' component={PasswordResetRequest}/>
          <Route path='/email-confirmation/:token' component={EmailConfirmation}/>
          <Route path='/' component={Dashboard}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
